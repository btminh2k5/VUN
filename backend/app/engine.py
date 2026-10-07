import hashlib
import itertools
import re
import unicodedata
from typing import Any

from .models import Item, OutfitRecommendation, RecommendationRequest, ScoreBreakdown


WEIGHTS = {"color": 0.25, "style": 0.20, "occasion": 0.20, "cultural": 0.35}

CULTURAL_MATCHES: dict[str, set[str]] = {
    "ao ba ba": {"khanran", "nonla", "tuimay", "tuicoi", "guocmoc", "depquaingang"},
    "ao dai": {"nonla", "tuixachnho", "bongtai", "keptoc", "tramcaitoc", "giaycaogot", "guocmoc"},
    "ao giao linh": {"tramcaitoc", "luoccaitoc", "quatgiay", "quatlua", "daylung", "guocmoc"},
    "ao ngu than tay chen": {"tramcaitoc", "luoccaitoc", "quatgiay", "quatlua", "daylung", "guocmoc"},
    "ao yem": {"nonquaithao", "khanmoqua", "vongco", "tramcaitoc", "quatgiay", "quatlua", "guocmoc", "giaybupbe"},
}

STYLE_MATCHES: dict[str, set[str]] = {
    "hien dai": {"tuixachnho", "keptoc", "bongtai", "giaycaogot", "giaythethao", "sandal"},
    "toi gian": {"tuivai", "tuixachnho", "vongtay", "giaybupbe", "sandal"},
    "co dien": {"tramcaitoc", "luoccaitoc", "quatlua", "quatgiay", "guocmoc", "nonquaithao"},
    "thanh lich": {"bongtai", "vongco", "tuixachnho", "giaycaogot", "giaybupbe"},
    "pha cach y2k": {"keptoc", "vongco", "tuixachnho", "giaythethao", "sandal"},
}

OCCASION_MATCHES: dict[str, set[str]] = {
    "tet": {"nonla", "quatgiay", "quatlua", "tuixachnho", "bongtai", "guocmoc", "giaycaogot"},
    "le hoi": {"nonquaithao", "nonla", "quatgiay", "quatlua", "tramcaitoc", "guocmoc"},
    "cuoi hoi": {"bongtai", "vongco", "tramcaitoc", "tuixachnho", "giaycaogot"},
    "dao pho": {"tuicoi", "tuimay", "tuivai", "tuixachnho", "giaythethao", "sandal"},
    "di hoc": {"tuivai", "keptoc", "giaybupbe", "giaythethao"},
    "chup ky yeu": {"nonla", "quatgiay", "tuixachnho", "giaycaogot", "giaybupbe"},
}

COLOR_FAMILIES: dict[str, set[str]] = {
    "do": {"do", "trang", "vang", "den", "be"},
    "vang": {"vang", "do", "nau", "trang", "be"},
    "xanh lam": {"xanh lam", "trang", "be", "vang", "nau"},
    "xanh com": {"xanh com", "xanh luc", "trang", "be", "nau"},
    "hong": {"hong", "trang", "be", "tim"},
    "tim": {"tim", "trang", "hong", "be"},
    "trang": {"trang", "do", "xanh lam", "hong", "den", "be"},
    "den": {"den", "trang", "do", "vang"},
}


def normalize(value: str | None) -> str:
    text = unicodedata.normalize("NFD", value or "")
    text = "".join(char for char in text if unicodedata.category(char) != "Mn")
    return re.sub(r"\s+", " ", text.replace("đ", "d").replace("Đ", "D").lower()).strip()


def token_match(query: str, values: list[str] | tuple[str, ...] | None) -> bool:
    q = normalize(query)
    return any(q in normalize(value) or normalize(value) in q for value in (values or []) if value)


def garment_color_score(garment: dict[str, Any], requested: str) -> float:
    actual, wanted = normalize(garment.get("color")), normalize(requested)
    if actual == wanted or wanted in actual or actual in wanted:
        return 10.0
    if actual in COLOR_FAMILIES.get(wanted, set()):
        return 7.5
    return 3.5


def item_affinity(item: dict[str, Any], mapping: dict[str, set[str]], key: str) -> float:
    item_code = normalize(item.get("type_code"))
    normalized_key = normalize(key)
    compatible = next(
        (values for label, values in mapping.items() if label in normalized_key or normalized_key in label),
        set(),
    )
    return 10.0 if item_code in compatible else 6.0


def garment_style_score(garment: dict[str, Any], requested: str) -> float:
    category = normalize(garment.get("category"))
    wanted = normalize(requested)
    if category in wanted or wanted in category:
        return 10.0
    return 10.0 if token_match(requested, garment.get("style")) else 7.0


def review_score(garment: dict[str, Any], styling_items: tuple[dict[str, Any], ...]) -> float:
    garment_reviewed = garment.get("type_review_status") == "reviewed" and garment.get("image_review_status") == "reviewed"
    reviewed_count = sum(item.get("review_status") == "reviewed" for item in styling_items)
    return min(10.0, (8.5 if garment_reviewed else 7.5) + reviewed_count * 0.5)


def cultural_score(garment: dict[str, Any], styling_items: tuple[dict[str, Any], ...]) -> float:
    category = normalize(garment.get("category"))
    compatible = CULTURAL_MATCHES.get(category, set())
    item_scores = [10.0 if normalize(item.get("type_code")) in compatible else 5.5 for item in styling_items]
    affinity = sum(item_scores) / max(1, len(item_scores))
    return round(affinity * 0.75 + review_score(garment, styling_items) * 0.25, 1)


def make_item(raw: dict[str, Any], group: str) -> Item:
    return Item(
        id=f"{group}-{raw.get('id')}",
        group=group,
        category=str(raw.get("category") or "Trang phục"),
        name=str(raw.get("name") or raw.get("category") or "Sản phẩm"),
        color=raw.get("color"),
        image_url=str(raw.get("image_url") or ""),
        description=raw.get("description"),
        cultural_meaning=raw.get("cultural_meaning"),
        cultural_notes=raw.get("cultural_notes"),
        source=raw.get("source"),
    )


def build_recommendations(
    request: RecommendationRequest,
    garments: list[dict[str, Any]],
    styling_items: list[dict[str, Any]],
) -> list[OutfitRecommendation]:
    if not garments:
        return []

    exact_color = [g for g in garments if garment_color_score(g, request.color) == 10]
    garment_pool = exact_color or sorted(garments, key=lambda g: garment_color_score(g, request.color), reverse=True)[:8]
    garment_pool = sorted(
        garment_pool,
        key=lambda g: (
            token_match(request.occasion, g.get("occasion")),
            garment_style_score(g, request.style),
            garment_color_score(g, request.color),
        ),
        reverse=True,
    )[:8]

    accessories = [item for item in styling_items if item.get("item_group") == "accessories"]
    footwear = [item for item in styling_items if item.get("item_group") == "footwear"]
    candidates: list[OutfitRecommendation] = []
    for garment in garment_pool:
        cultural_types = CULTURAL_MATCHES.get(normalize(garment.get("category")), set())
        rank_item = lambda item: (
            item_affinity(item, STYLE_MATCHES, request.style)
            + item_affinity(item, OCCASION_MATCHES, request.occasion)
            + (10.0 if normalize(item.get("type_code")) in cultural_types else 5.5)
        )
        accessory_pool: list[dict[str, Any] | None] = sorted(accessories, key=rank_item, reverse=True)[:6] or [None]
        footwear_pool: list[dict[str, Any] | None] = sorted(footwear, key=rank_item, reverse=True)[:4] or [None]
        for accessory, shoes in itertools.product(accessory_pool, footwear_pool):
            additions = tuple(item for item in (accessory, shoes) if item is not None)
            color = garment_color_score(garment, request.color)
            garment_style = garment_style_score(garment, request.style)
            addition_style = sum(item_affinity(item, STYLE_MATCHES, request.style) for item in additions) / max(1, len(additions))
            style = round(garment_style * 0.6 + addition_style * 0.4, 1)
            garment_occasion = 10.0 if token_match(request.occasion, garment.get("occasion")) else 7.0
            addition_occasion = sum(item_affinity(item, OCCASION_MATCHES, request.occasion) for item in additions) / max(1, len(additions))
            occasion = round(garment_occasion * 0.65 + addition_occasion * 0.35, 1)
            cultural = cultural_score(garment, additions)
            total = round((color * WEIGHTS["color"] + style * WEIGHTS["style"] + occasion * WEIGHTS["occasion"] + cultural * WEIGHTS["cultural"]), 1)

            warnings: list[str] = []
            if cultural < 7.5:
                warnings.append("Phụ kiện mang tính biến tấu; nên giữ phom và cách mặc nguyên bản của trang phục chính.")
            if any(item.get("review_status") != "reviewed" for item in additions):
                warnings.append("Metadata phụ kiện đang chờ kiểm duyệt; hãy đối chiếu nguồn trước khi dùng trong bối cảnh nghi lễ.")

            parts = [garment.get("name")]
            parts.extend(item.get("category") for item in additions)
            digest = hashlib.sha1("|".join(str(part) for part in parts).encode("utf-8")).hexdigest()[:12]
            items = [make_item(garment, "garment")] + [make_item(item, str(item.get("item_group"))) for item in additions]
            candidates.append(OutfitRecommendation(
                id=f"outfit-{digest}",
                title=" + ".join(str(part) for part in parts),
                items=items,
                score=total,
                score_breakdown=ScoreBreakdown(color=color, style=style, occasion=occasion, cultural=cultural),
                explanation=f"{garment.get('name')} bám sát tông {request.color}; phụ kiện được chọn theo phong cách {request.style} và bối cảnh {request.occasion}.",
                warnings=warnings,
            ))

    candidates.sort(key=lambda item: item.score, reverse=True)
    unique: list[OutfitRecommendation] = []
    seen: set[tuple[str, ...]] = set()
    for candidate in candidates:
        signature = tuple(item.name for item in candidate.items)
        if signature not in seen:
            seen.add(signature)
            unique.append(candidate)
        if len(unique) >= request.limit:
            break
    return unique

import hashlib
import itertools
import re
import unicodedata
from typing import Any

from .models import (
    CulturalSource,
    DataQuality,
    Item,
    MockupLayer,
    OutfitMockup2D,
    OutfitRecommendation,
    RecommendationRequest,
    ScoreBasis,
    ScoreBreakdown,
)


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


def tokens(value: str | None) -> list[str]:
    """Tách thành từ, bỏ dấu câu. Dùng để so khớp theo TỪ, không theo substring.

    So khớp substring từng gây khớp giả nghiêm trọng: "Đỏ" -> 'do', mà nhãn màu
    "Xanh (chưa xác định sắc độ)" chứa 'do' trong 'sắc độ', nên một chiếc áo yếm
    xanh được chấm 10/10 cho yêu cầu màu đỏ.
    """
    return [t for t in re.split(r"[^a-z0-9]+", normalize(value)) if t]


def bare_color(value: str | None) -> list[str]:
    """Tên màu, đã bỏ ghi chú trong ngoặc.

    "Xanh (chưa xác định sắc độ)" -> ['xanh']; "Vàng be" -> ['vang', 'be'].
    Tên màu luôn đứng đầu nhãn, phần trong ngoặc là ghi chú mức độ chắc chắn.
    """
    return tokens(re.sub(r"\(.*?\)", " ", value or ""))


def phrase_in(needle: str | None, haystack: str | None) -> bool:
    """needle có xuất hiện như một DÃY TỪ liên tiếp trong haystack không."""
    a, b = tokens(needle), tokens(haystack)
    if not a or not b:
        return False
    return any(b[i:i + len(a)] == a for i in range(len(b) - len(a) + 1))


def token_match(query: str, values: list[str] | tuple[str, ...] | None) -> bool:
    """Khớp theo dãy từ thay vì substring, để tránh khớp giả giữa các từ ngắn."""
    return any(phrase_in(query, value) or phrase_in(value, query) for value in (values or []) if value)


# Quy ước chung cho mọi chiều chấm điểm:
#   None  = database chưa có dữ liệu -> loại khỏi công thức, chia lại trọng số
#   10.0  = khớp yêu cầu
#   thấp  = có dữ liệu nhưng không khớp (phải bị trừ thật, không làm tròn lên)
MISSING: None = None


def garment_color_score(garment: dict[str, Any], requested: str) -> float | None:
    """Bốn mức, so khớp theo TỪ trên tên màu đã bỏ ghi chú trong ngoặc.

      10.0  trùng tên màu
       8.5  cùng gốc màu, khác sắc độ ("Vàng be" cho yêu cầu "Vàng")
       7.5  cùng hệ màu theo COLOR_FAMILIES
       3.5  không liên quan
    """
    actual_tokens, wanted_tokens = bare_color(garment.get("color")), bare_color(requested)
    if not actual_tokens:
        return MISSING
    if not wanted_tokens:
        return 3.5
    if actual_tokens == wanted_tokens:
        return 10.0
    # Cùng gốc màu: một bên là tiền tố từ của bên kia ("vang" vs "vang be").
    shorter, longer = sorted((actual_tokens, wanted_tokens), key=len)
    if longer[:len(shorter)] == shorter:
        return 8.5
    if " ".join(actual_tokens) in COLOR_FAMILIES.get(" ".join(wanted_tokens), set()):
        return 7.5
    return 3.5


def matches_selected_color(garment: dict[str, Any], requested: str) -> bool:
    """Màu người dùng chọn là ràng buộc của trang phục chính, không phải gợi ý mềm.

    Chỉ so tên màu đã bỏ ghi chú trong ngoặc. Vì vậy yêu cầu ``Đỏ`` không thể
    trả áo ``Vàng`` chỉ vì vàng nằm trong bảng màu phối được với đỏ.
    """
    actual, wanted = bare_color(garment.get("color")), bare_color(requested)
    return bool(actual and wanted and actual == wanted)


def item_affinity(item: dict[str, Any], mapping: dict[str, set[str]], key: str) -> float:
    item_code = normalize(item.get("type_code"))
    normalized_key = normalize(key)
    compatible = next(
        (values for label, values in mapping.items() if label in normalized_key or normalized_key in label),
        set(),
    )
    return 10.0 if item_code in compatible else 6.0


def garment_style_score(garment: dict[str, Any], requested: str) -> float | None:
    """Phong cách của loại trang phục, đọc từ garment_types.style.

    Bỏ hẳn nhánh cũ so khớp TÊN LOẠI với PHONG CÁCH ("ao dai" vs "hien dai"):
    hai trục khác nhau nên nhánh đó không bao giờ đúng — là code chết.
    Cột style chưa được phân loại thì trả MISSING, không trả điểm trung bình.
    """
    declared = garment.get("style")
    if not declared:
        return MISSING
    return 10.0 if token_match(requested, declared) else 4.5


def garment_occasion_score(garment: dict[str, Any], requested: str) -> float | None:
    """Bối cảnh của loại trang phục, đọc từ garment_types.occasion.

    Mảng rỗng là lựa chọn có chủ ý trong 04_update_type_information.sql
    ("chưa đối chiếu đủ nguồn"), nên phải hiểu là THIẾU DỮ LIỆU, không phải
    "không phù hợp" — nếu không, áo ngũ thân và áo yếm bị trừ oan ở mọi bối cảnh.
    """
    declared = garment.get("occasion")
    if not declared:
        return MISSING
    return 10.0 if token_match(requested, declared) else 4.5


def combine(
    garment_score: float | None,
    addition_score: float,
    garment_weight: float,
    *,
    additions_carry_dimension: bool,
) -> float | None:
    """Gộp điểm trang phục chính với điểm phụ kiện.

    `additions_carry_dimension` quyết định điều gì xảy ra khi trang phục chính
    thiếu dữ liệu ở chiều này. Hai chiều được đối xử khác nhau, có chủ ý:

    occasion -> False. Chủ thể của gợi ý là trang phục chính, nên "nón lá phù
        hợp Tết" KHÔNG chứng minh được "áo yếm phù hợp Tết". Thiếu dữ liệu
        trang phục thì cả chiều coi như thiếu, chờ bổ sung garment_types.occasion.

    style -> True. Phong cách của một outfit do phụ kiện mang phần lớn: cùng
        một chiếc áo dài, phối túi xách nhỏ hay quạt lụa là hai phong cách khác
        hẳn nhau. Nên khi garment_types.style chưa phân loại, chiều này vẫn chấm
        được từ phụ kiện. Nếu không làm vậy, lựa chọn phong cách của người dùng
        sẽ không ảnh hưởng gì tới kết quả.
    """
    if garment_score is MISSING:
        return round(addition_score, 1) if additions_carry_dimension else MISSING
    return round(garment_score * garment_weight + addition_score * (1 - garment_weight), 1)


def hard_filter(item: dict[str, Any], request: RecommendationRequest) -> bool:
    """Điều kiện BẮT BUỘC — chỉ loại thứ KHÔNG ĐƯỢC PHÉP xuất hiện.

    Nguyên tắc: hard filter không bao giờ được dùng điểm số hay affinity.
    Mọi tiêu chí có thang điểm (màu, phong cách, bối cảnh, văn hoá) phải đi qua
    bước chấm điểm, nơi trọng số quyết định — không được lọc trước bằng chúng.
    Lọc trước bằng tiêu chí sẽ chấm khiến tiêu chí đó mất hết khả năng phân biệt.

    Hiện dataset chưa có cột `is_available` hay `gender`, nên điều kiện bắt buộc
    duy nhất là món đồ phải dùng hiển thị được. Khi thêm các cột đó thì chèn vào
    đây, KHÔNG chèn vào bước chấm điểm.
    """
    if not item.get("image_url"):
        return False
    # Ví dụ cho sau này, khi schema có thêm cột:
    # if item.get("is_available") is False:
    #     return False
    # if request.gender and item.get("gender") not in (request.gender, "unisex"):
    #     return False
    return True


def is_reviewed(garment: dict[str, Any], styling_items: tuple[dict[str, Any], ...]) -> bool:
    """Đã kiểm duyệt hay chưa — một sự thật nhị phân, tách khỏi điểm chấm.

    Trước đây trạng thái kiểm duyệt bị trộn vào điểm văn hoá (review_score * 0.25),
    khiến "chưa ai duyệt metadata" bị tính như "phối sai văn hoá". Hai việc khác nhau.
    """
    return (
        garment.get("type_review_status") == "reviewed"
        and garment.get("image_review_status") == "reviewed"
        and all(item.get("review_status") == "reviewed" for item in styling_items)
    )


def cultural_score(garment: dict[str, Any], styling_items: tuple[dict[str, Any], ...]) -> float | None:
    """Độ phù hợp văn hoá giữa trang phục chính và phụ kiện.

    Chỉ còn phản ánh sự tương thích thật, không còn pha trạng thái kiểm duyệt.
    """
    category = normalize(garment.get("category"))
    compatible = CULTURAL_MATCHES.get(category, set())
    if not compatible:
        # Chưa có bảng tương thích cho loại này -> thiếu dữ liệu, không chấm bừa.
        return MISSING
    if not styling_items:
        return MISSING
    item_scores = [10.0 if normalize(item.get("type_code")) in compatible else 5.5 for item in styling_items]
    return round(sum(item_scores) / len(item_scores), 1)


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
        region=raw.get("region"),
        era=raw.get("era"),
        material=raw.get("material"),
        occasion=list(raw.get("occasion") or []),
        do_notes=list(raw.get("do_notes") or []),
        dont_notes=list(raw.get("dont_notes") or []),
    )


def calculate_score(scores: dict[str, float | None]) -> tuple[float, ScoreBasis]:
    """Chấm điểm trên các chiều CÓ dữ liệu, rồi chuẩn hoá lại trọng số.

    Ví dụ: cột style chưa phân loại -> 20% trọng số phong cách được chia lại cho
    màu/bối cảnh/văn hoá theo đúng tỷ lệ cũ, thay vì cho điểm 7 làm loãng kết quả.
    """
    available = {key: value for key, value in scores.items() if value is not None}
    missing = sorted(key for key, value in scores.items() if value is None)
    if not available:
        # Không còn chiều nào -> không chấm được, trả 0 và nói rõ.
        return 0.0, ScoreBasis(dimensions_used=[], dimensions_missing=missing, effective_weights={})

    total_weight = sum(WEIGHTS[key] for key in available)
    effective = {key: round(WEIGHTS[key] / total_weight, 4) for key in available}
    score = sum(value * effective[key] for key, value in available.items())
    return round(score, 1), ScoreBasis(
        dimensions_used=sorted(available),
        dimensions_missing=missing,
        effective_weights=effective,
    )


def build_warnings(cultural: float | None, additions: tuple[dict[str, Any], ...]) -> list[str]:
    """CHỈ cảnh báo về cách phối của riêng outfit này.

    Cảnh báo "metadata chờ kiểm duyệt" đã chuyển sang DataQuality ở cấp response:
    nó đúng với mọi outfit nên nhân bản vào từng outfit chỉ tạo tiếng ồn và làm
    người dùng bỏ qua luôn cả cảnh báo văn hoá thật.
    """
    warnings: list[str] = []
    if cultural is not None and cultural < 7.5:
        warnings.append("Phụ kiện mang tính biến tấu; nên giữ phom và cách mặc nguyên bản của trang phục chính.")
    if cultural is None:
        warnings.append("Chưa có dữ liệu tương thích văn hoá cho tổ hợp này; hãy đối chiếu nguồn trước khi dùng trong bối cảnh nghi lễ.")
    return warnings


def build_cultural_sources(raw_items: tuple[dict[str, Any], ...]) -> list[CulturalSource]:
    sources: list[CulturalSource] = []
    seen: set[str] = set()
    for item in raw_items:
        source = str(item.get("source") or "").strip()
        if not source or source.casefold() in seen:
            continue
        seen.add(source.casefold())
        sources.append(CulturalSource(
            title=source,
            url=source if source.startswith(("http://", "https://")) else None,
        ))
    return sources


def build_mockup_2d(items: list[Item]) -> OutfitMockup2D:
    role_order = {"garment": 10, "accessories": 20, "footwear": 30}
    return OutfitMockup2D(
        layers=[
            MockupLayer(
                item_id=item.id,
                role=item.group,
                image_url=item.image_url,
                z_index=role_order[item.group],
            )
            for item in items
        ]
    )


LABELS = {"color": "màu sắc", "style": "phong cách", "occasion": "bối cảnh", "cultural": "văn hoá"}


def build_explanation(
    request: RecommendationRequest,
    garment: dict[str, Any],
    total: float,
    basis: ScoreBasis,
    scores: dict[str, float | None],
) -> str:
    """Câu giải thích chỉ nêu những chiều THỰC SỰ được chấm.

    Không bao giờ in ra điểm của một chiều thiếu dữ liệu — đó là gốc của việc
    giao diện cũ khoe "phong cách 7.0/10" như một kết luận có căn cứ.
    """
    wanted = {"color": request.color, "style": request.style, "occasion": request.occasion}
    parts = []
    for key in ("color", "style", "occasion", "cultural"):
        value = scores.get(key)
        if value is None:
            continue
        if key == "cultural":
            parts.append(f"phù hợp văn hoá {value}/10")
        else:
            parts.append(f"{LABELS[key]} {wanted[key]} đạt {value}/10")

    sentence = f"{garment.get('name')}: " + "; ".join(parts) + f" — tổng {total}/10."
    if basis.dimensions_missing:
        missing = ", ".join(LABELS[key] for key in basis.dimensions_missing)
        sentence += (
            f" Database chưa có dữ liệu {missing}, nên điểm được tính trên "
            f"{len(basis.dimensions_used)}/4 tiêu chí với trọng số đã chia lại."
        )
    return sentence


def build_data_quality(
    garments: list[dict[str, Any]],
    styling_items: list[dict[str, Any]],
    recommendations: list[OutfitRecommendation],
) -> DataQuality:
    """Tình trạng dữ liệu của cả database, nói một lần ở cấp response."""
    missing: set[str] = set()
    for recommendation in recommendations:
        missing.update(recommendation.score_basis.dimensions_missing)

    garments_reviewed = sum(
        1 for g in garments
        if g.get("type_review_status") == "reviewed" and g.get("image_review_status") == "reviewed"
    )
    styling_reviewed = sum(1 for item in styling_items if item.get("review_status") == "reviewed")

    notes: list[str] = []
    if garments_reviewed == 0 and garments:
        notes.append(
            "Chưa có trang phục nào được đánh dấu 'reviewed'. "
            "Chạy 08_mark_reviewed.sql sau khi đã đối chiếu nguồn."
        )
    if styling_reviewed == 0 and styling_items:
        notes.append("Metadata phụ kiện và giày dép đang ở trạng thái 'draft'; hãy đối chiếu nguồn trước khi dùng trong bối cảnh nghi lễ.")
    if "style" in missing:
        notes.append(
            "Cột garment_types.style chưa được phân loại, trọng số phong cách đã được chia lại cho các tiêu chí khác. "
            "Xem 09_style_draft.sql nếu muốn nhập bản phân loại nháp."
        )
    if "occasion" in missing:
        notes.append("Một số loại trang phục có garment_types.occasion rỗng, nên không được chấm theo bối cảnh.")

    return DataQuality(
        garments_reviewed=garments_reviewed,
        garments_total=len(garments),
        styling_items_reviewed=styling_reviewed,
        styling_items_total=len(styling_items),
        missing_dimensions=sorted(missing),
        notes=notes,
    )


def diversify(
    scored: list[dict[str, Any]],
    limit: int,
    max_per_category: int,
    max_per_accessory: int,
    max_per_garment: int = 1,
) -> list[dict[str, Any]]:
    """Chọn Top K từ danh sách ĐÃ sắp theo điểm, có đa dạng hoá.

    Chạy SAU khi chấm điểm, không phải trước — nên nó không bao giờ đảo thứ tự
    điểm, chỉ bỏ qua ứng viên làm kết quả trùng lặp. Nếu quota theo loại áo hoặc
    phụ kiện làm thiếu kết quả, lượt hai có thể nới hai quota đó; riêng quota
    theo CHÍNH CHIẾC ÁO luôn được giữ để tên/ảnh gợi ý không bị lặp.

    Không đa dạng hoá thì Top 5 dễ thành 5 biến thể của cùng một chiếc áo:
    điểm rất cao nhưng người dùng không có gì để chọn.
    """
    chosen: list[dict[str, Any]] = []
    seen_signature: set[tuple[str, ...]] = set()
    per_category: dict[str, int] = {}
    per_accessory: dict[str, int] = {}
    per_garment: dict[str, int] = {}

    def signature(row: dict[str, Any]) -> tuple[str, ...]:
        return tuple(str(item.get("name")) for item in row["raw_items"])

    # Lượt 1: tôn trọng quota theo loại trang phục và theo loại phụ kiện.
    for row in scored:
        if len(chosen) >= limit:
            break
        sig = signature(row)
        if sig in seen_signature:
            continue
        category = row["category"]
        accessory = row["accessory_code"]
        garment_key = row["garment_key"]
        # Quan trọng nhất: cùng một chiếc áo thì mặc định chỉ xuất hiện một lần.
        # Hai gợi ý chỉ khác cái giày trông như gợi ý trùng lặp trên giao diện.
        if per_garment.get(garment_key, 0) >= max_per_garment:
            continue
        if per_category.get(category, 0) >= max_per_category:
            continue
        if accessory and per_accessory.get(accessory, 0) >= max_per_accessory:
            continue
        seen_signature.add(sig)
        per_garment[garment_key] = per_garment.get(garment_key, 0) + 1
        per_category[category] = per_category.get(category, 0) + 1
        if accessory:
            per_accessory[accessory] = per_accessory.get(accessory, 0) + 1
        chosen.append(row)

    # Lượt 2: nới quota loại áo/phụ kiện, nhưng tuyệt đối không dùng lại cùng
    # chiếc áo. Có ít hơn `limit` kết quả vẫn đúng hơn việc hiện tên trùng.
    if len(chosen) < limit:
        for row in scored:
            if len(chosen) >= limit:
                break
            sig = signature(row)
            if sig in seen_signature:
                continue
            garment_key = row["garment_key"]
            if per_garment.get(garment_key, 0) >= max_per_garment:
                continue
            seen_signature.add(sig)
            per_garment[garment_key] = per_garment.get(garment_key, 0) + 1
            chosen.append(row)

    return chosen


def build_recommendations(
    request: RecommendationRequest,
    garments: list[dict[str, Any]],
    styling_items: list[dict[str, Any]],
) -> list[OutfitRecommendation]:
    """Pipeline:

        Request
          -> Hard filter (item phải hiển thị được)
          -> Lọc màu trang phục chính theo lựa chọn người dùng
          -> Candidate pool (toàn bộ tổ hợp hợp lệ)
          -> Chấm điểm TẤT CẢ candidate (màu / phong cách / bối cảnh / văn hoá)
          -> Weighted score (trọng số chia lại trên các chiều có dữ liệu)
          -> Diversification
          -> Top K

    Màu trên form là lựa chọn bắt buộc của TRANG PHỤC CHÍNH. Bảng COLOR_FAMILIES
    chỉ mô tả độ hài hoà để chấm điểm, không cho phép đổi áo đỏ thành áo vàng.
    Phụ kiện không bị cắt trước theo affinity; mọi tổ hợp với áo đúng màu vẫn
    được chấm đầy đủ rồi mới xếp hạng và đa dạng hoá.

    Dataset hiện vài chục món nên chấm toàn bộ là rẻ nhất và chính xác nhất. Nếu
    sau này pool sau hard filter lên hàng nghìn, cách tối ưu đúng là thêm bước
    retrieval theo tiêu chí ĐỘC LẬP với điểm cuối (ví dụ lọc theo loại trang
    phục người dùng chọn) rồi mới chấm đầy đủ — tuyệt đối không quay lại cắt
    top-N bằng chính điểm sẽ chấm.
    """
    garment_pool = [
        g for g in garments
        if hard_filter(g, request) and matches_selected_color(g, request.color)
    ]
    if not garment_pool:
        return []

    accessories = [i for i in styling_items if i.get("item_group") == "accessories" and hard_filter(i, request)]
    footwear = [i for i in styling_items if i.get("item_group") == "footwear" and hard_filter(i, request)]
    accessory_pool: list[dict[str, Any] | None] = list(accessories) or [None]
    footwear_pool: list[dict[str, Any] | None] = list(footwear) or [None]

    scored: list[dict[str, Any]] = []
    for garment in garment_pool:
        for accessory, shoes in itertools.product(accessory_pool, footwear_pool):
            additions = tuple(item for item in (accessory, shoes) if item is not None)
            count = max(1, len(additions))

            color = garment_color_score(garment, request.color)

            addition_style = sum(item_affinity(i, STYLE_MATCHES, request.style) for i in additions) / count
            style = combine(
                garment_style_score(garment, request.style), addition_style, 0.6,
                additions_carry_dimension=True,
            )

            addition_occasion = sum(item_affinity(i, OCCASION_MATCHES, request.occasion) for i in additions) / count
            occasion = combine(
                garment_occasion_score(garment, request.occasion), addition_occasion, 0.65,
                additions_carry_dimension=False,
            )

            cultural = cultural_score(garment, additions)
            total, basis = calculate_score(
                {"color": color, "style": style, "occasion": occasion, "cultural": cultural}
            )
            scored.append({
                "garment": garment,
                "additions": additions,
                "raw_items": (garment, *additions),
                "category": str(garment.get("category") or ""),
                "garment_key": str(garment.get("id")),
                "accessory_code": normalize(accessory.get("type_code")) if accessory else "",
                "scores": {"color": color, "style": style, "occasion": occasion, "cultural": cultural},
                "total": total,
                "basis": basis,
            })

    if not scored:
        return []

    # Sắp theo điểm; điểm bằng nhau thì ưu tiên outfit được chấm trên nhiều tiêu
    # chí hơn, vì chuẩn hoá trọng số khiến outfit 2/4 tiêu chí ít cơ hội bị trừ
    # điểm hơn outfit 4/4 — đây là ưu tiên khi hoà, không phải trừ điểm.
    scored.sort(key=lambda row: (row["total"], len(row["basis"].dimensions_used)), reverse=True)

    selected = diversify(
        scored, request.limit, request.max_per_category,
        request.max_per_accessory, request.max_per_garment,
    )

    # Chỉ dựng model đầy đủ cho những outfit được chọn, không dựng cho cả pool.
    results: list[OutfitRecommendation] = []
    for row in selected:
        garment = row["garment"]
        additions = row["additions"]
        parts = [garment.get("name")]
        parts.extend(item.get("category") for item in additions)
        digest = hashlib.sha1("|".join(str(part) for part in parts).encode("utf-8")).hexdigest()[:12]
        items = [make_item(garment, "garment")] + [make_item(i, str(i.get("item_group"))) for i in additions]
        scores = row["scores"]
        results.append(OutfitRecommendation(
            id=f"outfit-{digest}",
            title=" + ".join(str(part) for part in parts),
            items=items,
            score=row["total"],
            score_breakdown=ScoreBreakdown(**scores),
            score_basis=row["basis"],
            reviewed=is_reviewed(garment, additions),
            explanation=build_explanation(request, garment, row["total"], row["basis"], scores),
            warnings=build_warnings(scores["cultural"], additions),
            cultural_sources=build_cultural_sources(row["raw_items"]),
            mockup_2d=build_mockup_2d(items),
        ))
    return results

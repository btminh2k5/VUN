"""Tư vấn phối đồ — tầng duy nhất được phép gọi LLM.

Nguyên tắc: engine (engine.py) quyết định outfit và điểm số. LLM chỉ diễn giải.
Ràng buộc được áp ở hai chỗ:
  1. Prompt: liệt kê đúng item + điểm của engine, cấm thêm/bớt/đổi điểm.
  2. Sau khi LLM trả về: điểm số và cảnh báo của engine được ghi đè lại,
     mọi item LLM bịa ra ngoài danh sách engine đều bị loại khỏi tips.
"""

from __future__ import annotations

import json
import unicodedata

from .llm import LLMCallFailed, LLMNotConfigured, complete_json
from .models import AdviceResponse, CulturalCheck, OutfitRecommendation, RecommendationRequest


SYSTEM_PROMPT = """Bạn là stylist Việt phục, tư vấn cho người dùng Gen Z.
Một công cụ chấm điểm (rule engine) đã chọn sẵn outfit và tính điểm. Bạn PHẢI tuân theo nó:
- KHÔNG thêm, bớt hay thay thế bất kỳ món nào ngoài danh sách được cung cấp.
- KHÔNG đưa ra điểm số của riêng bạn và không phản bác điểm của engine.
- KHÔNG bịa nguồn lịch sử, tên bảo tàng hay niên đại.
- Nếu engine có cảnh báo, bạn phải tôn trọng và nhắc lại tinh thần của cảnh báo đó.
Việc của bạn: giải thích vì sao tổ hợp này hợp lý và tư vấn cách mặc, chỉ dựa trên dữ liệu được đưa.
Luôn trả về đúng một JSON object, tiếng Việt, không bọc trong markdown."""

RESPONSE_SHAPE = """{
  "genZConcept": "1-2 câu về ý tưởng phối đồ",
  "stylingTips": ["tip về trang phục chính và phụ kiện", "tip về giày/tóc", "tip khi chụp ảnh hoặc dạo phố"],
  "culturalSignificance": "ý nghĩa văn hóa, chỉ dựa trên dữ liệu được đưa",
  "culturalRespectTips": "cách mặc giữ đúng tinh thần trang phục",
  "cautions": "điều cần tránh",
  "colorHarmonyNote": "nhận xét về hoà hợp màu sắc"
}"""


def _score_text(value: float | None) -> str:
    """Điểm có thể là None (database chưa có dữ liệu cho tiêu chí đó).

    Không bao giờ in ra "None/10", và tuyệt đối không làm toán trên None.
    """
    return "chưa có dữ liệu" if value is None else f"{value}/10"


def _normalize(value: str) -> str:
    text = unicodedata.normalize("NFD", value or "")
    text = "".join(char for char in text if unicodedata.category(char) != "Mn")
    return text.replace("đ", "d").replace("Đ", "D").lower().strip()


def _engine_facts(request: RecommendationRequest, outfit: OutfitRecommendation) -> str:
    return json.dumps(
        {
            "yeu_cau_nguoi_dung": {
                "boi_canh": request.occasion,
                "phong_cach": request.style,
                "mau": request.color,
            },
            "outfit_engine_da_chon": {
                "id": outfit.id,
                "items": [
                    {
                        "ten": item.name,
                        "nhom": item.group,
                        "loai": item.category,
                        "mau": item.color,
                        "y_nghia_van_hoa": item.cultural_meaning,
                        "ghi_chu_van_hoa": item.cultural_notes,
                    }
                    for item in outfit.items
                ],
                "diem_tong": outfit.score,
                "diem_chi_tiet": outfit.score_breakdown.model_dump(),
                "trong_so": {"mau": 0.25, "phong_cach": 0.20, "boi_canh": 0.20, "van_hoa": 0.35},
                "canh_bao_tu_engine": outfit.warnings,
                "nguon": [source.model_dump() for source in outfit.cultural_sources],
            },
        },
        ensure_ascii=False,
    )


def rule_based_advice(
    request: RecommendationRequest,
    outfit: OutfitRecommendation,
    llm_error: str | None = None,
) -> AdviceResponse:
    """Tư vấn suy ra trực tiếp từ kết quả engine, không cần LLM."""
    garment = next((item for item in outfit.items if item.group == "garment"), None)
    accessories = [item for item in outfit.items if item.group == "accessories"]
    footwear = [item for item in outfit.items if item.group == "footwear"]
    breakdown = outfit.score_breakdown
    garment_name = garment.name if garment else outfit.title

    tips = [
        f"Giữ {garment_name} làm trung tâm, đúng phom và cách mặc nguyên bản; "
        f"{', '.join(item.category for item in accessories) or 'phụ kiện'} là điểm nhấn, không lấn át trang phục chính.",
    ]
    if footwear:
        tips.append(
            f"{footwear[0].category} là lựa chọn engine chấm cao nhất cho bối cảnh {request.occasion}; "
            "ưu tiên đi lại thoải mái nếu phải di chuyển nhiều."
        )
    if breakdown.color is None:
        tips.append(
            "Database chưa ghi nhận màu của trang phục này nên engine không chấm được hoà hợp màu; "
            "hãy tự đối chiếu tông màu trước khi chốt."
        )
    else:
        tips.append(
            f"Tông {request.color} đạt {breakdown.color}/10 về hoà hợp màu — chụp ảnh ở nền trung tính "
            "(gạch, gỗ, tường vôi) sẽ tôn màu trang phục hơn nền nhiều hoa văn."
        )

    cautions = outfit.warnings[0] if outfit.warnings else (
        "Tránh cắt ngắn hoặc biến tấu phom dáng gốc khi mặc trong bối cảnh nghi lễ, lễ hội truyền thống."
    )
    return AdviceResponse(
        outfit_id=outfit.id,
        advice_source="rule_engine",
        llm_error=llm_error,
        gen_z_concept=(
            f"{garment_name} theo hướng {request.style.lower()} cho {request.occasion.lower()}: "
            f"giữ nguyên tinh thần truyền thống, hiện đại hoá bằng phụ kiện tối giản."
        ),
        styling_tips=tips,
        cultural_significance=(
            garment.cultural_meaning or garment.cultural_notes
            if garment and (garment.cultural_meaning or garment.cultural_notes)
            else "Dữ liệu văn hoá của trang phục này chưa được kiểm duyệt đầy đủ; hãy đối chiếu nguồn trước khi dẫn lại."
        ),
        color_harmony_note=(
            f"Engine chấm hoà hợp màu {_score_text(breakdown.color)} cho tông {request.color}; "
            f"phù hợp văn hoá {_score_text(breakdown.cultural)}."
        ),
        cultural_check=CulturalCheck(
            # cultural có thể None -> 0, KHÔNG nhân None với 10.
            score=0 if breakdown.cultural is None else round(breakdown.cultural * 10),
            cultural_respect_tips=(
                "Giữ đúng độ dài, cách cài khuy và cách mặc nguyên bản của trang phục; "
                "phụ kiện nên cùng hệ văn hoá với trang phục chính."
            ),
            cautions=cautions,
        ),
        engine_score=outfit.score,
        engine_score_breakdown=breakdown,
        engine_warnings=outfit.warnings,
    )


async def build_advice(request: RecommendationRequest, outfit: OutfitRecommendation) -> AdviceResponse:
    """Thử LLM; nếu không cấu hình hoặc lỗi thì trả tư vấn theo luật kèm lý do."""
    try:
        payload, config = await complete_json(
            SYSTEM_PROMPT,
            f"Dữ liệu từ engine:\n{_engine_facts(request, outfit)}\n\nTrả về JSON theo đúng cấu trúc:\n{RESPONSE_SHAPE}",
        )
    except LLMNotConfigured as error:
        return rule_based_advice(request, outfit, llm_error=None if "none" in str(error) else str(error))
    except LLMCallFailed as error:
        return rule_based_advice(request, outfit, llm_error=str(error))

    fallback = rule_based_advice(request, outfit)
    allowed = {_normalize(item.name) for item in outfit.items} | {_normalize(item.category) for item in outfit.items}

    def text(key: str, default: str) -> str:
        value = payload.get(key)
        return value.strip() if isinstance(value, str) and value.strip() else default

    raw_tips = payload.get("stylingTips")
    tips: list[str] = []
    if isinstance(raw_tips, list):
        for tip in raw_tips:
            if not isinstance(tip, str) or not tip.strip():
                continue
            tips.append(tip.strip())
    # Ít nhất một tip phải nhắc tới món có thật trong outfit, nếu không coi như LLM đi lạc.
    if not tips or not any(any(name and name in _normalize(tip) for name in allowed) for tip in tips):
        tips = fallback.styling_tips

    engine_cautions = " ".join(outfit.warnings).strip()
    llm_cautions = text("cautions", fallback.cultural_check.cautions)
    return AdviceResponse(
        outfit_id=outfit.id,
        advice_source=config.provider,
        model=config.model,
        gen_z_concept=text("genZConcept", fallback.gen_z_concept),
        styling_tips=tips[:5],
        cultural_significance=text("culturalSignificance", fallback.cultural_significance),
        color_harmony_note=text("colorHarmonyNote", fallback.color_harmony_note),
        cultural_check=CulturalCheck(
            # Điểm luôn lấy từ engine, không lấy từ LLM.
            score=fallback.cultural_check.score,
            cultural_respect_tips=text("culturalRespectTips", fallback.cultural_check.cultural_respect_tips),
            cautions=f"{engine_cautions} {llm_cautions}".strip() if engine_cautions else llm_cautions,
        ),
        engine_score=outfit.score,
        engine_score_breakdown=outfit.score_breakdown,
        engine_warnings=outfit.warnings,
    )

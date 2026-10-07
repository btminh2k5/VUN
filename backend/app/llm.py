import json
import os

from google import genai
from google.genai import types
from pydantic import TypeAdapter

from .models import LLMRecommendationResult, OutfitRecommendation, RecommendationRequest


LLM_RESPONSE_ADAPTER = TypeAdapter(list[LLMRecommendationResult])


async def enrich_with_llm(
    request: RecommendationRequest,
    recommendations: list[OutfitRecommendation],
) -> tuple[list[OutfitRecommendation], str]:
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key or api_key == "MY_GEMINI_API_KEY" or not recommendations:
        return recommendations, "rule_engine"

    payload = [
        {
            "id": item.id,
            "items": [part.name for part in item.items],
            "score": item.score,
            "score_breakdown": item.score_breakdown.model_dump(),
            "warnings": item.warnings,
            "cultural_sources": [source.model_dump() for source in item.cultural_sources],
            "mockup_2d": item.mockup_2d.model_dump(),
        }
        for item in recommendations
    ]
    prompt = f"""Bạn là stylist Việt phục. Các outfit dưới đây đã được hệ thống kiểm tra và xếp hạng; không thay đổi item, id hoặc điểm số.
Yêu cầu người dùng: bối cảnh={request.occasion}, phong cách={request.style}, màu={request.color}.
Outfit: {json.dumps(payload, ensure_ascii=False)}
Trả JSON là mảng các object {{"id": string, "explanation": string, "warnings": string[]}}.
Giải thích ngắn gọn vì sao hợp màu, phong cách, bối cảnh và văn hóa. Chỉ thêm cảnh báo khi thực sự cần; không bịa nguồn lịch sử."""
    try:
        client = genai.Client(api_key=api_key)
        response = await client.aio.models.generate_content(
            model=os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite"),
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=list[LLMRecommendationResult],
                temperature=0.2,
            ),
        )
        enriched = LLM_RESPONSE_ADAPTER.validate_json(response.text or "[]")
        by_id = {item.id: item for item in enriched}
        for recommendation in recommendations:
            result = by_id.get(recommendation.id)
            if result:
                recommendation.explanation = result.explanation
                recommendation.warnings = list(dict.fromkeys([*recommendation.warnings, *result.warnings]))
        return recommendations, "gemini"
    except Exception:
        return recommendations, "rule_engine"

from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .advice import build_advice
from .database import WardrobeRepository
from .engine import build_data_quality, build_recommendations
from .llm import describe_config
from .models import (
    AdviceRequest,
    AdviceResponse,
    RecommendationRequest,
    RecommendationResponse,
)


repository = WardrobeRepository()


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        await repository.connect()
    except Exception:
        repository.pool = None
    yield
    await repository.close()


app = FastAPI(title="VietFashion Recommendation API", version="2.0.0", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
async def health() -> dict[str, object]:
    connected = await repository.healthy()
    return {"ok": True, "postgresql": connected}


@app.get("/llm/health")
async def llm_health() -> dict[str, object]:
    """Cho biết LLM tư vấn đang dùng provider/model nào. Không trả API key."""
    return describe_config()


async def _recommend(request: RecommendationRequest):
    try:
        garments, styling_items = await repository.load_catalog()
    except Exception as error:
        raise HTTPException(status_code=503, detail=f"Không thể đọc VietFashion PostgreSQL: {error}") from error

    results = build_recommendations(request, garments, styling_items)
    if not results:
        raise HTTPException(status_code=404, detail="Database chưa có đủ trang phục và phụ kiện để tạo outfit.")
    return results, build_data_quality(garments, styling_items, results)


@app.post("/recommendations", response_model=RecommendationResponse)
async def recommendations(request: RecommendationRequest) -> RecommendationResponse:
    """Chọn và chấm điểm outfit. Hoàn toàn bằng rule engine, không gọi LLM."""
    results, data_quality = await _recommend(request)
    return RecommendationResponse(
        source="postgresql", query=request, data_quality=data_quality, recommendations=results
    )


@app.post("/advice", response_model=AdviceResponse)
async def advice(request: AdviceRequest) -> AdviceResponse:
    """Tư vấn phối đồ. Đây là chỗ duy nhất gọi LLM, và LLM phải tuân theo engine."""
    results, _ = await _recommend(RecommendationRequest(**request.model_dump(exclude={"outfit_id"})))
    outfit = next((item for item in results if item.id == request.outfit_id), results[0])
    return await build_advice(request, outfit)

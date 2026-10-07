from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .database import WardrobeRepository
from .engine import build_recommendations
from .llm import enrich_with_llm
from .models import RecommendationRequest, RecommendationResponse


repository = WardrobeRepository()


@asynccontextmanager
async def lifespan(_: FastAPI):
    try:
        await repository.connect()
    except Exception:
        repository.pool = None
    yield
    await repository.close()


app = FastAPI(title="VietFashion Recommendation API", version="1.0.0", lifespan=lifespan)
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


@app.post("/recommendations", response_model=RecommendationResponse)
async def recommendations(request: RecommendationRequest) -> RecommendationResponse:
    try:
        garments, styling_items = await repository.load_catalog()
    except Exception as error:
        raise HTTPException(status_code=503, detail=f"Không thể đọc VietFashion PostgreSQL: {error}") from error

    results = build_recommendations(request, garments, styling_items)
    if not results:
        raise HTTPException(status_code=404, detail="Database chưa có đủ trang phục và phụ kiện để tạo outfit.")
    results, explanation_source = await enrich_with_llm(request, results)
    return RecommendationResponse(
        source="postgresql",
        explanation_source=explanation_source,
        query=request,
        recommendations=results,
    )


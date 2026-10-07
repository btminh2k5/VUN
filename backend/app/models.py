from typing import Literal

from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    occasion: str = Field(min_length=1, max_length=100)
    style: str = Field(min_length=1, max_length=100)
    color: str = Field(min_length=1, max_length=60)
    limit: int = Field(default=5, ge=1, le=10)


class Item(BaseModel):
    id: str
    group: Literal["garment", "accessories", "footwear"]
    category: str
    name: str
    color: str | None = None
    image_url: str
    description: str | None = None
    cultural_meaning: str | None = None
    cultural_notes: str | None = None
    source: str | None = None


class ScoreBreakdown(BaseModel):
    color: float
    style: float
    occasion: float
    cultural: float


class OutfitRecommendation(BaseModel):
    id: str
    title: str
    items: list[Item]
    score: float
    score_breakdown: ScoreBreakdown
    explanation: str
    warnings: list[str] = []


class RecommendationResponse(BaseModel):
    success: bool = True
    source: Literal["postgresql"]
    explanation_source: Literal["gemini", "rule_engine"]
    query: RecommendationRequest
    recommendations: list[OutfitRecommendation]

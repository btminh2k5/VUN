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


class CulturalSource(BaseModel):
    title: str
    url: str | None = None


class MockupLayer(BaseModel):
    item_id: str
    role: Literal["garment", "accessories", "footwear"]
    image_url: str
    z_index: int


class OutfitMockup2D(BaseModel):
    width: int = 1080
    height: int = 1350
    background: str = "#F5F2EA"
    layers: list[MockupLayer]


class OutfitRecommendation(BaseModel):
    id: str
    title: str
    items: list[Item]
    score: float
    score_breakdown: ScoreBreakdown
    explanation: str
    warnings: list[str] = Field(default_factory=list)
    cultural_sources: list[CulturalSource] = Field(default_factory=list)
    mockup_2d: OutfitMockup2D


class LLMRecommendationResult(BaseModel):
    id: str = Field(min_length=1)
    explanation: str = Field(min_length=1, max_length=1200)
    warnings: list[str] = Field(default_factory=list, max_length=5)


class RecommendationResponse(BaseModel):
    success: bool = True
    source: Literal["postgresql"]
    explanation_source: Literal["gemini", "rule_engine"]
    query: RecommendationRequest
    recommendations: list[OutfitRecommendation]

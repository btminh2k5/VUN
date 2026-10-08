from typing import Literal

from pydantic import BaseModel, Field


class RecommendationRequest(BaseModel):
    occasion: str = Field(min_length=1, max_length=100)
    style: str = Field(min_length=1, max_length=100)
    color: str = Field(min_length=1, max_length=60)
    limit: int = Field(default=5, ge=1, le=10)
    # Quota đa dạng: tối đa bao nhiêu outfit cho cùng một loại trang phục.
    # Đặt bằng limit nếu muốn thuần "5 outfit điểm cao nhất, bất kể trùng loại".
    max_per_category: int = Field(default=2, ge=1, le=10)
    # Không quá bao nhiêu outfit dùng cùng một loại phụ kiện. Tránh Top 5 toàn
    # "áo khác nhau + cùng một cái nón lá". Đặt bằng limit để tắt.
    max_per_accessory: int = Field(default=2, ge=1, le=10)
    # Không quá bao nhiêu outfit dùng CHÍNH chiếc áo đó. Mặc định 1: hai gợi ý
    # chỉ khác nhau ở phụ kiện trông như trùng lặp, vì danh sách Step 2 hiển thị
    # ảnh và tên của trang phục chính.
    max_per_garment: int = Field(default=1, ge=1, le=10)


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
    # None = database chưa có dữ liệu. Frontend PHẢI ẩn field thay vì thay
    # bằng giá trị của một outfit mẫu khác.
    region: str | None = None
    era: str | None = None
    material: str | None = None
    occasion: list[str] = Field(default_factory=list)
    do_notes: list[str] = Field(default_factory=list)
    dont_notes: list[str] = Field(default_factory=list)


class ScoreBreakdown(BaseModel):
    # None = database chưa có dữ liệu cho chiều này, KHÁC với điểm thấp.
    # Chiều None bị loại khỏi công thức và trọng số được chia lại cho các
    # chiều còn lại, để trang phục không bị trừ oan vì metadata chưa điền.
    color: float | None = None
    style: float | None = None
    occasion: float | None = None
    cultural: float | None = None


class ScoreBasis(BaseModel):
    """Điểm được tính trên những chiều nào, với trọng số nào."""

    dimensions_used: list[str]
    dimensions_missing: list[str]
    # Trọng số sau khi chuẩn hoá lại trên các chiều có dữ liệu.
    effective_weights: dict[str, float]


class DataQuality(BaseModel):
    """Tình trạng dữ liệu của cả database — nói một lần ở cấp response,
    không nhân bản vào warnings của từng outfit."""

    garments_reviewed: int
    garments_total: int
    styling_items_reviewed: int
    styling_items_total: int
    missing_dimensions: list[str] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)


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
    score_basis: ScoreBasis
    explanation: str
    # CHỈ cảnh báo về cách phối/văn hoá của riêng outfit này.
    # Tình trạng kiểm duyệt dữ liệu nằm ở RecommendationResponse.data_quality.
    warnings: list[str] = Field(default_factory=list)
    # Suy trực tiếp từ review_status, không suy từ điểm số —
    # "đã kiểm duyệt" và "điểm cao" là hai trục khác nhau.
    reviewed: bool = False
    cultural_sources: list[CulturalSource] = Field(default_factory=list)
    mockup_2d: OutfitMockup2D


class RecommendationResponse(BaseModel):
    success: bool = True
    source: Literal["postgresql"]
    # Pipeline gợi ý phối đồ không dùng LLM — giải thích luôn do rule engine tạo.
    explanation_source: Literal["rule_engine"] = "rule_engine"
    query: RecommendationRequest
    data_quality: DataQuality
    recommendations: list[OutfitRecommendation]


class AdviceRequest(RecommendationRequest):
    """Tư vấn cho một outfit cụ thể do engine đã chọn."""

    outfit_id: str | None = Field(default=None, max_length=120)


class CulturalCheck(BaseModel):
    # score luôn lấy từ engine (cultural * 10), không bao giờ do LLM tự đặt.
    score: int = Field(ge=0, le=100)
    cultural_respect_tips: str
    cautions: str


class AdviceResponse(BaseModel):
    success: bool = True
    outfit_id: str
    # "rule_engine" hoặc tên provider: gemini | openai | anthropic | openrouter
    advice_source: str
    model: str | None = None
    # Lý do phải dùng tư vấn theo luật (sai tên model, thiếu key, timeout...).
    llm_error: str | None = None
    gen_z_concept: str
    styling_tips: list[str]
    cultural_significance: str
    color_harmony_note: str
    cultural_check: CulturalCheck
    # Kết quả engine được trả kèm để client thấy LLM không làm lệch điểm.
    engine_score: float
    engine_score_breakdown: ScoreBreakdown
    engine_warnings: list[str] = Field(default_factory=list)

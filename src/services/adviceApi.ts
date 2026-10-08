// Tư vấn phối đồ: chỗ duy nhất trong app chạm tới LLM.
// Backend buộc LLM tuân theo outfit và điểm số của rule engine; nếu LLM
// chưa cấu hình hoặc lỗi, backend trả tư vấn theo luật kèm `llmError`.

export interface OutfitAdvice {
  outfitId: string;
  adviceSource: string;
  model?: string | null;
  llmError?: string | null;
  genZConcept: string;
  stylingTips: string[];
  culturalSignificance: string;
  colorHarmonyNote: string;
  culturalCheck: {
    score: number;
    culturalRespectTips: string;
    cautions: string;
  };
  engineScore: number;
  engineWarnings: string[];
}

interface ApiAdvice {
  success?: boolean;
  outfit_id: string;
  advice_source: string;
  model?: string | null;
  llm_error?: string | null;
  gen_z_concept: string;
  styling_tips: string[];
  cultural_significance: string;
  color_harmony_note: string;
  cultural_check: { score: number; cultural_respect_tips: string; cautions: string };
  engine_score: number;
  engine_warnings?: string[];
  detail?: string;
  error?: string;
}

export async function fetchOutfitAdvice(
  occasion: string,
  style: string,
  color: string,
  outfitId?: string,
): Promise<OutfitAdvice> {
  const response = await fetch('/api/ai-styling', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ occasion, style, color, outfitId }),
  });
  const payload = (await response.json()) as ApiAdvice;
  if (!response.ok || payload.success === false) {
    throw new Error(payload.detail || payload.error || 'Không lấy được tư vấn phối đồ.');
  }
  return {
    outfitId: payload.outfit_id,
    adviceSource: payload.advice_source,
    model: payload.model ?? null,
    llmError: payload.llm_error ?? null,
    genZConcept: payload.gen_z_concept,
    stylingTips: payload.styling_tips ?? [],
    culturalSignificance: payload.cultural_significance,
    colorHarmonyNote: payload.color_harmony_note,
    culturalCheck: {
      score: payload.cultural_check.score,
      culturalRespectTips: payload.cultural_check.cultural_respect_tips,
      cautions: payload.cultural_check.cautions,
    },
    engineScore: payload.engine_score,
    engineWarnings: payload.engine_warnings ?? [],
  };
}

import { COLOR_OPTIONS, GarmentItem, OUTFIT_SETS, OutfitSet } from '../data/vietFashionData';

interface ApiItem {
  id: string;
  group: 'garment' | 'accessories' | 'footwear';
  category: string;
  name: string;
  color: string | null;
  image_url: string;
  description: string | null;
  cultural_meaning: string | null;
  cultural_notes: string | null;
  source: string | null;
}

interface ApiRecommendation {
  id: string;
  title: string;
  items: ApiItem[];
  score: number;
  score_breakdown: { color: number; style: number; occasion: number; cultural: number };
  explanation: string;
  warnings: string[];
  cultural_sources: Array<{ title: string; url?: string | null }>;
  mockup_2d: {
    width: number;
    height: number;
    background: string;
    layers: Array<{
      item_id: string;
      role: 'garment' | 'accessories' | 'footwear';
      image_url: string;
      z_index: number;
    }>;
  };
}

interface ApiResponse {
  success: boolean;
  explanation_source: 'gemini' | 'rule_engine';
  recommendations: ApiRecommendation[];
  detail?: string;
  error?: string;
}

const extraColors: Record<string, string> = {
  Cam: '#EA580C', Tím: '#7E22CE', Nâu: '#78350F', Be: '#D6D3D1',
  'Xanh lục': '#047857', 'Xanh lá': '#16A34A', 'Vàng be': '#D6B77A',
};

function colorHex(color: string, fallback: string): string {
  return COLOR_OPTIONS.find((option) => option.value === color)?.hex || extraColors[color] || fallback;
}

function toGarmentItem(item: ApiItem, template: GarmentItem, selectedColor: string): GarmentItem {
  const isGarment = item.group === 'garment';
  const sourceIsUrl = Boolean(item.source?.startsWith('http'));
  const generatedSuffix = item.name.startsWith(`${item.category} — `)
    ? item.name.slice(item.category.length + 3)
    : '';
  const displayName = !isGarment && /^[a-z0-9_-]+$/i.test(generatedSuffix)
    ? item.category
    : item.name;
  return {
    ...template,
    id: item.id,
    name: displayName,
    type: item.category,
    category: isGarment ? 'main' : item.group === 'footwear' ? 'footwear' : 'accessory',
    imageUrl: item.image_url,
    galleryImages: [item.image_url],
    keyFeatures: item.description || item.cultural_notes || template.keyFeatures,
    culturalMeaning: item.cultural_meaning || item.cultural_notes || (isGarment ? template.culturalMeaning : 'Điểm nhấn hoàn thiện tổng thể trang phục.'),
    verifiedSource: {
      name: item.source || 'VietFashion Dataset v2',
      museum: item.source || 'VietFashion Dataset v2',
      citation: item.source || 'Dữ liệu từ PostgreSQL VietFashion.',
      documentUrl: sourceIsUrl ? item.source! : '#',
    },
    colorHex: colorHex(item.color || selectedColor, template.colorHex),
  };
}

export async function fetchRecommendations(
  occasion: string,
  style: string,
  color: string,
): Promise<OutfitSet[]> {
  const response = await fetch('/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ occasion, style, color, limit: 5 }),
  });
  const payload = await response.json() as ApiResponse;
  if (!response.ok || !payload.success) {
    throw new Error(payload.detail || payload.error || 'Không thể tạo gợi ý phối đồ.');
  }

  return payload.recommendations.map((recommendation) => {
    const garment = recommendation.items.find((item) => item.group === 'garment');
    const template = OUTFIT_SETS.find((outfit) => outfit.categoryName === garment?.category) || OUTFIT_SETS[0];
    const mainTemplate = template.items.find((item) => item.category === 'main') || template.items[0];
    const items = recommendation.items.map((item) => toGarmentItem(item, mainTemplate, color));
    const main = items.find((item) => item.category === 'main') || items[0];
    const selectedHex = colorHex(garment?.color || color, template.colorHex);
    return {
      ...template,
      id: recommendation.id,
      title: recommendation.title,
      subtitle: `${occasion} · ${style}`,
      description: recommendation.explanation,
      context: occasion,
      style,
      primaryColor: garment?.color || color,
      colorHex: selectedHex,
      modelImage: main.imageUrl,
      model3DConfig: { ...template.model3DConfig, baseColor: selectedHex },
      items,
      mockup2D: recommendation.mockup_2d ? {
        width: recommendation.mockup_2d.width,
        height: recommendation.mockup_2d.height,
        background: recommendation.mockup_2d.background,
        layers: recommendation.mockup_2d.layers.map((layer) => ({
          itemId: layer.item_id,
          role: layer.role,
          imageUrl: layer.image_url,
          zIndex: layer.z_index,
        })),
      } : undefined,
      culturalSources: recommendation.cultural_sources || [],
      colorHarmony: {
        ...template.colorHarmony,
        score: Math.round(recommendation.score_breakdown.color * 10),
        palette: [selectedHex, ...items.slice(1).map((item) => item.colorHex)],
        explanation: `Mức hòa hợp màu sắc ${recommendation.score_breakdown.color}/10.`,
      },
      culturalBadge: {
        verified: recommendation.score_breakdown.cultural >= 8,
        rating: Math.round(recommendation.score_breakdown.cultural * 10),
        summary: recommendation.warnings[0] || 'Tổ hợp đã qua Compatibility Engine.',
      },
      genZTips: [recommendation.explanation],
      recommendation: {
        score: recommendation.score,
        scoreBreakdown: {
          color: recommendation.score_breakdown.color,
          style: recommendation.score_breakdown.style,
          occasion: recommendation.score_breakdown.occasion,
          cultural: recommendation.score_breakdown.cultural,
        },
        explanation: recommendation.explanation,
        warnings: recommendation.warnings,
        explanationSource: payload.explanation_source,
      },
    };
  });
}

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
  region: string | null;
  era: string | null;
  material: string | null;
  occasion: string[];
  do_notes: string[];
  dont_notes: string[];
}

interface ApiRecommendation {
  id: string;
  title: string;
  items: ApiItem[];
  score: number;
  // null = database chưa có dữ liệu cho tiêu chí đó, khác với điểm thấp.
  score_breakdown: {
    color: number | null;
    style: number | null;
    occasion: number | null;
    cultural: number | null;
  };
  score_basis: {
    dimensions_used: string[];
    dimensions_missing: string[];
    effective_weights: Record<string, number>;
  };
  reviewed: boolean;
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
  explanation_source: 'rule_engine';
  data_quality: {
    garments_reviewed: number;
    garments_total: number;
    styling_items_reviewed: number;
    styling_items_total: number;
    missing_dimensions: string[];
    notes: string[];
  };
  recommendations: ApiRecommendation[];
  detail?: string;
  error?: string;
}

const DIMENSION_LABELS: Record<string, string> = {
  color: 'màu sắc', style: 'phong cách', occasion: 'bối cảnh', cultural: 'văn hoá',
};

const extraColors: Record<string, string> = {
  Cam: '#EA580C', Tím: '#7E22CE', Nâu: '#78350F', Be: '#D6D3D1',
  'Xanh lục': '#047857', 'Xanh lá': '#16A34A', 'Vàng be': '#D6B77A',
};

function colorHex(color: string, fallback: string): string {
  return COLOR_OPTIONS.find((option) => option.value === color)?.hex || extraColors[color] || fallback;
}

// Món đồ từ PostgreSQL được dựng TƯỜNG MINH, không spread template hardcode.
//
// Trước đây hàm này mở đầu bằng `...template` lấy từ OUTFIT_SETS, nên era,
// material, genZStylingNote, culturalDoAndDont, suitableContexts của một outfit
// mẫu khác bị gán cho món đồ thật rồi hiển thị ở bảng "Chi tiết trang phục"
// ngay cạnh nhãn nguồn — tức là nói sai về di sản văn hoá, không chỉ là nợ
// kỹ thuật. Giờ field nào database chưa có thì để undefined và giao diện ẩn đi.
function toGarmentItem(item: ApiItem, fallbackColorHex: string, selectedColor: string): GarmentItem {
  const isGarment = item.group === 'garment';
  const sourceIsUrl = Boolean(item.source?.startsWith('http'));
  const generatedSuffix = item.name.startsWith(`${item.category} — `)
    ? item.name.slice(item.category.length + 3)
    : '';
  const displayName = !isGarment && /^[a-z0-9_-]+$/i.test(generatedSuffix)
    ? item.category
    : item.name;

  const dos = item.do_notes ?? [];
  const donts = item.dont_notes ?? [];

  return {
    id: item.id,
    name: displayName,
    type: item.category,
    category: isGarment ? 'main' : item.group === 'footwear' ? 'footwear' : 'accessory',
    imageUrl: item.image_url,
    galleryImages: [item.image_url],
    colorHex: colorHex(item.color || selectedColor, fallbackColorHex),
    // Chỉ những gì database thật sự trả về:
    region: item.region ?? undefined,
    era: item.era ?? undefined,
    material: item.material ?? undefined,
    suitableContexts: item.occasion?.length ? item.occasion : undefined,
    keyFeatures: item.description ?? item.cultural_notes ?? undefined,
    culturalMeaning: item.cultural_meaning ?? item.cultural_notes ?? undefined,
    culturalDoAndDont: dos.length || donts.length ? { dos, donts } : undefined,
    // genZStylingNote không có cột tương ứng trong schema -> luôn undefined.
    genZStylingNote: undefined,
    verifiedSource: item.source
      ? {
          name: item.source,
          museum: item.source,
          citation: item.source,
          documentUrl: sourceIsUrl ? item.source : '#',
        }
      : undefined,
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
    const items = recommendation.items.map((item) => toGarmentItem(item, template.colorHex, color));
    const main = items.find((item) => item.category === 'main') || items[0];
    const selectedHex = colorHex(garment?.color || color, template.colorHex);
    const colorScore = recommendation.score_breakdown.color;
    const culturalScore = recommendation.score_breakdown.cultural;
    // Dựng tường minh, KHÔNG spread template. Chỉ lấy từ template những thứ
    // thuần trình bày (tên nhóm hiển thị, cấu hình dựng hình), tuyệt đối không
    // lấy nội dung văn hoá — ví dụ colorHarmony.element (ngũ hành) trước đây bị
    // lọt qua đây và hiện trong Lookbook như một nhận định có căn cứ.
    return {
      categoryName: template.categoryName,
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
        // element để trống: database không có dữ liệu ngũ hành cho tổ hợp này.
        element: '',
        score: colorScore === null ? 0 : Math.round(colorScore * 10),
        palette: [selectedHex, ...items.slice(1).map((item) => item.colorHex)],
        explanation: colorScore === null
          ? 'Database chưa ghi nhận màu của trang phục này nên không chấm được hoà hợp màu.'
          : `Mức hòa hợp màu sắc ${colorScore}/10.`,
      },
      culturalBadge: {
        // "Đã kiểm duyệt" lấy từ review_status của database, KHÔNG suy từ điểm.
        // Điểm cao không có nghĩa là đã có người đối chiếu nguồn.
        verified: recommendation.reviewed,
        rating: culturalScore === null ? 0 : Math.round(culturalScore * 10),
        summary: recommendation.warnings[0]
          || (recommendation.reviewed ? 'Dữ liệu đã được kiểm duyệt.' : 'Dữ liệu chưa được kiểm duyệt.'),
      },
      genZTips: [recommendation.explanation],
      recommendation: {
        score: recommendation.score,
        scoreBreakdown: {
          color: colorScore,
          style: recommendation.score_breakdown.style,
          occasion: recommendation.score_breakdown.occasion,
          cultural: culturalScore,
        },
        scoreBasis: {
          dimensionsUsed: recommendation.score_basis.dimensions_used,
          dimensionsMissing: recommendation.score_basis.dimensions_missing,
          missingLabels: recommendation.score_basis.dimensions_missing.map((key) => DIMENSION_LABELS[key] || key),
          effectiveWeights: recommendation.score_basis.effective_weights,
        },
        reviewed: recommendation.reviewed,
        explanation: recommendation.explanation,
        warnings: recommendation.warnings,
        explanationSource: payload.explanation_source,
      },
    };
  });
}

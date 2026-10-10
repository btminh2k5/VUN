export interface GarmentItem {
  id: string;
  name: string;
  type: string;
  category: 'main' | 'pants' | 'accessory' | 'footwear' | 'headwear';
  imageUrl: string;
  galleryImages: string[];
  colorHex: string;
  // Các field dưới đây là TUỲ CHỌN vì database có thể chưa có dữ liệu.
  // Với món đồ đến từ PostgreSQL, thiếu thì để undefined và giao diện ẩn đi —
  // tuyệt đối không lấp bằng giá trị của một outfit mẫu khác rồi hiển thị
  // kèm nhãn "nguồn đã kiểm chứng".
  region?: string;
  era?: string;
  suitableContexts?: string[];
  suitableStyles?: string[];
  keyFeatures?: string;
  culturalMeaning?: string;
  material?: string;
  verifiedSource?: {
    name: string;
    documentUrl: string;
    citation: string;
    museum: string;
  };
  genZStylingNote?: string;
  culturalDoAndDont?: {
    dos: string[];
    donts: string[];
  };
}

export interface OutfitSet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  categoryName: 'Áo dài' | 'Áo bà ba' | 'Áo giao lĩnh' | 'Áo ngũ thân tay chẽn' | 'Áo yếm';
  context: string;
  style: string;
  primaryColor: string;
  colorHex: string;
  modelImage: string;
  model3DConfig: {
    baseColor: string;
    secondaryColor: string;
    trimColor: string;
    fabricGloss: number;
    silhouette: 'aodai' | 'nguthan' | 'aotac' | 'tuthan' | 'nhatbinh';
    sleeveWidth: 'fitted' | 'medium' | 'wide';
    collarHeight: number;
  };
  items: GarmentItem[];
  mockup2D?: {
    width: number;
    height: number;
    background: string;
    layers: Array<{
      itemId: string;
      role: 'garment' | 'accessories' | 'footwear';
      imageUrl: string;
      zIndex: number;
    }>;
  };
  culturalSources?: Array<{
    title: string;
    url?: string | null;
  }>;
  colorHarmony: {
    score: number;
    palette: string[];
    element: string;
    explanation: string;
  };
  culturalBadge: {
    verified: boolean;
    rating: number;
    summary: string;
  };
  genZTips: string[];
  recommendation?: {
    score: number;
    // null = database chưa có dữ liệu cho tiêu chí đó.
    scoreBreakdown: {
      color: number | null;
      style: number | null;
      occasion: number | null;
      cultural: number | null;
    };
    // Điểm được tính trên tiêu chí nào, với trọng số nào sau khi chia lại.
    scoreBasis?: {
      dimensionsUsed: string[];
      dimensionsMissing: string[];
      missingLabels: string[];
      effectiveWeights: Record<string, number>;
    };
    reviewed?: boolean;
    explanation: string;
    warnings: string[];
    // Engine phối đồ không dùng LLM — giải thích luôn từ rule engine.
    explanationSource: 'rule_engine';
  };
}

export interface DatasetVariantRecord {
  id: number;
  category: 'Áo bà ba' | 'Áo dài' | 'Áo giao lĩnh' | 'Áo ngũ thân tay chẽn' | 'Áo yếm';
  name: string;
  color: string;
  imageUrl: string;
  datasetPath: string;
  region: string;
  culturalMeaning: string;
}

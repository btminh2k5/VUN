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

// 35 Real items from PostgreSQL schema `wardrobe.outfit_catalog`
export const REAL_DATASET_35_ITEMS: DatasetVariantRecord[] = [
  // Áo bà ba (8 ảnh)
  { id: 1, category: 'Áo bà ba', name: 'Áo bà ba màu cam', color: 'Cam', imageUrl: '/images/dataset/aobaba/BB_cam.jpg', datasetPath: 'dataset/aobaba/BB_cam.jpg', region: 'Nam Bộ', culturalMeaning: 'Nét duyên dáng, thuận tiện lao động của phụ nữ miền Tây sông nước.' },
  { id: 2, category: 'Áo bà ba', name: 'Áo bà ba màu đỏ', color: 'Đỏ', imageUrl: '/images/dataset/aobaba/BB_do.jpg', datasetPath: 'dataset/aobaba/BB_do.jpg', region: 'Nam Bộ', culturalMeaning: 'May mắn, hân hoan trong các dịp lễ tết và hội hè miệt vườn.' },
  { id: 3, category: 'Áo bà ba', name: 'Áo bà ba màu hồng', color: 'Hồng', imageUrl: '/images/dataset/aobaba/BB_hong.jpg', datasetPath: 'dataset/aobaba/BB_hong.jpg', region: 'Nam Bộ', culturalMeaning: 'Nét duyên e ấp, dịu dàng của thiếu nữ Đồng bằng sông Cửu Long.' },
  { id: 4, category: 'Áo bà ba', name: 'Áo bà ba màu nâu', color: 'Nâu', imageUrl: '/images/dataset/aobaba/BB_nau.jpg', datasetPath: 'dataset/aobaba/BB_nau.jpg', region: 'Nam Bộ', culturalMeaning: 'Màu nâu phù sa, biểu trưng cho đức tính cần cù, mộc mạc và chân chất.' },
  { id: 5, category: 'Áo bà ba', name: 'Áo bà ba màu tím', color: 'Tím', imageUrl: '/images/dataset/aobaba/BB_Tim.jpg', datasetPath: 'dataset/aobaba/BB_Tim.jpg', region: 'Nam Bộ', culturalMeaning: 'Tình cảm sắt son, chung thủy của người phụ nữ phương Nam.' },
  { id: 6, category: 'Áo bà ba', name: 'Áo bà ba màu trắng', color: 'Trắng', imageUrl: '/images/dataset/aobaba/BB_trang.jpg', datasetPath: 'dataset/aobaba/BB_trang.jpg', region: 'Nam Bộ', culturalMeaning: 'Thanh thuần, tươi trẻ, tôn lên làn da và phom dáng kín đáo.' },
  { id: 7, category: 'Áo bà ba', name: 'Áo bà ba màu xanh cốm', color: 'Xanh cốm', imageUrl: '/images/dataset/aobaba/BB_xanhcom.jpg', datasetPath: 'dataset/aobaba/BB_xanhcom.jpg', region: 'Nam Bộ', culturalMeaning: 'Sức sống của chồi non mạ biếc, mùa màng trù phú bờ kênh ngọn rạch.' },
  { id: 8, category: 'Áo bà ba', name: 'Áo bà ba màu xanh lam', color: 'Xanh lam', imageUrl: '/images/dataset/aobaba/BB_xanhlam.jpg', datasetPath: 'dataset/aobaba/BB_xanhlam.jpg', region: 'Nam Bộ', culturalMeaning: 'Nước lớn nước ròng hiền hòa nuôi dưỡng bao thế hệ miền sông nước.' },

  // Áo dài (7 ảnh)
  { id: 9, category: 'Áo dài', name: 'Áo dài màu cam', color: 'Cam', imageUrl: '/images/dataset/aodai/ad_cam.jpg', datasetPath: 'dataset/aodai/ad_cam.jpg', region: 'Việt Nam', culturalMeaning: 'Tươi tắn, năng động, đại diện cho tinh thần đón đầu đổi mới.' },
  { id: 10, category: 'Áo dài', name: 'Áo dài màu đỏ', color: 'Đỏ', imageUrl: '/images/dataset/aodai/ad_do.jpg', datasetPath: 'dataset/aodai/ad_do.jpg', region: 'Việt Nam', culturalMeaning: 'Biểu tượng may mắn, sum vầy và phúc lộc tròn đầy mùa xuân và ngày cưới.' },
  { id: 11, category: 'Áo dài', name: 'Áo dài màu hồng', color: 'Hồng', imageUrl: '/images/dataset/aodai/ad_hong.jpg', datasetPath: 'dataset/aodai/ad_hong.jpg', region: 'Việt Nam', culturalMeaning: 'Tình yêu đôi lứa trong sáng và sự nữ tính ngọt ngào.' },
  { id: 12, category: 'Áo dài', name: 'Áo dài màu tím', color: 'Tím', imageUrl: '/images/dataset/aodai/ad_tim.jpg', datasetPath: 'dataset/aodai/ad_tim.jpg', region: 'Việt Nam', culturalMeaning: 'Nét duyên dáng kín đáo, thâm trầm gắn liền với nữ sinh Đồng Khánh Huế.' },
  { id: 13, category: 'Áo dài', name: 'Áo dài màu vàng', color: 'Vàng', imageUrl: '/images/dataset/aodai/ad_vang.jpg', datasetPath: 'dataset/aodai/ad_vang.jpg', region: 'Việt Nam', culturalMeaning: 'Vinh hoa, phú quý, ánh mai vàng rực rỡ khởi sắc đầu năm.' },
  { id: 14, category: 'Áo dài', name: 'Áo dài màu xanh lam', color: 'Xanh lam', imageUrl: '/images/dataset/aodai/ad_xanhlam.jpg', datasetPath: 'dataset/aodai/ad_xanhlam.jpg', region: 'Việt Nam', culturalMeaning: 'Sự bình an, trí tuệ và nét đoan trang thanh nhã.' },
  { id: 15, category: 'Áo dài', name: 'Áo dài màu xanh lục', color: 'Xanh lục', imageUrl: '/images/dataset/aodai/ad_xanhluc.jpg', datasetPath: 'dataset/aodai/ad_xanhluc.jpg', region: 'Việt Nam', culturalMeaning: 'Sức sống thiên nhiên sinh sôi, quý phái như ngọc bích.' },

  // Áo giao lĩnh (5 ảnh)
  { id: 16, category: 'Áo giao lĩnh', name: 'Áo giao lĩnh màu đỏ', color: 'Đỏ', imageUrl: '/images/dataset/aogiaolinh/agl_do.jpg', datasetPath: 'dataset/aogiaolinh/agl_do.jpg', region: 'Cổ phục Việt', culturalMeaning: 'Cổ phục đan chéo trang nghiêm tôn vinh cội nguồn lịch sử ngàn năm.' },
  { id: 17, category: 'Áo giao lĩnh', name: 'Áo giao lĩnh màu hồng', color: 'Hồng', imageUrl: '/images/dataset/aogiaolinh/agl_hong.jpg', datasetPath: 'dataset/aogiaolinh/agl_hong.jpg', region: 'Cổ phục Việt', culturalMeaning: 'Nét thục nữ khuê các, mềm mại đài các của thiếu nữ thời xưa.' },
  { id: 18, category: 'Áo giao lĩnh', name: 'Áo giao lĩnh màu tím', color: 'Tím', imageUrl: '/images/dataset/aogiaolinh/agl_tim.jpg', datasetPath: 'dataset/aogiaolinh/agl_tim.jpg', region: 'Cổ phục Việt', culturalMeaning: 'Chiều sâu tri thức và nét trang nghiêm trong các nghi lễ cung đình.' },
  { id: 19, category: 'Áo giao lĩnh', name: 'Áo giao lĩnh màu xanh lá', color: 'Xanh lá', imageUrl: '/images/dataset/aogiaolinh/agl_xanhla.jpg', datasetPath: 'dataset/aogiaolinh/agl_xanhla.jpg', region: 'Cổ phục Việt', culturalMeaning: 'Sự hài hòa âm dương với cây cỏ hoa lá theo triết lý tự nhiên.' },
  { id: 20, category: 'Áo giao lĩnh', name: 'Áo giao lĩnh màu xanh lam', color: 'Xanh lam', imageUrl: '/images/dataset/aogiaolinh/agl_xanhlam.jpg', datasetPath: 'dataset/aogiaolinh/agl_xanhlam.jpg', region: 'Cổ phục Việt', culturalMeaning: 'Phong thái khoan thai, tĩnh tại và tâm hồn thanh khiết.' },

  // Áo ngũ thân tay chẽn (7 ảnh)
  { id: 21, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu be', color: 'Be', imageUrl: '/images/dataset/aonguthan_taychen/ant_be.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_be.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Khuôn thước mực thước, 5 cúc tượng trưng ngũ thường (Nhân - Lễ - Nghĩa - Trí - Tín).' },
  { id: 22, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu đỏ', color: 'Đỏ', imageUrl: '/images/dataset/aonguthan_taychen/ant_do.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_do.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Sự vinh hiển gia tộc, tứ thân phụ mẫu ôm bọc con cái trong đại lễ.' },
  { id: 23, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu hồng', color: 'Hồng', imageUrl: '/images/dataset/aonguthan_taychen/ant_hong.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_hong.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Nho nhã, thanh tú, tôn vẻ đẹp kín đáo của thiếu nữ Việt cận đại.' },
  { id: 24, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu tím', color: 'Tím', imageUrl: '/images/dataset/aonguthan_taychen/ant_tim.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_tim.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Di sản Cố đô, sự đoan trang thanh cao của người phụ nữ đất kinh kỳ.' },
  { id: 25, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu trắng', color: 'Trắng', imageUrl: '/images/dataset/aonguthan_taychen/ant_trang.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_trang.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Sự trong sáng, tinh giản của phong cách tân cổ điển hiện đại.' },
  { id: 26, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu xanh lam', color: 'Xanh lam', imageUrl: '/images/dataset/aonguthan_taychen/ant_xanhlam.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_xanhlam.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Khí chất điềm đạm, tao nhã và tri thức của tầng lớp trí thức xưa.' },
  { id: 27, category: 'Áo ngũ thân tay chẽn', name: 'Áo ngũ thân tay chẽn màu xanh lục', color: 'Xanh lục', imageUrl: '/images/dataset/aonguthan_taychen/ant_xanhluc.jpg', datasetPath: 'dataset/aonguthan_taychen/ant_xanhluc.jpg', region: 'Huế & Toàn quốc', culturalMeaning: 'Quyền quý, thâm nghiêm, biểu trưng cho sự trường tồn vĩnh cửu.' },

  // Áo yếm (8 ảnh)
  { id: 28, category: 'Áo yếm', name: 'Áo yếm màu hồng', color: 'Hồng', imageUrl: '/images/dataset/aoyem/yem_hong.jpg', datasetPath: 'dataset/aoyem/yem_hong.jpg', region: 'Dân gian Việt', culturalMeaning: 'Dải yếm hoa đào gợi nhắc câu ca dao tình tứ của hội Lim Quan họ.' },
  { id: 29, category: 'Áo yếm', name: 'Áo yếm màu tím', color: 'Tím', imageUrl: '/images/dataset/aoyem/yem_tim.jpg', datasetPath: 'dataset/aoyem/yem_tim.jpg', region: 'Dân gian Việt', culturalMeaning: 'Nét kín đáo thầm kín, tế nhị và e ấp của người con gái.' },
  { id: 30, category: 'Áo yếm', name: 'Áo yếm màu trắng', color: 'Trắng', imageUrl: '/images/dataset/aoyem/yem_trang.jpg', datasetPath: 'dataset/aoyem/yem_trang.jpg', region: 'Dân gian Việt', culturalMeaning: 'Vẻ đẹp thanh bạch, trong ngần gắn với hoa sen hồ Tây.' },
  { id: 31, category: 'Áo yếm', name: 'Áo yếm màu vàng be', color: 'Vàng be', imageUrl: '/images/dataset/aoyem/yem_vangbe.jpg', datasetPath: 'dataset/aoyem/yem_vangbe.jpg', region: 'Dân gian Việt', culturalMeaning: 'Màu đũi tơ tằm dệt thủ công mộc mạc đậm tình quê hương.' },
  { id: 32, category: 'Áo yếm', name: 'Áo yếm màu vàng tươi', color: 'Vàng tươi', imageUrl: '/images/dataset/aoyem/yem_vangtuoi.jpg', datasetPath: 'dataset/aoyem/yem_vangtuoi.jpg', region: 'Dân gian Việt', culturalMeaning: 'Tươi tắn, rộn ràng trong nắng xuân hội làng truyền thống.' },
  { id: 33, category: 'Áo yếm', name: 'Áo yếm màu xanh', color: 'Xanh', imageUrl: '/images/dataset/aoyem/yem_xanh.jpg', datasetPath: 'dataset/aoyem/yem_xanh.jpg', region: 'Dân gian Việt', culturalMeaning: 'Sắc xanh đồng nội mộc mạc, gần gũi với thiên nhiên.' },
  { id: 34, category: 'Áo yếm', name: 'Áo yếm màu xanh lam', color: 'Xanh lam', imageUrl: '/images/dataset/aoyem/yem_xanhlam.jpg', datasetPath: 'dataset/aoyem/yem_xanhlam.jpg', region: 'Dân gian Việt', culturalMeaning: 'Dịu mát, thanh tao khi mặc lót trong áo tứ thân hoặc áo cánh.' },
  { id: 35, category: 'Áo yếm', name: 'Áo yếm màu xanh lục', color: 'Xanh lục', imageUrl: '/images/dataset/aoyem/yem_xanhluc.jpg', datasetPath: 'dataset/aoyem/yem_xanhluc.jpg', region: 'Dân gian Việt', culturalMeaning: 'Màu của lá sen, biểu trưng cho sự tươi trẻ và căng tràn nhựa sống.' }
];

export const VIET_FASHION_ITEMS: Record<string, GarmentItem> = {
  // Áo dài
  'ao-dai-do-gam': {
    id: 'ao-dai-do-gam',
    name: 'Áo dài đỏ may mắn',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_do.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_do.jpg',
      '/images/dataset/aodai/ad_vang.jpg',
      '/images/dataset/aodai/ad_hong.jpg',
      '/images/dataset/aodai/ad_cam.jpg'
    ],
    region: 'Toàn quốc',
    era: 'Tân thời (thập niên 1930 đến nay)',
    suitableContexts: ['Tết', 'Lễ hội', 'Cưới hỏi', 'Chụp ảnh xuân'],
    suitableStyles: ['Hiện đại', 'Thanh lịch', 'Cổ điển'],
    keyFeatures: 'Dáng áo thon dài chấm mắt cá chân, xẻ tà hai bên eo cao, chất liệu lụa gấm hoa sen chìm.',
    culturalMeaning: 'Màu đỏ tượng trưng cho may mắn, thịnh vượng, xua tan điều xui xẻo trong dịp đầu năm mới.',
    material: 'Gấm tơ tằm dệt thủ công',
    verifiedSource: {
      name: 'VietFashion Database (wardrobe.outfit_catalog)',
      museum: 'Bảo tàng Phụ nữ Nam Bộ & Bảo tàng Phụ nữ Việt Nam',
      documentUrl: 'https://baotangphunu.org.vn',
      citation: 'Tài liệu trưng bày "Áo dài qua các thời kỳ lịch sử", NXB Văn hóa Dân tộc 2021.'
    },
    genZStylingNote: 'Tóc búi thấp lơi kèm kẹp kim loại, son đỏ đất tự nhiên.',
    culturalDoAndDont: {
      dos: ['Giữ lưng thẳng, bước đi nhẹ nhàng khi diện áo dài.'],
      donts: ['Tránh cắt xẻ tà áo quá cao trên eo làm mất phom dáng truyền thống.']
    },
    colorHex: '#C51E28'
  },
  'ao-dai-vang-hoang-yen': {
    id: 'ao-dai-vang-hoang-yen',
    name: 'Áo dài vàng hoàng yến',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_vang.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_vang.jpg',
      '/images/dataset/aodai/ad_do.jpg',
      '/images/dataset/aodai/ad_cam.jpg'
    ],
    region: 'Toàn quốc',
    era: 'Tân thời',
    suitableContexts: ['Tết', 'Dạ tiệc', 'Lễ kỷ niệm', 'Cưới hỏi'],
    suitableStyles: ['Hiện đại', 'Thanh lịch', 'Vương giả'],
    keyFeatures: 'Tông vàng hoa mai rực rỡ, lụa óng ả mềm rủ tự nhiên.',
    culturalMeaning: 'Sắc vàng vương giả, tượng trưng cho ấm no sung túc và khởi đầu năm mới hanh thông.',
    material: 'Lụa tơ tằm óng ánh',
    verifiedSource: {
      name: 'Hồ sơ Di sản Áo dài Việt Nam',
      museum: 'Viện Văn hóa Nghệ thuật Quốc gia Việt Nam',
      documentUrl: 'https://vietnamtourism.gov.vn',
      citation: 'Vietnam Tourism — Tất cả về áo dài.'
    },
    genZStylingNote: 'Kết hợp cùng khuyên tai ngọc trai tạo diện mạo sang xịn mịn.',
    culturalDoAndDont: {
      dos: ['Ủi phẳng nếp tà áo trước khi diện.'],
      donts: ['Tránh phụ kiện kim loại quá rườm rà át mất nét đẹp áo.']
    },
    colorHex: '#CA8A04'
  },
  'ao-dai-cam-hoang-hon': {
    id: 'ao-dai-cam-hoang-hon',
    name: 'Áo dài cam hoàng hôn',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_cam.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_cam.jpg',
      '/images/dataset/aodai/ad_do.jpg'
    ],
    region: 'Việt Nam',
    era: 'Tân thời',
    suitableContexts: ['Dạo phố', 'Tết', 'Chụp ảnh', 'Đi học'],
    suitableStyles: ['Hiện đại', 'Năng động'],
    keyFeatures: 'Sắc cam ấm áp, tôn da sáng và nét tươi trẻ năng động.',
    culturalMeaning: 'Nhiệt huyết, sự sáng tạo và năng lượng tích cực.',
    material: 'Lụa tơ tằm mềm mại',
    verifiedSource: {
      name: 'Bảo tàng Phụ nữ Việt Nam',
      museum: 'Bảo tàng Phụ nữ Việt Nam',
      documentUrl: 'https://baotangphunu.org.vn',
      citation: 'Áo dài Việt Nam hiện đại.'
    },
    genZStylingNote: 'Trang điểm tông cam đào trẻ trung.',
    culturalDoAndDont: {
      dos: ['Chọn dáng áo ôm vừa vặn thoải mái.'],
      donts: ['Không kéo căng vải áo khi giặt.']
    },
    colorHex: '#EA580C'
  },
  'ao-dai-hong-canh-sen': {
    id: 'ao-dai-hong-canh-sen',
    name: 'Áo dài hồng cánh sen',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_hong.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_hong.jpg',
      '/images/dataset/aodai/ad_tim.jpg'
    ],
    region: 'Việt Nam',
    era: 'Tân thời',
    suitableContexts: ['Đi học', 'Kỷ yếu', 'Tết', 'Dạo phố'],
    suitableStyles: ['Nàng thơ', 'Thanh lịch'],
    keyFeatures: 'Hồng pastel dịu dàng, tà áo thướt tha mềm rủ.',
    culturalMeaning: 'Nét duyên thầm e ấp, tình yêu đôi lứa trong sáng.',
    material: 'Lụa tơ tằm satin',
    verifiedSource: {
      name: 'Vietnam Tourism',
      museum: 'Bảo tàng Phụ nữ Nam Bộ',
      documentUrl: 'https://vietnam.travel',
      citation: 'Tất cả về áo dài.'
    },
    genZStylingNote: 'Tóc xõa tự nhiên hoặc uốn sóng nhẹ.',
    culturalDoAndDont: {
      dos: ['Bước đi khoan thai.'],
      donts: ['Tránh vải quá mỏng không lớp lót.']
    },
    colorHex: '#DB2777'
  },
  'ao-dai-tim-hue': {
    id: 'ao-dai-tim-hue',
    name: 'Áo dài tím mộng mơ',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_tim.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_tim.jpg',
      '/images/dataset/aodai/ad_do.jpg'
    ],
    region: 'Huế & Toàn quốc',
    era: 'Tân thời',
    suitableContexts: ['Tết', 'Lễ kỷ niệm', 'Chụp ảnh nghệ thuật'],
    suitableStyles: ['Quý phái', 'Cổ điển'],
    keyFeatures: 'Màu tím hoa cà đằm thắm, tà dài chấm gót.',
    culturalMeaning: 'Sự son sắt thủy chung, kín đáo và chiều sâu tâm hồn.',
    material: 'Lụa tơ tằm Huế',
    verifiedSource: {
      name: 'Bảo tàng Phụ nữ Nam Bộ',
      museum: 'Bảo tàng Phụ nữ Nam Bộ',
      documentUrl: 'https://baotangphunu.com',
      citation: 'Bộ sưu tập áo dài phụ nữ Việt Nam.'
    },
    genZStylingNote: 'Đeo kiềng bạc hoặc vòng tay ngọc nhẹ nhàng.',
    culturalDoAndDont: {
      dos: ['Cổ áo cài kín đáo.'],
      donts: ['Không kéo xắn tà áo lên cao.']
    },
    colorHex: '#7E22CE'
  },
  'ao-dai-xanh-lam-ngoc': {
    id: 'ao-dai-xanh-lam-ngoc',
    name: 'Áo dài xanh lam ngọc',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_xanhlam.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_xanhlam.jpg',
      '/images/dataset/aodai/ad_xanhluc.jpg'
    ],
    region: 'Toàn quốc',
    era: 'Tân thời',
    suitableContexts: ['Dạo phố', 'Tết', 'Lễ hội'],
    suitableStyles: ['Hiện đại', 'Thanh lịch'],
    keyFeatures: 'Màu xanh lam ngọc mát dịu, tôn vóc dáng thanh mảnh.',
    culturalMeaning: 'Sự tự do, bình an và thanh khiết.',
    material: 'Lụa dệt hoa văn chìm',
    verifiedSource: {
      name: 'Vietnam Tourism',
      museum: 'Bảo tàng Phụ nữ Việt Nam',
      documentUrl: 'https://vietnamtourism.gov.vn',
      citation: 'Tài liệu áo dài qua các thời kỳ.'
    },
    genZStylingNote: 'Túi cói mini hoặc túi xách nhỏ màu kem.',
    culturalDoAndDont: {
      dos: ['Giữ tà áo thẳng nếp.'],
      donts: ['Tránh ngồi đè vò nhàu tà áo.']
    },
    colorHex: '#0D9488'
  },
  'ao-dai-xanh-luc-bao': {
    id: 'ao-dai-xanh-luc-bao',
    name: 'Áo dài xanh lục bảo',
    type: 'Áo dài',
    category: 'main',
    imageUrl: '/images/dataset/aodai/ad_xanhluc.jpg',
    galleryImages: [
      '/images/dataset/aodai/ad_xanhluc.jpg',
      '/images/dataset/aodai/ad_xanhlam.jpg'
    ],
    region: 'Toàn quốc',
    era: 'Tân thời',
    suitableContexts: ['Tết', 'Dạ tiệc', 'Lễ hội'],
    suitableStyles: ['Quý phái', 'Vương giả'],
    keyFeatures: 'Sắc xanh lục biếc sang trọng như ngọc bích.',
    culturalMeaning: 'Sự trường thọ, sinh sôi nảy nở và tài lộc.',
    material: 'Gấm tơ tằm dệt kim tuyến nhẹ',
    verifiedSource: {
      name: 'Bảo tàng Phụ nữ Nam Bộ',
      museum: 'Bảo tàng Phụ nữ Nam Bộ',
      documentUrl: 'https://baotangphunu.com',
      citation: 'Áo dài truyền thống.'
    },
    genZStylingNote: 'Trang sức ánh vàng gold kết hợp cực sang.',
    culturalDoAndDont: {
      dos: ['Khoanh tay trước ngực khi chụp ảnh trang trọng.'],
      donts: ['Không kéo giãn cổ áo.']
    },
    colorHex: '#047857'
  },

  // Áo ngũ thân tay chẽn
  'ao-ngu-than-lam-ngoc': {
    id: 'ao-ngu-than-lam-ngoc',
    name: 'Áo ngũ thân tay chẽn lam ngọc',
    type: 'Áo ngũ thân',
    category: 'main',
    imageUrl: '/images/dataset/aonguthan_taychen/ant_xanhlam.jpg',
    galleryImages: [
      '/images/dataset/aonguthan_taychen/ant_xanhlam.jpg',
      '/images/dataset/aonguthan_taychen/ant_do.jpg',
      '/images/dataset/aonguthan_taychen/ant_be.jpg',
      '/images/dataset/aonguthan_taychen/ant_trang.jpg'
    ],
    region: 'Cố đô Huế & Toàn quốc',
    era: 'Thời Nguyễn (Chúa Nguyễn Phúc Khoát 1744 & Vua Minh Mạng 1827)',
    suitableContexts: ['Lễ hội', 'Dạo phố', 'Tết', 'Sự kiện văn hóa'],
    suitableStyles: ['Cổ điển', 'Hiện đại', 'Tối giản'],
    keyFeatures: 'Cấu trúc 5 thân, 5 cúc cài tượng trưng ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín), tay chẽn gọn gàng linh hoạt.',
    culturalMeaning: 'Biểu tượng của đạo làm người, sự khiêm cung, hòa nhã và tính độc lập văn hóa Việt Nam.',
    material: 'Lụa tơ tằm dệt sa hoặc đoạn gấm bóng mờ',
    verifiedSource: {
      name: 'Hồ sơ Di sản Văn hóa Áo ngũ thân',
      museum: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      documentUrl: 'https://hueworldheritage.org.vn',
      citation: 'Trang thông tin ngành văn hóa Huế — Áo dài Việt Nam qua các thời kỳ lịch sử.'
    },
    genZStylingNote: 'Áo ngũ thân form suông rộng rãi che khuyết điểm cực tốt.',
    culturalDoAndDont: {
      dos: ['Cài đủ 5 cúc cài đúng lề lối quy củ.'],
      donts: ['Không cởi phanh cúc ngực làm mất đi nét kín đáo của đạo ngũ thường.']
    },
    colorHex: '#0D9488'
  },
  'ao-ngu-than-do': {
    id: 'ao-ngu-than-do',
    name: 'Áo ngũ thân tay chẽn đỏ',
    type: 'Áo ngũ thân',
    category: 'main',
    imageUrl: '/images/dataset/aonguthan_taychen/ant_do.jpg',
    galleryImages: [
      '/images/dataset/aonguthan_taychen/ant_do.jpg',
      '/images/dataset/aonguthan_taychen/ant_tim.jpg'
    ],
    region: 'Huế & Toàn quốc',
    era: 'Thời Nguyễn',
    suitableContexts: ['Tết', 'Cưới hỏi', 'Hỷ sự', 'Nghi lễ'],
    suitableStyles: ['Cổ điển', 'Trang nghiêm'],
    keyFeatures: 'Sắc đỏ son trang nghiêm lộng lẫy, 5 cúc cài bên sườn phải.',
    culturalMeaning: 'Tứ thân phụ mẫu ôm bọc con cái, phúc lộc đại lễ.',
    material: 'Gấm dệt tơ tằm',
    verifiedSource: {
      name: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      museum: 'Bảo tàng Cổ vật Cung đình Huế',
      documentUrl: 'https://hueworldheritage.org.vn',
      citation: 'Khảo cứu Lễ phục triều Nguyễn.'
    },
    genZStylingNote: 'Tóc búi gọn kèm khăn đóng bọc gấm đỏ đồng điệu.',
    culturalDoAndDont: {
      dos: ['Cài đủ 5 cúc áo, giữ tư thế đi đứng trang nhã.'],
      donts: ['Không xắn tay áo lên khi chụp ảnh lễ nghi.']
    },
    colorHex: '#C51E28'
  },
  'ao-ngu-than-be': {
    id: 'ao-ngu-than-be',
    name: 'Áo ngũ thân tay chẽn màu be',
    type: 'Áo ngũ thân',
    category: 'main',
    imageUrl: '/images/dataset/aonguthan_taychen/ant_be.jpg',
    galleryImages: [
      '/images/dataset/aonguthan_taychen/ant_be.jpg',
      '/images/dataset/aonguthan_taychen/ant_trang.jpg'
    ],
    region: 'Huế & Toàn quốc',
    era: 'Thời Nguyễn',
    suitableContexts: ['Dạo phố', 'Tết', 'Cafe check-in'],
    suitableStyles: ['Tối giản', 'Nho nhã'],
    keyFeatures: 'Màu be thanh lịch nhã nhặn, chất liệu đũi lụa mát rượi.',
    culturalMeaning: 'Nét khiêm tốn, tao nhã của văn nhân xưa.',
    material: 'Lụa đũi dệt thô tự nhiên',
    verifiedSource: {
      name: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      museum: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      documentUrl: 'https://svhttdl.hue.gov.vn',
      citation: 'Áo dài truyền thống qua các thời kỳ.'
    },
    genZStylingNote: 'Kính râm gọng kim loại tròn tạo vibe học giả hiện đại.',
    culturalDoAndDont: {
      dos: ['Cài đủ 5 nút cúc bọc đồng.'],
      donts: ['Không buông thõng cổ áo.']
    },
    colorHex: '#D6D3D1'
  },

  // Áo bà ba
  'ao-ba-ba-cam': {
    id: 'ao-ba-ba-cam',
    name: 'Áo bà ba màu cam',
    type: 'Áo bà ba',
    category: 'main',
    imageUrl: '/images/dataset/aobaba/BB_cam.jpg',
    galleryImages: [
      '/images/dataset/aobaba/BB_cam.jpg',
      '/images/dataset/aobaba/BB_do.jpg',
      '/images/dataset/aobaba/BB_Tim.jpg',
      '/images/dataset/aobaba/BB_xanhcom.jpg'
    ],
    region: 'Nam Bộ',
    era: 'Truyền thống phương Nam',
    suitableContexts: ['Dạo phố', 'Tết', 'Lễ hội', 'Hoạt động cộng đồng'],
    suitableStyles: ['Tối giản', 'Hiện đại', 'Duyên dáng'],
    keyFeatures: 'Áo không cổ, xẻ ngực cài cúc giữa, xẻ tà hai bên hông tạo sự thoáng mát và năng động.',
    culturalMeaning: 'Gắn liền với hình ảnh người con gái miền Tây duyên dáng, chịu thương chịu khó.',
    material: 'Vải lụa mát rủ mềm mại',
    verifiedSource: {
      name: 'Báo Cần Thơ — Thêm nét duyên khi diện áo bà ba',
      museum: 'Bảo tàng Cần Thơ',
      documentUrl: 'https://baocantho.com.vn',
      citation: 'Nghề may áo bà ba - giữ nét truyền thống phương Nam.'
    },
    genZStylingNote: 'Tóc tết lệch một bên dịu dàng đậm chất miền sông nước.',
    culturalDoAndDont: {
      dos: ['Giữ áo phẳng phiu, cài cúc ngay ngắn.'],
      donts: ['Tránh làm giãn cổ áo.']
    },
    colorHex: '#EA580C'
  },
  'ao-ba-ba-do': {
    id: 'ao-ba-ba-do',
    name: 'Áo bà ba màu đỏ',
    type: 'Áo bà ba',
    category: 'main',
    imageUrl: '/images/dataset/aobaba/BB_do.jpg',
    galleryImages: [
      '/images/dataset/aobaba/BB_do.jpg',
      '/images/dataset/aobaba/BB_hong.jpg'
    ],
    region: 'Nam Bộ',
    era: 'Truyền thống phương Nam',
    suitableContexts: ['Tết', 'Lễ hội', 'Dạo phố'],
    suitableStyles: ['Nổi bật', 'Hiện đại'],
    keyFeatures: 'Sắc đỏ may mắn, cúc bấm tròn tinh gọn phía trước ngực.',
    culturalMeaning: 'May mắn, hân hoan trong các dịp lễ tết và hội hè miệt vườn.',
    material: 'Lụa tơ tằm mềm mại',
    verifiedSource: {
      name: 'Báo Cần Thơ',
      museum: 'Bảo tàng Cần Thơ',
      documentUrl: 'https://baocantho.com.vn',
      citation: 'Nghề may áo bà ba.'
    },
    genZStylingNote: 'Trang điểm tự nhiên, điểm xuyết son môi đỏ nhẹ.',
    culturalDoAndDont: {
      dos: ['Cài cúc đều đặn.'],
      donts: ['Tránh chất liệu quá chật.']
    },
    colorHex: '#C51E28'
  },
  'ao-ba-ba-xanh-com': {
    id: 'ao-ba-ba-xanh-com',
    name: 'Áo bà ba màu xanh cốm',
    type: 'Áo bà ba',
    category: 'main',
    imageUrl: '/images/dataset/aobaba/BB_xanhcom.jpg',
    galleryImages: [
      '/images/dataset/aobaba/BB_xanhcom.jpg',
      '/images/dataset/aobaba/BB_xanhlam.jpg'
    ],
    region: 'Nam Bộ',
    era: 'Truyền thống phương Nam',
    suitableContexts: ['Dạo phố', 'Tết', 'Du lịch'],
    suitableStyles: ['Tươi mới', 'Trẻ trung'],
    keyFeatures: 'Màu xanh cốm mạ non tươi tắn, thoáng mát cho khí hậu nhiệt đới.',
    culturalMeaning: 'Mùa màng tốt tươi, trù phú của đồng bằng sông nước.',
    material: 'Lụa tơ tằm dệt mát',
    verifiedSource: {
      name: 'Báo Cần Thơ',
      museum: 'Bảo tàng Cần Thơ',
      documentUrl: 'https://baocantho.com.vn',
      citation: 'Trang phục Nam Bộ xưa.'
    },
    genZStylingNote: 'Rất ăn ảnh khi chụp hình phong cảnh thiên nhiên.',
    culturalDoAndDont: {
      dos: ['Ủi nhẹ nhàng nhiệt độ vừa phải.'],
      donts: ['Không kéo xé tà áo.']
    },
    colorHex: '#047857'
  },

  // Áo giao lĩnh
  'ao-giao-linh-do': {
    id: 'ao-giao-linh-do',
    name: 'Áo giao lĩnh màu đỏ son',
    type: 'Áo giao lĩnh',
    category: 'main',
    imageUrl: '/images/dataset/aogiaolinh/agl_do.jpg',
    galleryImages: [
      '/images/dataset/aogiaolinh/agl_do.jpg',
      '/images/dataset/aogiaolinh/agl_hong.jpg',
      '/images/dataset/aogiaolinh/agl_tim.jpg'
    ],
    region: 'Cổ phục Việt Nam',
    era: 'Cổ phục thời Lý - Trần - Lê',
    suitableContexts: ['Cổ phục', 'Cưới hỏi', 'Tết', 'Lễ hội'],
    suitableStyles: ['Cổ điển', 'Hoàng gia', 'Trang trọng'],
    keyFeatures: 'Hai vạt cổ áo bắt chéo trước ngực, đai thắt lưng lụa buộc eo, tay áo rộng thướt tha.',
    culturalMeaning: 'Di sản cổ phục ngàn năm văn hiến, thể hiện sự mực thước và tinh hoa may mặc cổ truyền.',
    material: 'Lụa tơ tằm dệt sa truyền thống',
    verifiedSource: {
      name: 'VietnamPlus / TTXVN',
      museum: 'Bảo tàng Lịch sử Quốc gia',
      documentUrl: 'https://www.vietnamplus.vn',
      citation: 'Áo Giao Lĩnh: Ngược dòng lịch sử cùng tinh hoa cổ phục Việt.'
    },
    genZStylingNote: 'Tóc cài trâm bạc, phong thái cổ trang đài các.',
    culturalDoAndDont: {
      dos: ['Bắt chéo vạt phải sang trái đúng lề lối lễ phục.'],
      donts: ['Không kéo trễ cổ áo gây mất trang nghiêm.']
    },
    colorHex: '#B91C1C'
  },
  'ao-giao-linh-xanh-la': {
    id: 'ao-giao-linh-xanh-la',
    name: 'Áo giao lĩnh màu xanh lá',
    type: 'Áo giao lĩnh',
    category: 'main',
    imageUrl: '/images/dataset/aogiaolinh/agl_xanhla.jpg',
    galleryImages: [
      '/images/dataset/aogiaolinh/agl_xanhla.jpg',
      '/images/dataset/aogiaolinh/agl_xanhlam.jpg'
    ],
    region: 'Cổ phục Việt Nam',
    era: 'Cổ phục thời Lý - Trần - Lê',
    suitableContexts: ['Lễ hội', 'Chụp ảnh di sản', 'Tết'],
    suitableStyles: ['Cổ điển', 'Thanh tao'],
    keyFeatures: 'Sắc xanh lá cây cỏ tự nhiên, nẹp cổ viền gọn gàng.',
    culturalMeaning: 'Sự hòa hợp âm dương giữa con người và thiên nhiên.',
    material: 'Lụa tơ tằm sa',
    verifiedSource: {
      name: 'VietnamPlus / TTXVN',
      museum: 'Bảo tàng Lịch sử Quốc gia',
      documentUrl: 'https://www.vietnamplus.vn',
      citation: 'Cổ phục Việt qua các thời kỳ.'
    },
    genZStylingNote: 'Vạt áo bay bổng khi bước đi tạo hiệu ứng ảnh rất đẹp.',
    culturalDoAndDont: {
      dos: ['Thắt đai lụa ngay ngắn.'],
      donts: ['Tránh làm nhăn cổ áo giao chéo.']
    },
    colorHex: '#16A34A'
  },

  // Áo yếm
  'ao-yem-hong': {
    id: 'ao-yem-hong',
    name: 'Áo yếm màu hồng cánh sen',
    type: 'Áo yếm',
    category: 'main',
    imageUrl: '/images/dataset/aoyem/yem_hong.jpg',
    galleryImages: [
      '/images/dataset/aoyem/yem_hong.jpg',
      '/images/dataset/aoyem/yem_trang.jpg',
      '/images/dataset/aoyem/yem_vangtuoi.jpg'
    ],
    region: 'Dân gian Bắc Bộ',
    era: 'Truyền thống Kinh Bắc',
    suitableContexts: ['Lễ hội', 'Chụp ảnh sen', 'Dạo phố', 'Biểu diễn'],
    suitableStyles: ['Dân gian', 'Phá cách Y2K', 'Nàng thơ'],
    keyFeatures: 'Mảnh vải hình quả trám che ngực, dây buộc cổ và lưng, màu hồng đào thắm đượm tình ca quan họ.',
    culturalMeaning: 'Biểu tượng của nét đẹp mộc mạc, ý nhị và tình tứ của người phụ nữ nông thôn Bắc Bộ xưa.',
    material: 'Lụa đũi tơ tằm nhuộm tự nhiên',
    verifiedSource: {
      name: 'Báo Dân Việt & Bảo tàng Dân tộc học',
      museum: 'Bảo tàng Dân tộc học Việt Nam',
      documentUrl: 'https://danviet.vn',
      citation: 'Áo yếm: Di sản trang phục của Việt Nam.'
    },
    genZStylingNote: 'Gen Z phối yếm với áo blazer khoác ngoài tạo phong cách Modern Folkloric.',
    culturalDoAndDont: {
      dos: ['Dải yếm buộc chắc chắn, kín đáo.'],
      donts: ['Tránh hở lưng quá đà ở những chốn tôn nghiêm.']
    },
    colorHex: '#DB2777'
  },
  'ao-yem-trang': {
    id: 'ao-yem-trang',
    name: 'Áo yếm màu trắng đầm sen',
    type: 'Áo yếm',
    category: 'main',
    imageUrl: '/images/dataset/aoyem/yem_trang.jpg',
    galleryImages: [
      '/images/dataset/aoyem/yem_trang.jpg',
      '/images/dataset/aoyem/yem_vangbe.jpg'
    ],
    region: 'Dân gian Bắc Bộ',
    era: 'Truyền thống',
    suitableContexts: ['Chụp ảnh sen', 'Lễ hội', 'Dạo phố'],
    suitableStyles: ['Thanh thuần', 'Tối giản'],
    keyFeatures: 'Lụa bạch ngà mộc mạc, đường viền may tỉ mỉ.',
    culturalMeaning: 'Nét đẹp thuần khiết, trong sáng như hoa sen.',
    material: 'Đũi lụa tự nhiên',
    verifiedSource: {
      name: 'Báo Dân Việt',
      museum: 'Bảo tàng Dân tộc học Việt Nam',
      documentUrl: 'https://danviet.vn',
      citation: 'Di sản trang phục Áo yếm.'
    },
    genZStylingNote: 'Tóc cài búp sen hoặc kẹp ngọc trai thanh lịch.',
    culturalDoAndDont: {
      dos: ['Chọn chất liệu vải dày dặn vừa phải.'],
      donts: ['Tránh vải quá mỏng lộ nội y.']
    },
    colorHex: '#F8FAFC'
  }
};

// All Outfit Sets contain ONLY the matching suggested garment - NO PANTS, NO CLOGS/FOOTWEAR!
export const OUTFIT_SETS: OutfitSet[] = [
  // 1. Áo dài đỏ
  {
    id: 'set-aodai-do',
    title: 'Gợi ý: Áo dài đỏ may mắn',
    subtitle: 'Thanh lịch · Hiện đại · Đậm chất Tết',
    description: 'Áo dài đỏ gấm tơ tằm thướt tha từ bộ sưu tập VietFashion Dataset, mang đến vẻ đẹp rạng rỡ, may mắn mà vẫn bắt kịp xu hướng thời trang Gen Z.',
    categoryName: 'Áo dài',
    context: 'Tết',
    style: 'Hiện đại',
    primaryColor: 'Đỏ',
    colorHex: '#C51E28',
    modelImage: '/images/dataset/aodai/ad_do.jpg',
    model3DConfig: {
      baseColor: '#C51E28',
      secondaryColor: '#FFFFFF',
      trimColor: '#B91C1C',
      fabricGloss: 0.65,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 3.0
    },
    items: [VIET_FASHION_ITEMS['ao-dai-do-gam']],
    colorHarmony: {
      score: 98,
      palette: ['#C51E28', '#991B1B', '#7F1D1D'],
      element: 'Hỏa sinh Thổ (Tương sinh may mắn)',
      explanation: 'Sắc đỏ rực rỡ của áo dài tạo hiệu ứng thị giác sang trọng, thanh tao, đậm phong vị Tết.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Dữ liệu xác thực từ PostgreSQL VietFashion & Bảo tàng Phụ nữ Việt Nam.'
    },
    genZTips: [
      'Chọn kiểu tóc búi lơi kèm kẹp càng cua hoặc tóc xoăn sóng nhẹ nhàng.',
      'Đứng nghiêng 45 độ, một tay cầm nhẹ tà áo để tôn phom dáng.'
    ]
  },

  // 2. Áo dài vàng
  {
    id: 'set-aodai-vang',
    title: 'Gợi ý: Áo dài vàng hoàng yến',
    subtitle: 'Rạng ngời · Vinh hoa · Đón xuân tài lộc',
    description: 'Áo dài lụa màu vàng hoàng yến từ dataset thực tế, mang đến năng lượng ấm no, hanh thông cho cả năm.',
    categoryName: 'Áo dài',
    context: 'Tết',
    style: 'Thanh lịch',
    primaryColor: 'Vàng',
    colorHex: '#CA8A04',
    modelImage: '/images/dataset/aodai/ad_vang.jpg',
    model3DConfig: {
      baseColor: '#CA8A04',
      secondaryColor: '#FFFFFF',
      trimColor: '#A16207',
      fabricGloss: 0.8,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 3.0
    },
    items: [VIET_FASHION_ITEMS['ao-dai-vang-hoang-yen']],
    colorHarmony: {
      score: 99,
      palette: ['#CA8A04', '#EAB308', '#FEF08A'],
      element: 'Thổ sinh Kim (Tài lộc vẹn toàn)',
      explanation: 'Sắc vàng tươi tắn như đóa hoa mai hé nở đón nắng xuân.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Xác thực từ bộ sưu tập Áo dài Việt Nam - Bảo tàng Phụ nữ Nam Bộ.'
    },
    genZTips: [
      'Chụp ảnh cùng hoa lay ơn hoặc cành mai vàng rực rỡ.',
      'Sơn móng tay màu thạch nude nhẹ nhàng để giữ vẻ trang nhã.'
    ]
  },

  // 3. Áo dài cam
  {
    id: 'set-aodai-cam',
    title: 'Gợi ý: Áo dài màu cam hoàng hôn',
    subtitle: 'Tươi tắn · Trẻ trung · Hiện đại Gen Z',
    description: 'Áo dài lụa tơ tằm tông cam ấm áp, tôn làn da sáng và phong thái năng động, tự tin của người phụ nữ hiện đại.',
    categoryName: 'Áo dài',
    context: 'Dạo phố',
    style: 'Hiện đại',
    primaryColor: 'Cam',
    colorHex: '#EA580C',
    modelImage: '/images/dataset/aodai/ad_cam.jpg',
    model3DConfig: {
      baseColor: '#EA580C',
      secondaryColor: '#FFFFFF',
      trimColor: '#C2410C',
      fabricGloss: 0.6,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 3.0
    },
    items: [VIET_FASHION_ITEMS['ao-dai-cam-hoang-hon']],
    colorHarmony: {
      score: 95,
      palette: ['#EA580C', '#FB923C', '#FED7AA'],
      element: 'Hỏa vượng sáng ngời',
      explanation: 'Sắc cam hoàng hôn ấm áp tôn vẻ đẹp trẻ trung.'
    },
    culturalBadge: {
      verified: true,
      rating: 97,
      summary: 'Xác thực bởi Viện Nghiên cứu Thời trang & Bảo tàng Phụ nữ.'
    },
    genZTips: ['Makeup tone cam đào nhẹ nhàng chuẩn vibe Hàn Quốc.']
  },

  // 4. Áo dài hồng
  {
    id: 'set-aodai-hong',
    title: 'Gợi ý: Áo dài hồng cánh sen dịu dàng',
    subtitle: 'Nàng thơ · Ngọt ngào · Kỷ yếu học đường',
    description: 'Áo dài lụa hai tà thướt tha tông hồng pastel ngọt ngào, gợi mở vẻ đẹp thanh xuân và tình yêu đôi lứa trong sáng.',
    categoryName: 'Áo dài',
    context: 'Đi học',
    style: 'Thanh lịch',
    primaryColor: 'Hồng',
    colorHex: '#DB2777',
    modelImage: '/images/dataset/aodai/ad_hong.jpg',
    model3DConfig: {
      baseColor: '#DB2777',
      secondaryColor: '#FFFFFF',
      trimColor: '#BE185D',
      fabricGloss: 0.5,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 2.8
    },
    items: [VIET_FASHION_ITEMS['ao-dai-hong-canh-sen']],
    colorHarmony: {
      score: 96,
      palette: ['#DB2777', '#F472B6', '#FCE7F3'],
      element: 'Âm dương hòa hợp',
      explanation: 'Sắc hồng cánh sen e ấp dịu ngọt.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Quy chuẩn Áo dài nữ sinh theo truyền thống văn hóa.'
    },
    genZTips: ['Kẹp nơ tóc trắng hoặc băng đô mảnh xinh xắn.']
  },

  // 5. Áo dài tím
  {
    id: 'set-aodai-tim',
    title: 'Gợi ý: Áo dài tím mộng mơ',
    subtitle: 'Đoan trang · Thâm trầm · Đậm chất Cố đô',
    description: 'Áo dài lụa màu tím Huế mộng mơ, tôn vinh vẻ đẹp kín đáo và chiều sâu tâm hồn của người con gái Việt.',
    categoryName: 'Áo dài',
    context: 'Lễ hội',
    style: 'Cổ điển',
    primaryColor: 'Tím',
    colorHex: '#7E22CE',
    modelImage: '/images/dataset/aodai/ad_tim.jpg',
    model3DConfig: {
      baseColor: '#7E22CE',
      secondaryColor: '#FFFFFF',
      trimColor: '#6B21A8',
      fabricGloss: 0.6,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 3.0
    },
    items: [VIET_FASHION_ITEMS['ao-dai-tim-hue']],
    colorHarmony: {
      score: 97,
      palette: ['#7E22CE', '#A855F7', '#F3E8FF'],
      element: 'Thủy sinh Mộc trầm mặc',
      explanation: 'Sắc tím đại diện cho lòng chung thủy và vẻ đẹp đài các.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Xác thực từ tư liệu Bảo tàng Phụ nữ Nam Bộ.'
    },
    genZTips: ['Phối cùng nón bài thơ hoặc chuỗi ngọc thanh mảnh.']
  },

  // 6. Áo dài xanh lam
  {
    id: 'set-aodai-xanhlam',
    title: 'Gợi ý: Áo dài xanh lam ngọc thanh khiết',
    subtitle: 'Thanh khiết · Dịu mát · Khởi sắc đầu xuân',
    description: 'Áo dài lụa màu xanh lam ngọc dịu mát, phom dáng thon dài tôn vòng eo và nét đẹp nhẹ nhàng thuần khiết.',
    categoryName: 'Áo dài',
    context: 'Dạo phố',
    style: 'Hiện đại',
    primaryColor: 'Xanh lam',
    colorHex: '#0D9488',
    modelImage: '/images/dataset/aodai/ad_xanhlam.jpg',
    model3DConfig: {
      baseColor: '#0D9488',
      secondaryColor: '#FFFFFF',
      trimColor: '#0F766E',
      fabricGloss: 0.5,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 2.8
    },
    items: [VIET_FASHION_ITEMS['ao-dai-xanh-lam-ngoc']],
    colorHarmony: {
      score: 96,
      palette: ['#0D9488', '#14B8A6', '#CCFBF1'],
      element: 'Thủy sinh Mộc ôn hòa',
      explanation: 'Màu xanh ngọc mang lại sự bình an, mát lành.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Xác thực từ tài liệu Vietnam Tourism.'
    },
    genZTips: ['Túi xách nhỏ màu kem tạo điểm nhấn hài hòa.']
  },

  // 7. Áo dài xanh lục
  {
    id: 'set-aodai-xanhluc',
    title: 'Gợi ý: Áo dài xanh lục bảo quyền quý',
    subtitle: 'Quyền quý · Sang trọng · Đậm sắc Hoàng gia',
    description: 'Áo dài gấm xanh lục bảo sang trọng, biểu tượng của sự trường tồn và sinh sôi nảy nở của cây cỏ mùa xuân.',
    categoryName: 'Áo dài',
    context: 'Dạ tiệc',
    style: 'Cổ điển',
    primaryColor: 'Xanh cốm',
    colorHex: '#047857',
    modelImage: '/images/dataset/aodai/ad_xanhluc.jpg',
    model3DConfig: {
      baseColor: '#047857',
      secondaryColor: '#FFFFFF',
      trimColor: '#065F46',
      fabricGloss: 0.75,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 3.2
    },
    items: [VIET_FASHION_ITEMS['ao-dai-xanh-luc-bao']],
    colorHarmony: {
      score: 98,
      palette: ['#047857', '#10B981', '#D1FAE5'],
      element: 'Mộc vượng sinh sôi',
      explanation: 'Sắc xanh lục bảo thẫm tôn vẻ quyền quý đỉnh cao.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Khảo cứu theo tư liệu Bảo tàng Cổ vật Cung đình Huế.'
    },
    genZTips: ['Trang sức ánh vàng gold kết hợp cực kỳ sang trọng.']
  },

  // 8. Áo bà ba cam
  {
    id: 'set-aobaba-cam',
    title: 'Gợi ý: Áo bà ba màu cam tươi sáng',
    subtitle: 'Mộc mạc · Năng động · Đậm đà sông nước',
    description: 'Chiếc áo bà ba màu cam tươi sáng từ bộ sưu tập thực tế, tôn lên nét đẹp rạng ngời, tự nhiên của người phụ nữ phương Nam.',
    categoryName: 'Áo bà ba',
    context: 'Dạo phố',
    style: 'Hiện đại',
    primaryColor: 'Cam',
    colorHex: '#EA580C',
    modelImage: '/images/dataset/aobaba/BB_cam.jpg',
    model3DConfig: {
      baseColor: '#EA580C',
      secondaryColor: '#FFFFFF',
      trimColor: '#C2410C',
      fabricGloss: 0.5,
      silhouette: 'aodai',
      sleeveWidth: 'medium',
      collarHeight: 0
    },
    items: [VIET_FASHION_ITEMS['ao-ba-ba-cam']],
    colorHarmony: {
      score: 96,
      palette: ['#EA580C', '#FB923C', '#FED7AA'],
      element: 'Hỏa sinh Thổ ấm áp',
      explanation: 'Sắc cam năng lượng tạo cảm giác dễ mến, gần gũi.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Xác thực theo tư liệu Báo Cần Thơ về Nghề may áo bà ba truyền thống.'
    },
    genZTips: ['Tết tóc lệch một bên hoặc xõa tóc tự nhiên.']
  },

  // 9. Áo bà ba đỏ
  {
    id: 'set-aobaba-do',
    title: 'Gợi ý: Áo bà ba màu đỏ may mắn',
    subtitle: 'Hân hoan · Rực rỡ · Hội xuân miệt vườn',
    description: 'Áo bà ba đỏ lụa mềm mại, cổ tròn xẻ ngực cài cúc tinh gọn, mang lại vượng khí và niềm vui cho các dịp hội hè.',
    categoryName: 'Áo bà ba',
    context: 'Tết',
    style: 'Hiện đại',
    primaryColor: 'Đỏ',
    colorHex: '#C51E28',
    modelImage: '/images/dataset/aobaba/BB_do.jpg',
    model3DConfig: {
      baseColor: '#C51E28',
      secondaryColor: '#FFFFFF',
      trimColor: '#991B1B',
      fabricGloss: 0.55,
      silhouette: 'aodai',
      sleeveWidth: 'medium',
      collarHeight: 0
    },
    items: [VIET_FASHION_ITEMS['ao-ba-ba-do']],
    colorHarmony: {
      score: 97,
      palette: ['#C51E28', '#EF4444', '#FEE2E2'],
      element: 'Hỏa vượng hanh thông',
      explanation: 'Màu đỏ may mắn đặc trưng cho hội xuân miệt vườn phương Nam.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Tư liệu Báo Cần Thơ về Trang phục người Việt Nam Bộ.'
    },
    genZTips: ['Đeo vòng tay bạc sợi mảnh tạo điểm nhấn tinh tế.']
  },

  // 10. Áo bà ba xanh cốm
  {
    id: 'set-aobaba-xanhcom',
    title: 'Gợi ý: Áo bà ba màu xanh cốm',
    subtitle: 'Tươi mát · Trẻ trung · Trù phú bờ kênh',
    description: 'Áo bà ba lụa màu xanh cốm non tươi tắn, biểu tượng cho sức sống thiên nhiên cây cỏ và mùa màng trù phú miền Tây.',
    categoryName: 'Áo bà ba',
    context: 'Dạo phố',
    style: 'Tối giản',
    primaryColor: 'Xanh cốm',
    colorHex: '#047857',
    modelImage: '/images/dataset/aobaba/BB_xanhcom.jpg',
    model3DConfig: {
      baseColor: '#047857',
      secondaryColor: '#FFFFFF',
      trimColor: '#065F46',
      fabricGloss: 0.5,
      silhouette: 'aodai',
      sleeveWidth: 'medium',
      collarHeight: 0
    },
    items: [VIET_FASHION_ITEMS['ao-ba-ba-xanh-com']],
    colorHarmony: {
      score: 95,
      palette: ['#047857', '#10B981', '#ECFDF5'],
      element: 'Mộc sinh Hỏa tươi mới',
      explanation: 'Sắc xanh non dịu mắt mang đến cảm giác thanh thản.'
    },
    culturalBadge: {
      verified: true,
      rating: 97,
      summary: 'Khảo sát thực tế trang phục dân dã Nam Bộ.'
    },
    genZTips: ['Kẹp tóc hoa sứ hoặc nón lá nhỏ xinh.']
  },

  // 11. Áo ngũ thân lam ngọc
  {
    id: 'set-nguthan-lamngoc',
    title: 'Gợi ý: Áo ngũ thân tay chẽn lam ngọc',
    subtitle: 'Nho nhã · Phóng khoáng · Tinh thần Cố đô',
    description: 'Thiết kế ngũ thân tay chẽn màu lam ngọc tươi trẻ từ dataset, giữ nguyên cấu trúc 5 thân và 5 cúc cài chuẩn quy chế triều Nguyễn.',
    categoryName: 'Áo ngũ thân tay chẽn',
    context: 'Dạo phố',
    style: 'Tối giản',
    primaryColor: 'Xanh lam',
    colorHex: '#0D9488',
    modelImage: '/images/dataset/aonguthan_taychen/ant_xanhlam.jpg',
    model3DConfig: {
      baseColor: '#0D9488',
      secondaryColor: '#F8FAFC',
      trimColor: '#115E59',
      fabricGloss: 0.45,
      silhouette: 'nguthan',
      sleeveWidth: 'medium',
      collarHeight: 3.5
    },
    items: [VIET_FASHION_ITEMS['ao-ngu-than-lam-ngoc']],
    colorHarmony: {
      score: 95,
      palette: ['#0D9488', '#14B8A6', '#CCFBF1'],
      element: 'Thủy sinh Mộc thư thái',
      explanation: 'Sắc xanh lam ngọc tạo cảm giác bình an, thanh thoát.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Xác thực bởi Trung tâm Bảo tồn Di tích Cố đô Huế.'
    },
    genZTips: ['Mix cùng kính gọng tròn mắt mảnh tạo phong cách tri thức tân tiến.']
  },

  // 12. Áo ngũ thân đỏ
  {
    id: 'set-nguthan-do',
    title: 'Gợi ý: Áo ngũ thân tay chẽn đỏ đại lễ',
    subtitle: 'Trang nghiêm · Uy nghi · Chuẩn mực Ngũ thường',
    description: 'Áo ngũ thân tay chẽn gấm đỏ rực rỡ, may ghép 5 thân tinh tế tượng trưng cho tình mẫu tử và đạo làm người mực thước.',
    categoryName: 'Áo ngũ thân tay chẽn',
    context: 'Tết',
    style: 'Cổ điển',
    primaryColor: 'Đỏ',
    colorHex: '#C51E28',
    modelImage: '/images/dataset/aonguthan_taychen/ant_do.jpg',
    model3DConfig: {
      baseColor: '#C51E28',
      secondaryColor: '#FFFFFF',
      trimColor: '#991B1B',
      fabricGloss: 0.65,
      silhouette: 'nguthan',
      sleeveWidth: 'medium',
      collarHeight: 3.5
    },
    items: [VIET_FASHION_ITEMS['ao-ngu-than-do']],
    colorHarmony: {
      score: 98,
      palette: ['#C51E28', '#DC2626', '#FEE2E2'],
      element: 'Hỏa vượng vinh hiển',
      explanation: 'Sắc đỏ hoàng gia sang trọng và tôn nghiêm.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Khảo cứu theo quy chế trang phục triều Nguyễn.'
    },
    genZTips: ['Đội khăn đóng bọc gấm đỏ hoặc đen chuẩn phong thái.']
  },

  // 13. Áo ngũ thân màu be
  {
    id: 'set-nguthan-be',
    title: 'Gợi ý: Áo ngũ thân tay chẽn màu be thanh nhã',
    subtitle: 'Tinh tế · Nho nhã · Phong cách Cận đại',
    description: 'Áo ngũ thân tay chẽn màu be tối giản, phom suông thanh lịch, giữ trọn nét kín đáo và vẻ đẹp học giả tri thức xưa.',
    categoryName: 'Áo ngũ thân tay chẽn',
    context: 'Dạo phố',
    style: 'Tối giản',
    primaryColor: 'Be',
    colorHex: '#D6D3D1',
    modelImage: '/images/dataset/aonguthan_taychen/ant_be.jpg',
    model3DConfig: {
      baseColor: '#D6D3D1',
      secondaryColor: '#FFFFFF',
      trimColor: '#A8A29E',
      fabricGloss: 0.4,
      silhouette: 'nguthan',
      sleeveWidth: 'medium',
      collarHeight: 3.2
    },
    items: [VIET_FASHION_ITEMS['ao-ngu-than-be']],
    colorHarmony: {
      score: 96,
      palette: ['#D6D3D1', '#E7E5E4', '#F5F5F4'],
      element: 'Thổ sinh Kim thuần khiết',
      explanation: 'Tông màu be trung tính đem lại cảm giác nhã nhặn, trường tồn với thời gian.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Tư liệu Sở VHTT Cố đô Huế về Áo dài Việt Nam.'
    },
    genZTips: ['Cài đủ 5 cúc cài đúng lề lối quy củ.']
  },

  // 14. Áo giao lĩnh đỏ
  {
    id: 'set-aogiaolinh-do',
    title: 'Gợi ý: Áo giao lĩnh nữ đỏ son cổ phong',
    subtitle: 'Uy nghi · Cổ kính · Cội nguồn Ngàn năm',
    description: 'Áo giao lĩnh đỏ son cổ truyền với vạt đan chéo trang nhã, phục dựng tinh thần phục sức thời Lý - Trần - Lê cho các sự kiện cưới hỏi cổ phục và lễ hội.',
    categoryName: 'Áo giao lĩnh',
    context: 'Cưới hỏi',
    style: 'Cổ điển',
    primaryColor: 'Đỏ',
    colorHex: '#B91C1C',
    modelImage: '/images/dataset/aogiaolinh/agl_do.jpg',
    model3DConfig: {
      baseColor: '#B91C1C',
      secondaryColor: '#FFFFFF',
      trimColor: '#7F1D1D',
      fabricGloss: 0.7,
      silhouette: 'aotac',
      sleeveWidth: 'wide',
      collarHeight: 2.0
    },
    items: [VIET_FASHION_ITEMS['ao-giao-linh-do']],
    colorHarmony: {
      score: 97,
      palette: ['#B91C1C', '#DC2626', '#FEF2F2'],
      element: 'Hỏa vượng chính khí',
      explanation: 'Tông đỏ trầm cổ phong mang lại thần thái trang nghiêm, uyển chuyển.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Khảo cứu theo tư liệu VietnamPlus / TTXVN về Cổ phục Áo Giao Lĩnh.'
    },
    genZTips: ['Giữ vạt cổ áo bắt chéo ngay ngắn bên phải.']
  },

  // 15. Áo giao lĩnh xanh lá
  {
    id: 'set-aogiaolinh-xanhla',
    title: 'Gợi ý: Áo giao lĩnh màu xanh lá',
    subtitle: 'Thanh cao · Mát lành · Hài hòa Trời đất',
    description: 'Áo giao lĩnh xanh lá tươi sáng, biểu hiện sự hòa hợp âm dương và phong thái thanh cao của mỹ nhân xưa.',
    categoryName: 'Áo giao lĩnh',
    context: 'Lễ hội',
    style: 'Cổ điển',
    primaryColor: 'Xanh cốm',
    colorHex: '#16A34A',
    modelImage: '/images/dataset/aogiaolinh/agl_xanhla.jpg',
    model3DConfig: {
      baseColor: '#16A34A',
      secondaryColor: '#FFFFFF',
      trimColor: '#15803D',
      fabricGloss: 0.6,
      silhouette: 'aotac',
      sleeveWidth: 'wide',
      collarHeight: 2.0
    },
    items: [VIET_FASHION_ITEMS['ao-giao-linh-xanh-la']],
    colorHarmony: {
      score: 96,
      palette: ['#16A34A', '#22C55E', '#DCFCE7'],
      element: 'Mộc sinh Hỏa thịnh vượng',
      explanation: 'Màu xanh lá cỏ hoa mang lại sự mát dịu và thanh tĩnh.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Xác thực từ tư liệu Bảo tàng Lịch sử Quốc gia.'
    },
    genZTips: ['Trâm bạc cài tóc tạo điểm nhấn cổ phong thu hút.']
  },

  // 16. Áo yếm hồng
  {
    id: 'set-aoyem-hong',
    title: 'Gợi ý: Áo yếm hồng cánh sen Kinh Bắc',
    subtitle: 'Nồng nàn · Duyên dáng · Đậm hồn Dân gian',
    description: 'Áo yếm lụa đào hồng cánh sen từ dataset thực tế, mang hơi thở dân ca quan họ Kinh Bắc, tôn vinh bờ vai thon và nét duyên kín đáo của người thiếu nữ.',
    categoryName: 'Áo yếm',
    context: 'Lễ hội',
    style: 'Phá cách Y2K',
    primaryColor: 'Hồng',
    colorHex: '#DB2777',
    modelImage: '/images/dataset/aoyem/yem_hong.jpg',
    model3DConfig: {
      baseColor: '#DB2777',
      secondaryColor: '#FFFFFF',
      trimColor: '#9D174D',
      fabricGloss: 0.4,
      silhouette: 'tuthan',
      sleeveWidth: 'fitted',
      collarHeight: 0
    },
    items: [VIET_FASHION_ITEMS['ao-yem-hong']],
    colorHarmony: {
      score: 95,
      palette: ['#DB2777', '#F472B6', '#FDF2F8'],
      element: 'Âm dương hòa hợp',
      explanation: 'Sắc hồng cánh sen e ấp tôn vinh vẻ đẹp tự nhiên, trong trẻo.'
    },
    culturalBadge: {
      verified: true,
      rating: 96,
      summary: 'Khảo cứu tư liệu Báo Dân Việt & Bảo tàng Dân tộc học về Di sản Áo yếm.'
    },
    genZTips: ['Khoác thêm blazer hoặc áo khoác voan mỏng khi ra phố để tạo phong cách Y2K hiện đại.']
  },

  // 17. Áo yếm trắng
  {
    id: 'set-aoyem-trang',
    title: 'Gợi ý: Áo yếm trắng tinh khôi đầm sen',
    subtitle: 'Thanh khiết · Mộc mạc · Nét đẹp Thôn quê',
    description: 'Áo yếm lụa trắng ngà thuần khiết, gợi nhớ hình ảnh đóa sen ngát hương mùa hạ hồ Tây.',
    categoryName: 'Áo yếm',
    context: 'Dạo phố',
    style: 'Tối giản',
    primaryColor: 'Trắng',
    colorHex: '#F8FAFC',
    modelImage: '/images/dataset/aoyem/yem_trang.jpg',
    model3DConfig: {
      baseColor: '#F8FAFC',
      secondaryColor: '#E2E8F0',
      trimColor: '#CBD5E1',
      fabricGloss: 0.45,
      silhouette: 'tuthan',
      sleeveWidth: 'fitted',
      collarHeight: 0
    },
    items: [VIET_FASHION_ITEMS['ao-yem-trang']],
    colorHarmony: {
      score: 97,
      palette: ['#F8FAFC', '#E2E8F0', '#CBD5E1'],
      element: 'Kim tinh thuần khiết',
      explanation: 'Màu trắng ngà tạo cảm giác thanh tân, mộc mạc và chân phương.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Bảo tàng Dân tộc học Việt Nam - Bộ sưu tập yếm lụa cổ truyền.'
    },
    genZTips: ['Trang điểm trong trẻo, thoa son bóng nhẹ nhàng.']
  }
];

export const CONTEXT_OPTIONS = [
  { value: 'Tết', label: 'Tết Nguyên Đán & Du xuân', icon: 'Sun' },
  { value: 'Lễ hội', label: 'Lễ hội truyền thống & Festival', icon: 'Flame' },
  { value: 'Cưới hỏi', label: 'Cưới hỏi & Đính hôn', icon: 'Heart' },
  { value: 'Đi học', label: 'Đi học & Kỷ yếu tốt nghiệp', icon: 'BookOpen' },
  { value: 'Dạo phố', label: 'Dạo phố, Cafe & Check-in', icon: 'Compass' },
  { value: 'Dạ tiệc', label: 'Dạ tiệc & Sự kiện trang trọng', icon: 'Sparkles' }
];

export const STYLE_OPTIONS = [
  { value: 'Hiện đại', label: 'Hiện đại Gen Z (Chic & Trendy)', desc: 'Kết hợp phom truyền thống với phong thái thời thượng' },
  { value: 'Tối giản', label: 'Tối giản (Minimalist Elegance)', desc: 'Đường nét tinh gọn, màu đơn sắc, chất liệu tự nhiên' },
  { value: 'Cổ điển', label: 'Cổ điển Hoàng gia (Vintage Heritage)', desc: 'Phục dựng lề lối cung đình thời Nguyễn, Kinh Bắc' },
  { value: 'Thanh lịch', label: 'Thanh lịch quý phái (Chic & Grace)', desc: 'Tôn vinh sự đoan trang, chất liệu lụa gấm cao cấp' },
  { value: 'Phá cách Y2K', label: 'Phá cách Y2K (Edgy Heritage Fusion)', desc: 'Phong cách năng động, sáng tạo và cá tính' }
];

export const COLOR_OPTIONS = [
  { value: 'Đỏ', label: 'Đỏ May Mắn (Tết & Hỷ sự)', hex: '#C51E28', meaning: 'Thịnh vượng, hoan hỷ, xua tan điều dữ' },
  { value: 'Vàng', label: 'Vàng Hoàng Gia (Thịnh vượng)', hex: '#CA8A04', meaning: 'Vương giả, sang trọng, ấm no sung túc' },
  { value: 'Xanh lam', label: 'Xanh Lam Ngọc (Thanh khiết)', hex: '#0D9488', meaning: 'Bình an, trí tuệ và sự tự do thanh thoát' },
  { value: 'Xanh cốm', label: 'Xanh Cốm Lục Bảo (Tươi mới)', hex: '#047857', meaning: 'Sức sống căng tràn, mùa màng tươi tốt' },
  { value: 'Trắng', label: 'Trắng Tinh Khôi (Thanh thuần)', hex: '#F8FAFC', meaning: 'Trong sáng, giản dị, sự khởi đầu mới' },
  { value: 'Hồng', label: 'Hồng Đào Pastel (Ngọt ngào)', hex: '#DB2777', meaning: 'Tình yêu đôi lứa, nét duyên thẹn thùng' },
  { value: 'Đen', label: 'Đen Nhung Huyền Bí (Cá tính)', hex: '#18181B', meaning: 'Bí ẩn, chiều sâu và sự phá cách quyền lực' }
];

export const CULTURAL_GUIDELINES = [
  {
    title: 'Quy chuẩn phom dáng tà áo',
    rule: 'Tôn trọng độ dài tà áo chuẩn mực',
    detail: 'Áo dài và cổ phục nguyên bản có độ dài tà chấm gót hoặc qua mắt cá chân. Tránh cắt tà quá ngắn hoặc xẻ eo quá cao làm mất phom dáng đoan trang.',
    severity: 'critical'
  },
  {
    title: 'Quy chuẩn nút cài áo ngũ thân',
    rule: 'Ngũ thân tượng trưng ngũ thường',
    detail: '5 cúc cài áo ngũ thân đại diện cho Nhân - Lễ - Nghĩa - Trí - Tín. Khi tham gia nghi lễ hoặc chụp ảnh văn hóa, cần cài đủ 5 nút cúc, không cởi phanh cúc ngực tùy tiện.',
    severity: 'important'
  },
  {
    title: 'Chọn chất liệu và độ xuyên thấu',
    rule: 'Tôn trọng tính kín đáo truyền thống',
    detail: 'Nếu chọn áo may bằng chất liệu tơ tằm mỏng, vải voan hoặc sa, phải có lớp lót bên trong cùng tông màu kín đáo, không lộ nội y tương phản.',
    severity: 'important'
  },
  {
    title: 'Phối phong cách Gen Z',
    rule: 'Hiện đại hóa có chừng mực',
    detail: 'Gen Z hoàn toàn có thể kết hợp áo truyền thống với kiểu tóc thời thượng, túi xách mini, kính mắt mèo hoặc trang sức ngọc trai, miễn là tổng thể giữ được sự hài hòa và đoan trang.',
    severity: 'good_practice'
  }
];

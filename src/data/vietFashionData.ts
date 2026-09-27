export interface GarmentItem {
  id: string;
  name: string;
  type: string; // 'Áo dài' | 'Áo ngũ thân' | 'Áo tấc' | 'Áo tứ thân' | 'Nhật bình' | 'Phụ kiện' | 'Giày' | 'Quần'
  category: 'main' | 'pants' | 'accessory' | 'footwear' | 'headwear';
  imageUrl: string;
  galleryImages: string[];
  region: string; // 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | 'Toàn quốc'
  era: string; // 'Thế kỷ 18-19' | 'Thời Nguyễn' | 'Tân thời (1930s-nay)' | 'Cổ truyền Kinh Bắc'
  suitableContexts: string[];
  suitableStyles: string[];
  keyFeatures: string;
  culturalMeaning: string;
  material: string;
  verifiedSource: {
    name: string;
    documentUrl: string;
    citation: string;
    museum: string;
  };
  genZStylingNote: string;
  culturalDoAndDont: {
    dos: string[];
    donts: string[];
  };
  colorHex: string;
}

export interface OutfitSet {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  context: string; // 'Tết' | 'Cưới hỏi' | 'Dạo phố' | 'Đi học' | 'Lễ hội' | 'Dạ tiệc'
  style: string; // 'Hiện đại' | 'Tối giản' | 'Cổ điển' | 'Thanh lịch' | 'Phá cách Y2K'
  primaryColor: string; // 'Đỏ' | 'Vàng' | 'Xanh lam' | 'Trắng' | 'Hồng' | 'Xanh cốm' | 'Đen'
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
  colorHarmony: {
    score: number;
    palette: string[];
    element: string; // 'Hỏa - Thổ' | 'Mộc - Thủy' | 'Kim - Thủy' | etc.
    explanation: string;
  };
  culturalBadge: {
    verified: boolean;
    rating: number; // e.g. 98/100
    summary: string;
  };
  genZTips: string[];
}

export const VIET_FASHION_ITEMS: Record<string, GarmentItem> = {
  'ao-dai-do-gam': {
    id: 'ao-dai-do-gam',
    name: 'Áo dài đỏ gấm tơ tằm',
    type: 'Áo dài',
    category: 'main',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Miền Bắc & Toàn quốc',
    era: 'Tân thời (từ thập niên 1930 phát triển từ ngũ thân)',
    suitableContexts: ['Tết', 'Lễ hội', 'Cưới hỏi', 'Chụp ảnh xuân'],
    suitableStyles: ['Hiện đại', 'Thanh lịch', 'Cổ điển'],
    keyFeatures: 'Dáng áo thon dài chấm gót, xẻ tà hai bên eo cao, cổ dựng 3cm viền tinh tế, chất liệu gấm dệt họa tiết hoa sen chìm.',
    culturalMeaning: 'Màu đỏ tượng trưng cho may mắn, thịnh vượng, xua tan điều xui xẻo trong dịp đầu năm mới. Áo dài đại diện cho sự kín đáo, đoan trang và nét duyên thuần khiết của người phụ nữ Việt.',
    material: 'Gấm tơ tằm Vạn Phúc dệt thủ công',
    verifiedSource: {
      name: 'Hồ sơ di sản Áo dài truyền thống',
      museum: 'Bảo tàng Phụ nữ Việt Nam (Hà Nội)',
      documentUrl: 'https://baotangphunu.org.vn',
      citation: 'Tài liệu trưng bày "Áo dài qua các thời kỳ lịch sử", NXB Văn hóa Dân tộc 2021.'
    },
    genZStylingNote: 'Gen Z có thể kết hợp cùng tóc búi thấp kẹp càng cua kim loại, son đỏ đất và túi kẹp nách mini phong cách tối giản.',
    culturalDoAndDont: {
      dos: [
        'Mặc kèm quần lụa ống rộng dài qua mắt cá chân.',
        'Chọn nội y cùng tông màu da, không lộ viền để giữ nét trang nhã.',
        'Giữ lưng thẳng, bước đi nhẹ nhàng khi diện áo dài.'
      ],
      donts: [
        'Tuyệt đối không phối áo dài xẻ tà với quần sooc ngắn hoặc chân váy ngắn bên trong.',
        'Tránh chất liệu quá mỏng xuyên thấu thiếu lớp lót nhã nhặn.',
        'Không cắt xẻ tà áo quá cao trên eo làm mất phom dáng truyền thống.'
      ]
    },
    colorHex: '#C51E28'
  },
  'quan-lua-trang': {
    id: 'quan-lua-trang',
    name: 'Quần lụa trắng ống suông',
    type: 'Quần truyền thống',
    category: 'pants',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Toàn quốc',
    era: 'Thế kỷ 20',
    suitableContexts: ['Tết', 'Đi học', 'Cưới hỏi', 'Dạo phố'],
    suitableStyles: ['Hiện đại', 'Tối giản', 'Thanh lịch'],
    keyFeatures: 'Ống suông rộng mềm mại, chất liệu lụa satin rủ tự nhiên, cạp ôm khéo tôn vòng eo.',
    culturalMeaning: 'Màu trắng tượng trưng cho sự thuần khiết, cân bằng âm dương và tôn lên sắc đỏ rực rỡ của tà áo chính.',
    material: 'Lụa tơ tằm satin mềm mại',
    verifiedSource: {
      name: 'Quy chuẩn trang phục Áo dài học đường & truyền thống',
      museum: 'Viện Nghiên cứu May mặc & Thời trang Việt Nam',
      documentUrl: 'https://vietnamtextile.org.vn',
      citation: 'Chuyên khảo Trang phục truyền thống Việt, NXB Mỹ Thuật.'
    },
    genZStylingNote: 'Độ dài quần vừa chạm mu bàn chân giúp "hack" chiều cao tối đa khi kết hợp giày cao gót hoặc mules.',
    culturalDoAndDont: {
      dos: ['Chọn chất liệu lụa dày dặn, rủ suông tự nhiên.', 'Ủi thẳng nếp quần trước khi diện.'],
      donts: ['Tránh quần quá chật hoặc chất liệu quá mỏng gây phản cảm.']
    },
    colorHex: '#FDFBF7'
  },
  'tui-xach-trang-mini': {
    id: 'tui-xach-trang-mini',
    name: 'Túi xách mini thanh lịch',
    type: 'Phụ kiện hiện đại',
    category: 'accessory',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Hiện đại Gen Z',
    era: 'Thời trang đương đại',
    suitableContexts: ['Tết', 'Dạo phố', 'Cafe', 'Dạ tiệc'],
    suitableStyles: ['Hiện đại', 'Tối giản', 'Thanh lịch'],
    keyFeatures: 'Kiểu dáng hình hộp nhỏ gọn, quai xách tay cứng cáp, khóa kim loại ánh vàng nhẹ.',
    culturalMeaning: 'Sự kết hợp tinh tế giữa di sản truyền thống và phụ kiện hiện đại, biểu hiện cho nhịp sống đương đại năng động.',
    material: 'Da nhân tạo cao cấp dập vân trơn',
    verifiedSource: {
      name: 'Gen Z Heritage Styling Handbook',
      museum: 'Bảo tàng Phụ nữ Việt Nam',
      documentUrl: 'https://baotangphunu.org.vn',
      citation: 'Dự án Di sản & Giới trẻ, Trung tâm Giao lưu Văn hóa Phố Cổ 2023.'
    },
    genZStylingNote: 'Kích cỡ mini vừa vặn để đựng lì xì, thỏi son và điện thoại; giúp tổng thể outfit không bị nặng nề.',
    culturalDoAndDont: {
      dos: ['Chọn gam màu nhã nhặn tương thích với quần hoặc điểm nhấn áo.'],
      donts: ['Tránh túi ba lô quá to hoặc phong cách thể thao bụi bặm phá hỏng phom áo dài.']
    },
    colorHex: '#F5F5F0'
  },
  'giay-cao-got-trang': {
    id: 'giay-cao-got-trang',
    name: 'Giày cao gót quai mảnh thanh lịch',
    type: 'Giày dép',
    category: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Hiện đại',
    era: 'Đương đại',
    suitableContexts: ['Tết', 'Cưới hỏi', 'Dạ tiệc'],
    suitableStyles: ['Hiện đại', 'Thanh lịch'],
    keyFeatures: 'Gót nhọn cao 5-7cm, mũi nhọn thanh thoát kéo dài đôi chân, đệm lót êm ái cho ngày du xuân.',
    culturalMeaning: 'Nâng tầm tư thế đi đứng, tạo nên dáng đi uyển chuyển chuẩn mực của người con gái Việt.',
    material: 'Da bóng viền mềm, đế cao su chống trượt',
    verifiedSource: {
      name: 'Hướng dẫn phối trang phục truyền thống thế kỷ 21',
      museum: 'Tạp chí Mỹ thuật & Di sản Văn hóa',
      documentUrl: 'https://heritage.vietnamairlines.com',
      citation: 'Số chuyên đề Xuân & Việt phục.'
    },
    genZStylingNote: 'Có thể thay thế bằng Mary Jane đế trụ hoặc slingback mũi vuông nếu phải đi bộ nhiều tại phố cổ.',
    culturalDoAndDont: {
      dos: ['Chọn độ cao vừa sức để dáng đi luôn tự nhiên, thoải mái.'],
      donts: ['Tránh dép lê hay giày thể thao hầm hố khi mặc áo dài dịp trang trọng.']
    },
    colorHex: '#FAF7F2'
  },
  'khan-choang-do': {
    id: 'khan-choang-do',
    name: 'Khăn choàng lụa đỏ dệt hoa chìm',
    type: 'Phụ kiện thêm',
    category: 'accessory',
    imageUrl: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Miền Bắc',
    era: 'Truyền thống Kinh kỳ',
    suitableContexts: ['Tết', 'Tiết trời se lạnh', 'Lễ hội'],
    suitableStyles: ['Cổ điển', 'Thanh lịch', 'Hiện đại'],
    keyFeatures: 'Chất liệu lụa dệt mịn màng, viền tua rua thủ công, giữ ấm nhẹ nhàng cho tiết trời mùa xuân miền Bắc.',
    culturalMeaning: 'Gợi nhớ nét đài các của thiếu nữ Hà thành xưa, biểu hiện sự chu đáo và ấm áp sum vầy.',
    material: 'Lụa tơ tằm nguyên chất dệt tay',
    verifiedSource: {
      name: 'Làng nghề dệt lụa Vạn Phúc - Hà Đông',
      museum: 'Bảo tàng Dân tộc học Việt Nam',
      documentUrl: 'https://baotangdantochoctphcm.vn',
      citation: 'Bộ sưu tập nghề dệt lụa truyền thống Bắc Bộ.'
    },
    genZStylingNote: 'Choàng lơi qua một bên vai hoặc vắt hờ qua khuỷu tay khi chụp ảnh để tạo chuyển động mềm mại.',
    culturalDoAndDont: {
      dos: ['Quấn nhẹ nhàng, để lộ cổ áo dài duyên dáng.'],
      donts: ['Tránh quấn khăn len dày cộp làm che khuất phom cổ áo dài.']
    },
    colorHex: '#991B1B'
  },
  // Set 2 items: Ngũ Thân
  'ao-ngu-than-lam-ngoc': {
    id: 'ao-ngu-than-lam-ngoc',
    name: 'Áo ngũ thân tay chẽn lam ngọc',
    type: 'Áo ngũ thân',
    category: 'main',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Cố đô Huế & Toàn quốc',
    era: 'Thời Nguyễn (định chế bởi Chúa Nguyễn Phúc Khoát 1744 & Vua Minh Mạng 1827)',
    suitableContexts: ['Lễ hội', 'Dạo phố', 'Tết', 'Sự kiện văn hóa'],
    suitableStyles: ['Cổ điển', 'Hiện đại', 'Tối giản'],
    keyFeatures: 'Cấu trúc 5 thân (4 thân ngoài tượng trưng tứ thân phụ mẫu, 1 thân con bên trong tượng trưng cho người mặc), 5 cúc cài tượng trưng ngũ thường (Nhân, Lễ, Nghĩa, Trí, Tín).',
    culturalMeaning: 'Biểu tượng của đạo làm người, sự khiêm cung, hòa nhã và tính độc lập văn hóa Việt Nam thời cận đại. Áo ngũ thân phù hợp cho cả nam và nữ.',
    material: 'Lụa tơ tằm dệt sa hoặc đoạn gấm bóng mờ',
    verifiedSource: {
      name: 'Hồ sơ Di sản Văn hóa Áo ngũ thân',
      museum: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      documentUrl: 'https://hueworldheritage.org.vn',
      citation: 'Công trình nghiên cứu "Trang phục cung đình và dân gian thời Nguyễn", NXB Thuận Hóa.'
    },
    genZStylingNote: 'Áo ngũ thân form suông rộng rãi che khuyết điểm cực tốt, Gen Z có thể phối cùng kính râm mắt mèo hoặc kính gọng kim loại tròn tạo vibe học giả hiện đại.',
    culturalDoAndDont: {
      dos: [
        'Cài đủ 5 cúc cài đúng lề lối quy củ.',
        'Mặc kèm quần trắng ống rộng truyền thống bên dưới.',
        'Kết hợp quạt giấy dó hoặc túi cói thêu.'
      ],
      donts: [
        'Không cởi phanh cúc ngực làm mất đi nét kín đáo của đạo ngũ thường.',
        'Tránh mặc ngắn tũn hoặc làm biến dạng cấu trúc 5 thân cổ truyền.'
      ]
    },
    colorHex: '#0D9488'
  },
  'quat-giay-do-co-truyen': {
    id: 'quat-giay-do-co-truyen',
    name: 'Quạt giấy dó vẽ thủy mặc',
    type: 'Phụ kiện truyền thống',
    category: 'accessory',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Làng nghề Chàng Sơn, Hà Nội',
    era: 'Thế kỷ 19',
    suitableContexts: ['Lễ hội', 'Chụp ảnh', 'Dạo phố'],
    suitableStyles: ['Cổ điển', 'Thanh lịch'],
    keyFeatures: 'Nan tre ngâm dẻo dai, mặt giấy dó bồi thủ công phủ nét vẽ hoa sen hoặc chữ thư pháp thanh nhã.',
    culturalMeaning: 'Biểu tượng của tri thức, sự nho nhã thanh tao và sự mát lành.',
    material: 'Giấy dó truyền thống bồi nan tre tự nhiên',
    verifiedSource: {
      name: 'Làng nghề quạt giấy Chàng Sơn',
      museum: 'Bảo tàng Mỹ thuật Việt Nam',
      documentUrl: 'https://vnfam.vn',
      citation: 'Di sản mỹ nghệ làng nghề dân gian Bắc Bộ.'
    },
    genZStylingNote: 'Quạt cầm tay là "đạo cụ chụp ảnh quốc dân" của Gen Z, vừa tạo dáng tự nhiên vừa che nắng khéo léo.',
    culturalDoAndDont: {
      dos: ['Cầm nhẹ nhàng ngang ngực hoặc trước bụng khi chụp ảnh.'],
      donts: ['Tránh quạt giấy có họa tiết hoạt hình lạc quẻ với cổ phục.']
    },
    colorHex: '#E5E7EB'
  },
  'guoc-moc-quai-nhung': {
    id: 'guoc-moc-quai-nhung',
    name: 'Guốc mộc Yên Xá quai nhung',
    type: 'Giày dép truyền thống',
    category: 'footwear',
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Bắc Bộ & Nam Bộ',
    era: 'Cổ truyền đến cận đại',
    suitableContexts: ['Tết', 'Lễ hội', 'Dạo phố'],
    suitableStyles: ['Cổ điển', 'Hiện đại'],
    keyFeatures: 'Gỗ mít đẽo mộc mịn màng, đế cao 3-5cm, quai nhung êm ái không cọ rát mu bàn chân.',
    culturalMeaning: 'Âm thanh lốc cốc của guốc mộc trên sân gạch là ký ức văn hóa đằm thắm của người Việt xưa.',
    material: 'Gỗ mít tự nhiên, quai bọc nhung đỏ mận',
    verifiedSource: {
      name: 'Làng nghề guốc gỗ Yên Xá',
      museum: 'Bảo tàng Dân tộc học Việt Nam',
      documentUrl: 'https://baotangdantochoctphcm.vn',
      citation: 'Tư liệu văn hóa đồ họa & thủ công truyền thống.'
    },
    genZStylingNote: 'Guốc mộc được các bạn trẻ Gen Z cực kỳ ưa chuộng vì vừa mộc mạc vừa mang chất nghệ thuật Y2K Vintage.',
    culturalDoAndDont: {
      dos: ['Bước đi chậm rãi để tà áo và guốc tạo nhịp điệu tao nhã.'],
      donts: ['Tránh chạy nhảy gấp gáp dễ trượt ngã.']
    },
    colorHex: '#854D0E'
  },
  // Set 3 items: Áo Tấc
  'ao-tac-cung-dinh-luc-bao': {
    id: 'ao-tac-cung-dinh-luc-bao',
    name: 'Áo tấc gấm xanh lục bảo',
    type: 'Áo tấc',
    category: 'main',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Cung đình Huế & Khắp ba miền',
    era: 'Thời Nguyễn (Lễ phục trang trọng bậc nhất)',
    suitableContexts: ['Cưới hỏi', 'Tết', 'Nghi lễ trang trọng'],
    suitableStyles: ['Cổ điển', 'Thanh lịch'],
    keyFeatures: 'Tay thụng rộng và dài (tay áo dài hơn tay người một tấc nên gọi là áo tấc), cổ đứng, tà rộng quét dài sang trọng.',
    culturalMeaning: 'Áo tấc là lễ phục quốc gia thời Nguyễn, biểu thị sự trang nghiêm, kính cẩn trước tổ tiên và trời đất.',
    material: 'Gấm bát bửu dệt tơ tằm Huế',
    verifiedSource: {
      name: 'Đại Nam Hội Điển Sự Lệ - Trang phục lễ nghi',
      museum: 'Trung tâm Bảo tồn Di tích Cố đô Huế',
      documentUrl: 'https://hueworldheritage.org.vn',
      citation: 'Sách "Lễ phục triều Nguyễn", NXB Thế Giới.'
    },
    genZStylingNote: 'Áo tấc tay thụng bay bổng cực kỳ ăn ảnh khi chụp hình phong cách "nàng thơ cung đình" hoặc cặp đôi ngày cưới.',
    culturalDoAndDont: {
      dos: ['Khoanh tay trước bụng để hai ống tay thụng phủ kín đoan trang.', 'Đội khăn đóng ngũ thân chuẩn phong thái.'],
      donts: ['Không kéo xắn tay áo thụng lên như áo mặc ở nhà.']
    },
    colorHex: '#047857'
  },
  // Set 4 items: Áo Tứ Thân
  'ao-tu-than-kinh-bac': {
    id: 'ao-tu-than-kinh-bac',
    name: 'Áo tứ thân ngũ sắc Kinh Bắc',
    type: 'Áo tứ thân',
    category: 'main',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Đồng bằng Bắc Bộ',
    era: 'Cổ truyền từ nhiều thế kỷ trước thế kỷ 20',
    suitableContexts: ['Lễ hội', 'Dạo phố', 'Biểu diễn', 'Chụp ảnh nghệ thuật'],
    suitableStyles: ['Cổ điển', 'Phá cách Y2K'],
    keyFeatures: 'Bốn vạt áo (hai vạt sau may liền, hai vạt trước để buông hoặc thắt vạt duyên dáng), kết hợp yếm đào và thắt lưng lụa.',
    culturalMeaning: 'Đại diện cho vẻ đẹp khỏe khoắn, tần tảo, chịu thương chịu khó của người phụ nữ nông thôn Bắc Bộ xưa, gắn liền với làn điệu dân ca quan họ.',
    material: 'Đũi tơ tằm thô nhuộm củ nâu, gấm hoa sen',
    verifiedSource: {
      name: 'Không gian văn hóa Quan họ Bắc Ninh',
      museum: 'Bảo tàng Dân tộc học Việt Nam',
      documentUrl: 'https://baotangdantochoctphcm.vn',
      citation: 'Di sản phi vật thể nhân loại UNESCO - Trang phục Quan họ.'
    },
    genZStylingNote: 'Gen Z phối yếm lụa với blazer khoác ngoài hoặc quần ống suông phá cách tạo phong cách Modern Heritage cực cuốn hút.',
    culturalDoAndDont: {
      dos: ['Thắt dải yếm và thắt lưng lụa gọn gàng.', 'Phối nón quai thao hoặc khăn mỏ quạ tạo điểm nhấn.'],
      donts: ['Tránh mặc yếm hở lưng quá đà ở những chốn tôn nghiêm đình chùa.']
    },
    colorHex: '#DB2777'
  },
  'non-quai-thao-mini': {
    id: 'non-quai-thao-mini',
    name: 'Nón ba tầm / Nón quai thao',
    type: 'Nón đội đầu',
    category: 'headwear',
    imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Bắc Ninh, Hà Bắc xưa',
    era: 'Thế kỷ 17-20',
    suitableContexts: ['Lễ hội', 'Chụp ảnh xuân', 'Biểu diễn'],
    suitableStyles: ['Cổ điển', 'Hiện đại'],
    keyFeatures: 'Vành tròn rộng phẳng đan từ lá cọ/lá gồi, quai thao đan từ sợi tơ tằm có tua rua dài duyên dáng.',
    culturalMeaning: 'Chiếc nón che nghiêng nụ cười chúm chím của liền chị quan họ, biểu trưng cho sự e ấp ý nhị.',
    material: 'Lá gồi trắng khô, quai dệt sợi tơ tằm ngũ sắc',
    verifiedSource: {
      name: 'Làng nghề nón Chuông & nón Ba Tầm',
      museum: 'Bảo tàng Phụ nữ Việt Nam',
      documentUrl: 'https://baotangphunu.org.vn',
      citation: 'Bộ sưu tập Nón Việt qua các thời kỳ.'
    },
    genZStylingNote: 'Cầm nón ngang ngực hoặc nghiêng góc 45 độ khi bắt ống kính góc cận.',
    culturalDoAndDont: {
      dos: ['Giữ quai thao buông tự nhiên trên bờ vai.'],
      donts: ['Tránh làm gãy vành nón bằng cách không đè vật nặng lên nón.']
    },
    colorHex: '#FEF08A'
  },
  // Set 5 items: Nhật Bình
  'ao-nhat-binh-hoang-cung': {
    id: 'ao-nhat-binh-hoang-cung',
    name: 'Áo Nhật Bình hoàng gia cách tân',
    type: 'Áo Nhật Bình',
    category: 'main',
    imageUrl: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Triều Nguyễn - Cố đô Huế',
    era: 'Triều Nguyễn (Trang phục Hậu phi, Công chúa)',
    suitableContexts: ['Dạ tiệc', 'Cưới hỏi', 'Tết', 'Sự kiện danh giá'],
    suitableStyles: ['Hiện đại', 'Cổ điển', 'Thanh lịch'],
    keyFeatures: 'Cổ áo hình chữ nhật viền hoa văn tinh xảo, dải ngũ sắc ở tay áo tượng trưng cho ngũ hành, thân áo thêu kim tuyến phượng hoàng.',
    culturalMeaning: 'Đỉnh cao của nghệ thuật thêu thùa và phẩm phục cung đình triều Nguyễn, thể hiện sự quý phái và quyền lực của phụ nữ quý tộc.',
    material: 'Gấm tơ dệt kim tuyến thêu tay chỉ vàng',
    verifiedSource: {
      name: 'Khâm Định Đại Nam Hội Điển Sự Lệ',
      museum: 'Bảo tàng Cổ vật Cung đình Huế',
      documentUrl: 'https://hueworldheritage.org.vn',
      citation: 'Chương Phục sức Cung phi Hoàng tộc, Viện Sử học.'
    },
    genZStylingNote: 'Gen Z phối áo Nhật Bình với khuyên tai ngọc trai hạt lớn và giày slingback để đi dự tiệc sang trọng.',
    culturalDoAndDont: {
      dos: ['Cài khuy ngực ngay ngắn, giữ dải ngũ hành tay áo ngay ngắn.'],
      donts: ['Không đeo trang sức kim loại hầm hố gai góc làm mất đi tính vương giả nhã nhặn.']
    },
    colorHex: '#CA8A04'
  },
  'man-cai-toc-ngoc-trai': {
    id: 'man-cai-toc-ngoc-trai',
    name: 'Mấn cách điệu đính ngọc trai',
    type: 'Mấn đội đầu',
    category: 'headwear',
    imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80'
    ],
    region: 'Toàn quốc',
    era: 'Tân thời',
    suitableContexts: ['Tết', 'Cưới hỏi', 'Dạ tiệc'],
    suitableStyles: ['Hiện đại', 'Thanh lịch'],
    keyFeatures: 'Dáng mấn tròn nhẹ, bọc nhung hoặc gấm, đính điểm xuyết hạt trai thiên nhiên tinh tế.',
    culturalMeaning: 'Nâng niu mái tóc người phụ nữ Việt, mang lại vẻ đẹp kiêu sa và thanh tú cho gương mặt.',
    material: 'Vải nhung tuyết bọc lõi bấc nhẹ, ngọc trai nhân tạo',
    verifiedSource: {
      name: 'Nghệ thuật vấn tóc và mấn Việt',
      museum: 'Bảo tàng Phụ nữ Việt Nam',
      documentUrl: 'https://baotangphunu.org.vn',
      citation: 'Khảo cứu Văn hóa mặc dân gian và hiện đại.'
    },
    genZStylingNote: 'Mấn bản mỏng 2-3cm tạo cảm giác nhẹ nhàng, tôn dáng mặt thon gọn cho các nàng Gen Z.',
    culturalDoAndDont: {
      dos: ['Đội mấn vừa vặn qua đỉnh đầu, tóc mai buông lơi tự nhiên.'],
      donts: ['Tránh mấn quá nặng cồng kềnh gây đau đầu khi di chuyển.']
    },
    colorHex: '#E2E8F0'
  }
};

export const OUTFIT_SETS: OutfitSet[] = [
  {
    id: 'set-aodai-do-tet',
    title: 'Set áo dài đỏ - hiện đại',
    subtitle: 'Thanh lịch · Hiện đại · Đậm chất Tết',
    description: 'Bộ trang phục kinh điển mùa Tết kết hợp áo dài đỏ gấm tơ tằm thướt tha cùng túi xách mini trắng và giày cao gót thanh lịch, mang đến vẻ đẹp rạng rỡ, may mắn mà vẫn bắt kịp xu hướng thời trang Gen Z.',
    context: 'Tết',
    style: 'Hiện đại',
    primaryColor: 'Đỏ',
    colorHex: '#C51E28',
    modelImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
    model3DConfig: {
      baseColor: '#C51E28',
      secondaryColor: '#FFFFFF',
      trimColor: '#B91C1C',
      fabricGloss: 0.65,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 3.0
    },
    items: [
      VIET_FASHION_ITEMS['ao-dai-do-gam'],
      VIET_FASHION_ITEMS['quan-lua-trang'],
      VIET_FASHION_ITEMS['tui-xach-trang-mini'],
      VIET_FASHION_ITEMS['giay-cao-got-trang'],
      VIET_FASHION_ITEMS['khan-choang-do']
    ],
    colorHarmony: {
      score: 98,
      palette: ['#C51E28', '#FFFFFF', '#FAF7F2', '#991B1B'],
      element: 'Hỏa sinh Thổ (Tương sinh may mắn)',
      explanation: 'Sắc đỏ rực rỡ của áo dài được cân bằng hoàn hảo bởi nền trắng tinh khôi của quần lụa và phụ kiện, tránh cảm giác chói gắt mà tạo hiệu ứng thị giác sang trọng, thanh tao.'
    },
    culturalBadge: {
      verified: true,
      rating: 99,
      summary: 'Dữ liệu được xác thực bởi Bảo tàng Phụ nữ Việt Nam. Chuẩn phom dáng áo dài truyền thống với đường xẻ tà ngang eo kín đáo.'
    },
    genZTips: [
      'Chọn kiểu tóc búi lơi kèm kẹp càng cua hoặc tóc uốn xoăn sóng tự nhiên.',
      'Sử dụng phụ kiện tông vàng gold nhẹ hoặc bạc mảnh để tạo điểm nhấn hiện đại.',
      'Mẹo chụp ảnh: Đứng nghiêng 45 độ, một tay cầm nhẹ tà áo hoặc cầm cành đào/mai.'
    ]
  },
  {
    id: 'set-nguthan-lamngoc-daopho',
    title: 'Set áo ngũ thân lam ngọc - Gen Z Chill',
    subtitle: 'Nho nhã · Phóng khoáng · Tinh thần Cố đô',
    description: 'Thiết kế ngũ thân tay chẽn màu lam ngọc tươi trẻ kết hợp cùng guốc mộc và quạt giấy dó thủy mặc, thích hợp cho các buổi dạo phố xuân, cafe check-in phong cách Indochine.',
    context: 'Dạo phố',
    style: 'Tối giản',
    primaryColor: 'Xanh lam',
    colorHex: '#0D9488',
    modelImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=80',
    model3DConfig: {
      baseColor: '#0D9488',
      secondaryColor: '#F8FAFC',
      trimColor: '#115E59',
      fabricGloss: 0.45,
      silhouette: 'nguthan',
      sleeveWidth: 'medium',
      collarHeight: 3.5
    },
    items: [
      VIET_FASHION_ITEMS['ao-ngu-than-lam-ngoc'],
      VIET_FASHION_ITEMS['quan-lua-trang'],
      VIET_FASHION_ITEMS['quat-giay-do-co-truyen'],
      VIET_FASHION_ITEMS['guoc-moc-quai-nhung'],
      VIET_FASHION_ITEMS['tui-xach-trang-mini']
    ],
    colorHarmony: {
      score: 95,
      palette: ['#0D9488', '#F8FAFC', '#854D0E', '#E5E7EB'],
      element: 'Thủy sinh Mộc (Hòa hợp thư thái)',
      explanation: 'Sắc xanh ngọc kết hợp màu gỗ mộc trầm tạo cảm giác bình an, thanh thoát và gần gũi với thiên nhiên đất trời.'
    },
    culturalBadge: {
      verified: true,
      rating: 97,
      summary: 'Xác thực bởi Trung tâm Bảo tồn Di tích Cố đô Huế. Giữ đúng kết cấu 5 thân và 5 cúc cài chuẩn quy chế triều Nguyễn.'
    },
    genZTips: [
      'Phù hợp diện chung nhóm bạn (cả nam và nữ) khi đi chụp ảnh tại Văn Miếu, Phố Cổ hoặc Đại Nội Huế.',
      'Mix cùng kính gọng tròn mắt mảnh tạo phong cách tri thức tân tiến.'
    ]
  },
  {
    id: 'set-aotac-cungdinh-cuoihoi',
    title: 'Set áo tấc xanh lục bảo - Cung đình sang trọng',
    subtitle: 'Trang trọng · Uy nghi · Đại lễ & Cưới hỏi',
    description: 'Áo tấc tay thụng dài xanh lục bảo quyền quý thêu hoa văn cung đình, kết hợp mấn ngọc trai và phụ kiện kim hoàn, lý tưởng cho lễ đính hôn, cưới hỏi hoặc sự kiện kỷ niệm văn hóa lớn.',
    context: 'Cưới hỏi',
    style: 'Cổ điển',
    primaryColor: 'Xanh cốm',
    colorHex: '#047857',
    modelImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    model3DConfig: {
      baseColor: '#047857',
      secondaryColor: '#FFFFFF',
      trimColor: '#065F46',
      fabricGloss: 0.8,
      silhouette: 'aotac',
      sleeveWidth: 'wide',
      collarHeight: 3.2
    },
    items: [
      VIET_FASHION_ITEMS['ao-tac-cung-dinh-luc-bao'],
      VIET_FASHION_ITEMS['quan-lua-trang'],
      VIET_FASHION_ITEMS['man-cai-toc-ngoc-trai'],
      VIET_FASHION_ITEMS['giay-cao-got-trang']
    ],
    colorHarmony: {
      score: 96,
      palette: ['#047857', '#FFFFFF', '#E2E8F0', '#065F46'],
      element: 'Mộc vượng (Sinh sôi nảy nở)',
      explanation: 'Sắc xanh lục bảo thẫm kết hợp ngọc trai tạo khí chất cao sang, tượng trưng cho hạnh phúc bền lâu và phúc lộc viên mãn.'
    },
    culturalBadge: {
      verified: true,
      rating: 98,
      summary: 'Khảo cứu theo Đại Nam Hội Điển Sự Lệ - Lễ phục triều Nguyễn.'
    },
    genZTips: [
      'Tư thế đứng: Chắp hai tay trước bụng để khoe trọn độ rủ quý phái của tà áo thụng.',
      'Trang điểm phong cách trong trẻo (glass skin) nhấn vào màu môi trầm quyền lực.'
    ]
  },
  {
    id: 'set-tuthan-kinhbac-lehoi',
    title: 'Set áo tứ thân sắc hồng - Hội hè Kinh Bắc',
    subtitle: 'Duyên dáng · Nồng nàn · Đậm hồn Quan họ',
    description: 'Áo tứ thân kết hợp yếm đào cánh sen và nón ba tầm quai thao, mang hơi thở dân gian Kinh Bắc vào gu thời trang festival sống động của giới trẻ.',
    context: 'Lễ hội',
    style: 'Phá cách Y2K',
    primaryColor: 'Hồng',
    colorHex: '#DB2777',
    modelImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    model3DConfig: {
      baseColor: '#DB2777',
      secondaryColor: '#FEF08A',
      trimColor: '#9D174D',
      fabricGloss: 0.35,
      silhouette: 'tuthan',
      sleeveWidth: 'fitted',
      collarHeight: 0
    },
    items: [
      VIET_FASHION_ITEMS['ao-tu-than-kinh-bac'],
      VIET_FASHION_ITEMS['non-quai-thao-mini'],
      VIET_FASHION_ITEMS['guoc-moc-quai-nhung'],
      VIET_FASHION_ITEMS['tui-xach-trang-mini']
    ],
    colorHarmony: {
      score: 94,
      palette: ['#DB2777', '#FEF08A', '#854D0E', '#FDFBF7'],
      element: 'Ngũ sắc tương hợp (Âm dương giao hòa)',
      explanation: 'Phối màu yếm đào hồng phối dải thắt lưng vàng rực tạo không khí hội hè tưng bừng, trẻ trung và tràn đầy nhựa sống.'
    },
    culturalBadge: {
      verified: true,
      rating: 96,
      summary: 'Xác thực bởi Bảo tàng Dân tộc học Việt Nam. Đúng lề lối áo tứ thân quan họ Bắc Ninh.'
    },
    genZTips: [
      'Có thể tháo nón quai thao làm phụ kiện cầm tay khi di chuyển dạo chơi.',
      'Phối cùng kiểu tóc thắt bím hai bên phong cách retro ngọt ngào.'
    ]
  },
  {
    id: 'set-nhatbinh-hoangcung-datiec',
    title: 'Set Nhật Bình hoàng gia - Dạ tiệc quý tộc',
    subtitle: 'Lộng lẫy · Tinh hoa · Nghệ thuật thêu cung đình',
    description: 'Nhật Bình cách tân với sắc vàng hoàng yến, viền cổ chữ nhật ngũ sắc đặc trưng, phối cùng túi baguette và mấn ngọc, tạo nên diện mạo dạ tiệc quyền quý hút trọn mọi ánh nhìn.',
    context: 'Dạ tiệc',
    style: 'Thanh lịch',
    primaryColor: 'Vàng',
    colorHex: '#CA8A04',
    modelImage: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80',
    model3DConfig: {
      baseColor: '#CA8A04',
      secondaryColor: '#FAF5FF',
      trimColor: '#A16207',
      fabricGloss: 0.9,
      silhouette: 'nhatbinh',
      sleeveWidth: 'medium',
      collarHeight: 2.8
    },
    items: [
      VIET_FASHION_ITEMS['ao-nhat-binh-hoang-cung'],
      VIET_FASHION_ITEMS['quan-lua-trang'],
      VIET_FASHION_ITEMS['man-cai-toc-ngoc-trai'],
      VIET_FASHION_ITEMS['giay-cao-got-trang']
    ],
    colorHarmony: {
      score: 99,
      palette: ['#CA8A04', '#FAF5FF', '#E2E8F0', '#991B1B'],
      element: 'Thổ vượng (Vương giả - Phú quý)',
      explanation: 'Sắc vàng cung đình kết hợp viền thêu ngũ hành tạo sự uy nghi đỉnh cao, cực kỳ thích hợp cho các buổi dạ tiệc vinh danh hay sự kiện ngoại giao văn hóa.'
    },
    culturalBadge: {
      verified: true,
      rating: 100,
      summary: 'Xác thực bởi Bảo tàng Cổ vật Cung đình Huế. Phục dựng chuẩn xác hoa văn viền cổ Nhật Bình thời Triều Nguyễn.'
    },
    genZTips: [
      'Điểm nhấn makeup: Son môi đỏ nhung và kẻ eyeliner sắc sảo.',
      'Sử dụng phụ kiện trang sức ngọc bích hoặc ngọc trai dáng dài.'
    ]
  },
  {
    id: 'set-aodai-trang-hocduong',
    title: 'Set áo dài trắng - Kỷ yếu học đường tinh khôi',
    subtitle: 'Thuần khiết · Thanh xuân · Ký ức giảng đường',
    description: 'Áo dài lụa trắng Hà Đông tối giản, phom dáng thanh thoát, kết hợp giày bệt Mary Jane hoặc sandal thanh lịch, lưu giữ khoảnh khắc thanh xuân rực rỡ nhất của lứa tuổi học sinh, sinh viên.',
    context: 'Đi học',
    style: 'Tối giản',
    primaryColor: 'Trắng',
    colorHex: '#F8FAFC',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    model3DConfig: {
      baseColor: '#F8FAFC',
      secondaryColor: '#E2E8F0',
      trimColor: '#CBD5E1',
      fabricGloss: 0.5,
      silhouette: 'aodai',
      sleeveWidth: 'fitted',
      collarHeight: 2.5
    },
    items: [
      VIET_FASHION_ITEMS['quan-lua-trang'],
      VIET_FASHION_ITEMS['tui-xach-trang-mini'],
      VIET_FASHION_ITEMS['giay-cao-got-trang']
    ],
    colorHarmony: {
      score: 97,
      palette: ['#F8FAFC', '#E2E8F0', '#CBD5E1'],
      element: 'Kim tinh thuần khiết',
      explanation: 'Sắc trắng đơn sắc toàn diện tôn lên nét đẹp tự nhiên của tuổi trẻ, mang vẻ đẹp trong sáng và không bao giờ lỗi mốt.'
    },
    culturalBadge: {
      verified: true,
      rating: 100,
      summary: 'Quy chuẩn Áo dài nữ sinh Việt Nam theo tiêu chuẩn giáo dục và truyền thống văn hóa.'
    },
    genZTips: [
      'Makeup nhẹ nhàng kiểu "no-makeup makeup look", thoa son bóng nhẹ.',
      'Kẹp tóc nơ trắng hoặc băng đô mảnh để tăng phần nữ tính thanh thuần.'
    ]
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
  { value: 'Hiện đại', label: 'Hiện đại Gen Z (Chic & Trendy)', desc: 'Kết hợp phom truyền thống với phụ kiện thời thượng' },
  { value: 'Tối giản', label: 'Tối giản (Minimalist Elegance)', desc: 'Đường nét tinh gọn, màu đơn sắc, chất liệu tự nhiên' },
  { value: 'Cổ điển', label: 'Cổ điển Hoàng gia (Vintage Heritage)', desc: 'Phục dựng lề lối cung đình thời Nguyễn, Kinh Bắc' },
  { value: 'Thanh lịch', label: 'Thanh lịch quý phái (Chic & Grace)', desc: 'Tôn vinh sự đoan trang, chất liệu lụa gấm cao cấp' },
  { value: 'Phá cách Y2K', label: 'Phá cách Y2K (Edgy Heritage Fusion)', desc: 'Mix yếm/áo tứ thân với phụ kiện năng động, cá tính' }
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
    rule: 'Bắt buộc mặc kèm quần dài',
    detail: 'Áo dài và áo tấc nguyên bản được thiết kế để đi kèm quần lụa dài qua mắt cá chân. Tuyệt đối không mặc áo dài với quần sooc ngắn, chân váy ngắn trên gối hoặc không mặc quần để tránh gây phản cảm và xuyên tạc di sản.',
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
    detail: 'Nếu chọn áo may bằng chất liệu tơ tằm mỏng, vải voan hoặc sa, phải có lớp áo lót bên trong cùng tông màu kín đáo, không lộ nội y tương phản.',
    severity: 'important'
  },
  {
    title: 'Phối phụ kiện phong cách Gen Z',
    rule: 'Hiện đại hóa có chừng mực',
    detail: 'Gen Z hoàn toàn có thể kết hợp áo truyền thống với giày cao gót mũi nhọn, túi xách mini thời thượng, kính mắt mèo, kẹp tóc ngọc trai hoặc guốc mộc phá cách, miễn là tổng thể giữ được sự hài hòa và đoan trang.',
    severity: 'good_practice'
  }
];

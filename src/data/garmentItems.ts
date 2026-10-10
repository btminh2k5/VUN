import { GarmentItem } from '../types/fashion';

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

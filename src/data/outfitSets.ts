import { OutfitSet } from '../types/fashion';
import { VIET_FASHION_ITEMS } from './garmentItems';

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

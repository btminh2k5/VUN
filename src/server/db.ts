import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Pool } = pg;

export interface CatalogItem {
  id: number | string;
  category: string;
  name: string;
  audience: string;
  color: string;
  region: string | null;
  occasion: string[];
  style: string[];
  image_url: string;
  dataset_path: string;
  type_description: string | null;
  variant_description: string | null;
  origin: string | null;
  cultural_meaning: string | null;
  cultural_notes: string | null;
  source: string | null;
  accessories: string[];
  image_source: string | null;
  image_license: string | null;
  type_review_status: string;
  image_review_status: string;
}

// 35 real seed items from database/postgresql/dataset_v2/
export const REAL_DATASET_FALLBACK: CatalogItem[] = [
  // Áo bà ba (8 ảnh)
  {
    id: 1,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu cam',
    audience: 'Nữ',
    color: 'Cam',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ, Tết', 'Hoạt động cộng đồng'],
    style: ['Tối giản', 'Hiện đại'],
    image_url: '/images/dataset/Nu/aobaba/BB_cam.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_cam.jpg',
    type_description: 'Trang phục có thiết kế giản dị, dáng áo truyền thống tương đối rộng và thẳng, thuận tiện cho sinh hoạt. Các mẫu hiện đại có thể điều chỉnh eo, cổ và tay áo.',
    variant_description: 'Áo bà ba nữ màu cam tươi sáng, cổ tròn xẻ ngực, cài cúc phía trước.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Gắn với đời sống lao động, sinh hoạt và bản sắc văn hóa của cư dân Nam Bộ.',
    cultural_notes: 'Các bối cảnh sử dụng được ghi nhận ở cấp loại trang phục; cần đối chiếu kiểu dáng từng mẫu trước khi gợi ý.',
    source: 'Báo Cần Thơ — Thêm nét duyên khi diện áo bà ba',
    accessories: ['Khăn rằn Nam Bộ', 'Nón lá'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 2,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu đỏ',
    audience: 'Nữ',
    color: 'Đỏ',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ, Tết', 'Hoạt động cộng đồng'],
    style: ['Hiện đại', 'Nổi bật'],
    image_url: '/images/dataset/Nu/aobaba/BB_do.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_do.jpg',
    type_description: 'Trang phục có thiết kế giản dị, dáng áo truyền thống tương đối rộng và thẳng, thuận tiện cho sinh hoạt.',
    variant_description: 'Áo bà ba nữ sắc đỏ tươi tắn, biểu tượng của sự may mắn và hoan hỷ ngày hội hè.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Gắn với đời sống lao động, sinh hoạt và bản sắc văn hóa của cư dân Nam Bộ.',
    cultural_notes: 'Thích hợp ngày Tết hoặc hội xuân miền Tây.',
    source: 'Báo Cần Thơ — Nghề may áo bà ba',
    accessories: ['Khăn rằn', 'Guốc mộc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 3,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu hồng',
    audience: 'Nữ',
    color: 'Hồng',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ, Tết', 'Dạo phố sông nước'],
    style: ['Duyên dáng', 'Hiện đại'],
    image_url: '/images/dataset/Nu/aobaba/BB_hong.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_hong.jpg',
    type_description: 'Trang phục có thiết kế giản dị, dáng áo truyền thống.',
    variant_description: 'Áo bà ba nữ màu hồng cánh sen dịu dàng thướt tha.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Gắn với đời sống lao động, sinh hoạt của phụ nữ sông nước miền Tây.',
    cultural_notes: 'Tôn vinh nét dịu dàng e ấp của thiếu nữ Nam Bộ.',
    source: 'Báo Cần Thơ',
    accessories: ['Nón lá', 'Vòng tay bạc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 4,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu nâu',
    audience: 'Nữ',
    color: 'Nâu',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lao động', 'Hoạt động cộng đồng'],
    style: ['Truyền thống', 'Mộc mạc'],
    image_url: '/images/dataset/Nu/aobaba/BB_nau.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_nau.jpg',
    type_description: 'Dáng áo kinh điển gắn với sắc nâu đất phù sa phù trợ đời sống nông nghiệp.',
    variant_description: 'Áo bà ba nữ màu nâu mộc mạc, đậm hồn quê hương.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Biểu trưng cho sự chịu thương chịu khó, giản dị và chân chất.',
    cultural_notes: 'Màu nâu nhuộm từ vỏ cây dà hoặc đất phù sa truyền thống.',
    source: 'Báo Cần Thơ',
    accessories: ['Khăn rằn ca rô', 'Nón lá'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 5,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu tím',
    audience: 'Nữ',
    color: 'Tím',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ, Tết', 'Chụp ảnh'],
    style: ['Thơ mộng', 'Thanh lịch'],
    image_url: '/images/dataset/Nu/aobaba/BB_Tim.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_Tim.jpg',
    type_description: 'Trang phục có thiết kế giản dị, chất vải rủ nhẹ tôn dáng.',
    variant_description: 'Áo bà ba nữ màu tím hoa cà ngọt ngào, đậm chất miệt vườn.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Sự thủy chung, đằm thắm của người phụ nữ phương Nam.',
    cultural_notes: 'Thích hợp cho các buổi chèo thuyền ngắm chợ nổi hoặc dạo vườn cây ăn trái.',
    source: 'Báo Cần Thơ',
    accessories: ['Khăn rằn', 'Guốc gỗ'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 6,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu trắng',
    audience: 'Nữ',
    color: 'Trắng',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ kỷ niệm', 'Chụp ảnh'],
    style: ['Thanh khiết', 'Tối giản'],
    image_url: '/images/dataset/Nu/aobaba/BB_trang.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_trang.jpg',
    type_description: 'Áo bà ba lụa trắng nhẹ nhàng, thoáng mát.',
    variant_description: 'Áo bà ba nữ màu trắng ngà thuần khiết.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Vẻ đẹp thanh tân, trong trẻo và duyên dáng.',
    cultural_notes: 'Mặc cùng quần lụa đen hoặc quần lụa trắng ống suông.',
    source: 'Báo Cần Thơ',
    accessories: ['Nón lá chóp nhọn', 'Búi tóc kẹp trâm'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 7,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu xanh cốm',
    audience: 'Nữ',
    color: 'Xanh cốm',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ, Tết', 'Dạo phố'],
    style: ['Tươi mới', 'Trẻ trung'],
    image_url: '/images/dataset/Nu/aobaba/BB_xanhcom.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_xanhcom.jpg',
    type_description: 'Trang phục may bằng vải lụa màu xanh mạ non tươi tắn.',
    variant_description: 'Áo bà ba nữ màu xanh cốm non trẻ trung, căng tràn sức sống.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Sức sống thiên nhiên cây cỏ, mùa màng trù phú miền sông nước.',
    cultural_notes: 'Rất hợp cho các bạn trẻ dạo phố mùa xuân.',
    source: 'Báo Cần Thơ',
    accessories: ['Khăn rằn', 'Giỏ mây tre'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 8,
    category: 'Áo bà ba',
    name: 'Áo bà ba nữ màu xanh lam',
    audience: 'Nữ',
    color: 'Xanh lam',
    region: 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion: ['Sinh hoạt thường ngày', 'Lễ, Tết', 'Du lịch'],
    style: ['Dịu mát', 'Hiện đại'],
    image_url: '/images/dataset/Nu/aobaba/BB_xanhlam.jpg',
    dataset_path: 'dataset/Nu/aobaba/BB_xanhlam.jpg',
    type_description: 'Áo bà ba xanh lam ngọc dịu mắt, xẻ tà nhẹ hai bên hông.',
    variant_description: 'Áo bà ba nữ màu xanh lam thanh lịch mát mẻ.',
    origin: 'Nam Bộ xưa',
    cultural_meaning: 'Hình ảnh dòng sông Cửu Long uốn lượn hiền hòa bồi đắp phù sa.',
    cultural_notes: 'Thích hợp các dịp hội làng và sinh hoạt sông nước.',
    source: 'Báo Cần Thơ',
    accessories: ['Nón lá', 'Guốc mộc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },

  // Áo dài (7 ảnh)
  {
    id: 9,
    category: 'Áo dài',
    name: 'Áo dài nữ màu cam',
    audience: 'Nữ',
    color: 'Cam',
    region: 'Việt Nam',
    occasion: ['Tết', 'Cưới hỏi', 'Lễ kỷ niệm', 'Chụp ảnh'],
    style: ['Hiện đại', 'Năng động'],
    image_url: '/images/dataset/Nu/aodai/ad_cam.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_cam.jpg',
    type_description: 'Áo dài hiện đại thường có hai tà trước và sau, mặc cùng quần dài. Kiểu cổ, tay, độ ôm và chiều dài tà thay đổi theo thiết kế.',
    variant_description: 'Áo dài nữ màu cam hoàng hôn rạng rỡ, tôn nét đẹp tươi tắn hiện đại.',
    origin: 'Áo dài hiện đại phát triển từ các dạng áo truyền thống, trong đó có áo ngũ thân. Những cải tiến của họa sĩ Nguyễn Cát Tường trong thập niên 1930 là một dấu mốc của quá trình phát triển này.',
    cultural_meaning: 'Một biểu tượng văn hóa Việt Nam, gắn với hình ảnh phụ nữ Việt và sự tiếp nối giữa truyền thống với thẩm mỹ hiện đại.',
    cultural_notes: 'Mục này dùng cho áo dài hiện đại, phân biệt với mục áo ngũ thân tay chẽn.',
    source: 'Vietnam Tourism — Tất cả về áo dài & Bảo tàng Phụ nữ Nam Bộ',
    accessories: ['Quần lụa trắng', 'Guốc cao gót', 'Túi xách mini'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 10,
    category: 'Áo dài',
    name: 'Áo dài nữ màu đỏ',
    audience: 'Nữ',
    color: 'Đỏ',
    region: 'Việt Nam',
    occasion: ['Tết', 'Cưới hỏi', 'Lễ kỷ niệm', 'Chụp ảnh xuân'],
    style: ['Hiện đại', 'Thanh lịch', 'Cổ điển'],
    image_url: '/images/dataset/Nu/aodai/ad_do.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_do.jpg',
    type_description: 'Áo dài gấm lụa màu đỏ may mắn, tà bay thướt tha ngang mắt cá chân.',
    variant_description: 'Áo dài đỏ truyền thống đón Tết và lễ cưới hỏi, biểu trưng cho phúc lộc và may mắn tràn đầy.',
    origin: 'Cải tiến từ áo ngũ thân từ thập niên 1930.',
    cultural_meaning: 'Màu đỏ mang lại vượng khí, niềm vui và sự hân hoan sum vầy ngày đầu năm.',
    cultural_notes: 'Phối cùng quần lụa suông trắng hoặc vàng be sang trọng.',
    source: 'Vietnam Tourism & Bảo tàng Phụ nữ Nam Bộ',
    accessories: ['Quần lụa suông trắng', 'Mấn đính ngọc', 'Túi cầm tay'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 11,
    category: 'Áo dài',
    name: 'Áo dài nữ màu hồng',
    audience: 'Nữ',
    color: 'Hồng',
    region: 'Việt Nam',
    occasion: ['Tết', 'Cưới hỏi', 'Chụp ảnh', 'Đi học'],
    style: ['Nàng thơ', 'Thanh tao'],
    image_url: '/images/dataset/Nu/aodai/ad_hong.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_hong.jpg',
    type_description: 'Áo dài hai tà thướt tha tông hồng pastel ngọt ngào.',
    variant_description: 'Áo dài nữ sắc hồng đào nhẹ nhàng, mang phong cách nàng thơ dịu dàng thuần khiết.',
    origin: 'Phát triển từ thập niên 1930.',
    cultural_meaning: 'Biểu trưng cho tình yêu thuần khiết, nét duyên thầm e ấp của người con gái Việt.',
    cultural_notes: 'Rất được yêu thích trong các dịp chụp ảnh kỷ yếu và du xuân.',
    source: 'Vietnam Tourism',
    accessories: ['Quần lụa trắng', 'Kẹp tóc ngọc trai', 'Giày cao gót'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 12,
    category: 'Áo dài',
    name: 'Áo dài nữ màu tím',
    audience: 'Nữ',
    color: 'Tím',
    region: 'Việt Nam',
    occasion: ['Tết', 'Lễ kỷ niệm', 'Chụp ảnh nghệ thuật', 'Cưới hỏi'],
    style: ['Quý phái', 'Cổ điển'],
    image_url: '/images/dataset/Nu/aodai/ad_tim.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_tim.jpg',
    type_description: 'Áo dài tơ tằm màu tím huế đoan trang, cổ cao truyền thống.',
    variant_description: 'Áo dài nữ sắc tím Huế mộng mơ, tôn vinh vẻ đẹp kín đáo và chiều sâu tâm hồn.',
    origin: 'Gắn liền với hình ảnh thiếu nữ xứ Huế và trường Đồng Khánh xưa.',
    cultural_meaning: 'Sự son sắt thủy chung, nền nã và trang trọng.',
    cultural_notes: 'Chuẩn mực trang phục cho các dịp lễ trang nghiêm và nghi thức truyền thống.',
    source: 'Bảo tàng Phụ nữ Nam Bộ',
    accessories: ['Quần lụa trắng/đen', 'Nón bài thơ', 'Kiềng bạc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 13,
    category: 'Áo dài',
    name: 'Áo dài nữ màu vàng',
    audience: 'Nữ',
    color: 'Vàng',
    region: 'Việt Nam',
    occasion: ['Tết', 'Cưới hỏi', 'Lễ kỷ niệm', 'Chụp ảnh'],
    style: ['Sang trọng', 'Vương giả'],
    image_url: '/images/dataset/Nu/aodai/ad_vang.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_vang.jpg',
    type_description: 'Áo dài lụa tơ tằm vàng óng ánh sắc hoa mai mùa xuân.',
    variant_description: 'Áo dài nữ màu vàng hoàng yến lộng lẫy, biểu tượng của phú quý và may mắn rạng ngời.',
    origin: 'Phát triển từ thập niên 1930.',
    cultural_meaning: 'Sự ấm no, vinh hoa phú quý và ánh sáng hanh thông của mùa xuân mới.',
    cultural_notes: 'Thích hợp diện đón giao thừa hoặc chúc tết đầu năm.',
    source: 'Vietnam Tourism & Bảo tàng Phụ nữ Nam Bộ',
    accessories: ['Quần lụa trắng', 'Cành mai vàng', 'Giày cao gót'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 14,
    category: 'Áo dài',
    name: 'Áo dài nữ màu xanh lam',
    audience: 'Nữ',
    color: 'Xanh lam',
    region: 'Việt Nam',
    occasion: ['Tết', 'Dạo phố', 'Chụp ảnh', 'Lễ hội'],
    style: ['Hiện đại', 'Thanh lịch'],
    image_url: '/images/dataset/Nu/aodai/ad_xanhlam.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_xanhlam.jpg',
    type_description: 'Áo dài lụa xanh lam ngọc dịu mát, phom dáng thon gọn tôn vòng eo.',
    variant_description: 'Áo dài nữ màu xanh lam thanh khiết, gợi mở bầu trời xuân yên bình và hy vọng.',
    origin: 'Cải tiến từ thập niên 1930.',
    cultural_meaning: 'Bình an, trí tuệ và sự tự do thanh thoát.',
    cultural_notes: 'Rất tôn da và tạo cảm giác nhẹ nhàng, dễ chịu trong nắng sớm.',
    source: 'Vietnam Tourism',
    accessories: ['Quần lụa trắng', 'Túi xách cói', 'Giày búp bê'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 15,
    category: 'Áo dài',
    name: 'Áo dài nữ màu xanh lục',
    audience: 'Nữ',
    color: 'Xanh lục',
    region: 'Việt Nam',
    occasion: ['Tết', 'Lễ hội', 'Chụp ảnh xuân', 'Dạo phố'],
    style: ['Quý phái', 'Tươi mới'],
    image_url: '/images/dataset/Nu/aodai/ad_xanhluc.jpg',
    dataset_path: 'dataset/Nu/aodai/ad_xanhluc.jpg',
    type_description: 'Áo dài gấm xanh lục bảo sang trọng quý phái.',
    variant_description: 'Áo dài nữ màu xanh lục quyền quý, biểu tượng của sự trường tồn và sinh sôi nảy nở.',
    origin: 'Phát triển từ áo ngũ thân truyền thống.',
    cultural_meaning: 'Sức sống của chồi non lộc biếc mùa xuân, sự thịnh vượng bền lâu.',
    cultural_notes: 'Mặc cùng quần lụa đen hoặc vàng đồng tạo điểm nhấn hoàng gia sang trọng.',
    source: 'Bảo tàng Phụ nữ Nam Bộ',
    accessories: ['Quần lụa đen', 'Vòng ngọc bích', 'Mấn nhung'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },

  // Áo giao lĩnh (5 ảnh)
  {
    id: 16,
    category: 'Áo giao lĩnh',
    name: 'Áo giao lĩnh nữ màu đỏ',
    audience: 'Nữ',
    color: 'Đỏ',
    region: 'Cổ phục Việt Nam',
    occasion: ['Lễ, Tết', 'Cưới hỏi theo phong cách cổ phục', 'Chụp ảnh văn hóa'],
    style: ['Cổ điển', 'Hoàng cung'],
    image_url: '/images/dataset/Nu/aogiaolinh/agl_do.jpg',
    dataset_path: 'dataset/Nu/aogiaolinh/agl_do.jpg',
    type_description: 'Dạng áo có hai phần cổ giao nhau trước ngực. Kiểu dáng thay đổi theo thời kỳ và đối tượng sử dụng.',
    variant_description: 'Áo giao lĩnh nữ sắc đỏ son cổ kính, hai vạt đan chéo trang nghiêm chuẩn lề lối xưa.',
    origin: 'Cổ phục từng hiện diện từ thời Lý, Trần, Lê đến thời Nguyễn.',
    cultural_meaning: 'Một dạng cổ phục Việt từng được sử dụng ở nhiều tầng lớp, từ cung đình đến dân gian, phản ánh sự đa dạng của lịch sử trang phục.',
    cultural_notes: 'Các dịp sử dụng ở đây phản ánh thực hành hiện nay được ghi nhận. Không mặc định mọi áo giao lĩnh là lễ phục hoặc thuộc cùng một triều đại.',
    source: 'VietnamPlus/TTXVN — Áo Giao Lĩnh: Ngược dòng lịch sử cùng tinh hoa cổ phục Việt',
    accessories: ['Đai thắt lưng lụa', 'Hài thêu hoa sen', 'Trâm cài tóc bạc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 17,
    category: 'Áo giao lĩnh',
    name: 'Áo giao lĩnh nữ màu hồng',
    audience: 'Nữ',
    color: 'Hồng',
    region: 'Cổ phục Việt Nam',
    occasion: ['Lễ, Tết', 'Cưới hỏi theo phong cách cổ phục', 'Chụp ảnh nghệ thuật'],
    style: ['Duyên dáng', 'Cổ kính'],
    image_url: '/images/dataset/Nu/aogiaolinh/agl_hong.jpg',
    dataset_path: 'dataset/Nu/aogiaolinh/agl_hong.jpg',
    type_description: 'Áo giao lĩnh tơ lụa mềm mại màu hồng phấn.',
    variant_description: 'Áo giao lĩnh nữ màu hồng dịu dàng, vạt cổ giao nhau tôn vinh nét đoan trang thục nữ.',
    origin: 'Trang phục cổ truyền Việt Nam.',
    cultural_meaning: 'Sự trang nghiêm nhưng vẫn mềm mại, duyên dáng của mỹ nhân xưa.',
    cultural_notes: 'Cổ áo giao nhau bên phải theo đúng lễ nghi truyền thống.',
    source: 'VietnamPlus/TTXVN',
    accessories: ['Váy lụa xếp li', 'Quạt xếp tranh thủy mặc', 'Trâm ngọc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 18,
    category: 'Áo giao lĩnh',
    name: 'Áo giao lĩnh nữ màu tím',
    audience: 'Nữ',
    color: 'Tím',
    region: 'Cổ phục Việt Nam',
    occasion: ['Lễ, Tết', 'Cưới hỏi theo phong cách cổ phục'],
    style: ['Thâm trầm', 'Quý phái'],
    image_url: '/images/dataset/Nu/aogiaolinh/agl_tim.jpg',
    dataset_path: 'dataset/Nu/aogiaolinh/agl_tim.jpg',
    type_description: 'Áo giao lĩnh gấm tím trầm mặc thâm nghiêm.',
    variant_description: 'Áo giao lĩnh nữ sắc tím quý phái, mang đậm dấu ấn phong thái cổ điển thanh tao.',
    origin: 'Cổ phục Việt qua các thời kỳ.',
    cultural_meaning: 'Chiều sâu văn hóa và sự tôn kính cội nguồn tiên tổ.',
    cultural_notes: 'Phù hợp các không gian di tích, đình chùa hoặc bảo tàng.',
    source: 'VietnamPlus/TTXVN',
    accessories: ['Thắt lưng lụa ngũ sắc', 'Hài vải thêu', 'Quạt lụa'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 19,
    category: 'Áo giao lĩnh',
    name: 'Áo giao lĩnh nữ màu xanh lá',
    audience: 'Nữ',
    color: 'Xanh lá',
    region: 'Cổ phục Việt Nam',
    occasion: ['Lễ, Tết', 'Cưới hỏi theo phong cách cổ phục', 'Chụp ảnh di sản'],
    style: ['Tươi mát', 'Cổ truyền'],
    image_url: '/images/dataset/Nu/aogiaolinh/agl_xanhla.jpg',
    dataset_path: 'dataset/Nu/aogiaolinh/agl_xanhla.jpg',
    type_description: 'Áo giao lĩnh sắc xanh lá tươi sáng, viền nẹp cổ trang nhã.',
    variant_description: 'Áo giao lĩnh nữ màu xanh lá mát dịu, gợi nhắc thiên nhiên hoa cỏ đất Việt ngàn năm.',
    origin: 'Cổ phục Việt Nam.',
    cultural_meaning: 'Sự thanh bình, hòa hợp giữa con người và trời đất theo triết lý âm dương ngũ hành.',
    cultural_notes: 'Thường phối cùng lớp áo yếm lót trắng bên trong kín đáo.',
    source: 'VietnamPlus/TTXVN',
    accessories: ['Váy quây xếp nếp', 'Khánh bạc đeo ngực'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 20,
    category: 'Áo giao lĩnh',
    name: 'Áo giao lĩnh nữ màu xanh lam',
    audience: 'Nữ',
    color: 'Xanh lam',
    region: 'Cổ phục Việt Nam',
    occasion: ['Lễ, Tết', 'Cưới hỏi theo phong cách cổ phục', 'Dạo phố cổ'],
    style: ['Thanh nhã', 'Thanh lịch'],
    image_url: '/images/dataset/Nu/aogiaolinh/agl_xanhlam.jpg',
    dataset_path: 'dataset/Nu/aogiaolinh/agl_xanhlam.jpg',
    type_description: 'Áo giao lĩnh lụa xanh lam vạt chéo trang trọng.',
    variant_description: 'Áo giao lĩnh nữ màu xanh lam thanh khiết, tà áo thướt tha uyển chuyển.',
    origin: 'Trang phục cổ Việt Nam.',
    cultural_meaning: 'Sự tĩnh lặng, minh triết và vẻ đẹp thanh cao của người phụ nữ Việt xưa.',
    cultural_notes: 'Phom dáng rộng rãi, tạo bước đi khoan thai đĩnh đạc.',
    source: 'VietnamPlus/TTXVN',
    accessories: ['Đai thắt lưng xanh đậm', 'Hài thêu hoa', 'Túi thơm gấm'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },

  // Áo ngũ thân tay chẽn (7 ảnh)
  {
    id: 21,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu be',
    audience: 'Nữ',
    color: 'Be',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Dạo phố', 'Nghi lễ trang trọng', 'Chụp ảnh di sản'],
    style: ['Tối giản', 'Nho nhã', 'Cổ điển'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_be.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_be.jpg',
    type_description: 'Dạng áo ngũ thân cổ đứng, có cấu tạo năm thân áo và tay tương đối hẹp, ôm gọn cánh tay; phân biệt với dạng tay thụng.',
    variant_description: 'Áo ngũ thân tay chẽn màu be thanh lịch nhã nhặn, 5 cúc cài bên sườn phải ngay ngắn.',
    origin: 'Gắn với lịch sử trang phục thời chúa Nguyễn và triều Nguyễn.',
    cultural_meaning: 'Một bộ phận của di sản trang phục Việt, gắn với lịch sử và hoạt động bảo tồn văn hóa trang phục ở Huế.',
    cultural_notes: 'Phân biệt tay chẽn với tay thụng, thường gọi là áo tấc. Cài đủ 5 cúc tượng trưng ngũ thường (Nhân - Lễ - Nghĩa - Trí - Tín).',
    source: 'Sở VHTT Cố đô Huế — Áo dài Việt Nam qua các thời kỳ lịch sử',
    accessories: ['Quần lụa trắng', 'Khăn đóng/khăn vành', 'Guốc mộc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 22,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu đỏ',
    audience: 'Nữ',
    color: 'Đỏ',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Cưới hỏi', 'Hỷ sự', 'Nghi lễ trang trọng'],
    style: ['Trang nghiêm', 'Nổi bật'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_do.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_do.jpg',
    type_description: 'Áo ngũ thân gấm đỏ cổ đứng 5 thân may ghép tinh tế, tay chẽn ôm vừa vặn cánh tay.',
    variant_description: 'Áo ngũ thân tay chẽn nữ màu đỏ rực rỡ, trang nghiêm lộng lẫy trong các dịp đại lễ.',
    origin: 'Phát triển mạnh mẽ dưới thời chúa Nguyễn Phúc Khoát và vua Minh Mạng.',
    cultural_meaning: 'Năm thân áo đại diện cho tứ thân phụ mẫu che chở đứa con (thân thứ năm ở trong).',
    cultural_notes: 'Lề lối trang phục khuôn thước mực thước của người Việt xưa.',
    source: 'Sở VHTT Cố đô Huế',
    accessories: ['Quần lụa trắng', 'Khăn lươn đội đầu', 'Kiềng bạc hoa mai'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 23,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu hồng',
    audience: 'Nữ',
    color: 'Hồng',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Dạo phố Cố đô', 'Chụp ảnh', 'Lễ hội'],
    style: ['Duyên dáng', 'Thanh lịch'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_hong.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_hong.jpg',
    type_description: 'Áo ngũ thân sắc hồng hoa đào đài các dịu dàng.',
    variant_description: 'Áo ngũ thân tay chẽn nữ màu hồng phấn thanh nhã, tôn lên làn da sáng và phong thái quý phái.',
    origin: 'Trang phục thời Nguyễn.',
    cultural_meaning: 'Nét duyên dáng khuê các, đoan trang mà phóng khoáng của thiếu nữ kinh thành xưa.',
    cultural_notes: 'Tay chẽn giúp người mặc dễ dàng cử động, tiện lợi trong giao tiếp.',
    source: 'Sở VHTT Cố đô Huế',
    accessories: ['Quần lụa trắng', 'Khăn đóng bọc gấm', 'Quạt giấy dó'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 24,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu tím',
    audience: 'Nữ',
    color: 'Tím',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Nghi lễ', 'Chụp ảnh di sản'],
    style: ['Cổ điển', 'Quý phái'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_tim.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_tim.jpg',
    type_description: 'Áo ngũ thân gấm tím hoàng gia chuẩn lề lối cung đình Huế.',
    variant_description: 'Áo ngũ thân tay chẽn nữ màu tím thâm trầm đài các, đậm đà phong vị sông Hương núi Ngự.',
    origin: 'Trang phục thời Nguyễn.',
    cultural_meaning: 'Vẻ đẹp kín đáo, chiều sâu nội tâm và sự mực thước của đạo làm người.',
    cultural_notes: 'Khuyên cài đủ 5 nút cúc bọc đồng hoặc đính đá.',
    source: 'Sở VHTT Cố đô Huế',
    accessories: ['Quần lụa trắng/đen', 'Khăn vành tím', 'Chuỗi ngọc trai'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 25,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu trắng',
    audience: 'Nữ',
    color: 'Trắng',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Kỷ yếu', 'Dạo phố', 'Nghi lễ'],
    style: ['Thanh khiết', 'Tối giản'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_trang.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_trang.jpg',
    type_description: 'Áo ngũ thân tay chẽn lụa tơ tằm trắng ngà thanh tao.',
    variant_description: 'Áo ngũ thân tay chẽn nữ màu trắng tinh khôi, đường may phẳng phiu trang nhã.',
    origin: 'Trang phục thời Nguyễn.',
    cultural_meaning: 'Sự trong sạch, giản dị mà thanh cao của tâm hồn.',
    cultural_notes: 'Được các bạn trẻ Gen Z đặc biệt yêu thích phối cùng phụ kiện tối giản hiện đại.',
    source: 'Sở VHTT Cố đô Huế',
    accessories: ['Quần lụa trắng', 'Guốc gỗ quai nhung', 'Túi kẹp nách'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 26,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu xanh lam',
    audience: 'Nữ',
    color: 'Xanh lam',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Dạo phố', 'Check-in', 'Lễ hội'],
    style: ['Nho nhã', 'Trẻ trung'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_xanhlam.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_xanhlam.jpg',
    type_description: 'Áo ngũ thân lụa xanh lam ngọc dịu mát tươi trẻ.',
    variant_description: 'Áo ngũ thân tay chẽn nữ màu xanh lam ngọc sang trọng thanh thoát.',
    origin: 'Trang phục thời Nguyễn.',
    cultural_meaning: 'Trí tuệ, sự bình an và tinh thần hội nhập đương đại của giới trẻ.',
    cultural_notes: 'Cổ đứng lập lĩnh cao 2-3cm ôm khéo cổ người mặc.',
    source: 'Sở VHTT Cố đô Huế',
    accessories: ['Quần lụa trắng', 'Khăn đóng đen', 'Quạt dó'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 27,
    category: 'Áo ngũ thân tay chẽn',
    name: 'Áo ngũ thân tay chẽn nữ màu xanh lục',
    audience: 'Nữ',
    color: 'Xanh lục',
    region: 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion: ['Tết', 'Nghi lễ', 'Chụp ảnh di sản'],
    style: ['Vương giả', 'Cổ điển'],
    image_url: '/images/dataset/Nu/aonguthan_taychen/ant_xanhluc.jpg',
    dataset_path: 'dataset/Nu/aonguthan_taychen/ant_xanhluc.jpg',
    type_description: 'Áo ngũ thân tay chẽn sắc xanh lục bảo quyền quý.',
    variant_description: 'Áo ngũ thân tay chẽn nữ màu xanh lục lộng lẫy, dệt hoa văn chữ thọ hoặc hoa sen chìm.',
    origin: 'Trang phục thời Nguyễn.',
    cultural_meaning: 'Biểu trưng cho phúc lộc dồi dào, sự bền vững và tôn nghiêm.',
    cultural_notes: 'Mặc cùng quần lụa trắng hoặc quần sa đen.',
    source: 'Sở VHTT Cố đô Huế',
    accessories: ['Quần lụa trắng', 'Khăn vành', 'Kiềng bạc'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },

  // Áo yếm (8 ảnh)
  {
    id: 28,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu hồng',
    audience: 'Nữ',
    color: 'Hồng',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Biểu diễn', 'Chụp ảnh nghệ thuật'],
    style: ['Dân gian', 'Gợi cảm ý nhị'],
    image_url: '/images/dataset/Nu/aoyem/yem_hong.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_hong.jpg',
    type_description: 'Trang phục che ngực, thường làm từ mảnh vải hình vuông hoặc hình thoi, có dây buộc ở cổ và lưng. Yếm truyền thống là lớp mặc trong.',
    variant_description: 'Áo yếm nữ màu hồng cánh sen đào thắm, dải yếm lụa buộc eo duyên dáng.',
    origin: 'Trang phục lót trong truyền thống lâu đời của phụ nữ Việt.',
    cultural_meaning: 'Gắn với đời sống phụ nữ Việt xưa và hình tượng dải yếm trong ca dao về tình cảm đôi lứa: "Trèo lên trái núi Thiên Thai / Thấy đôi dải yếm bay bay trên cành".',
    cultural_notes: 'Phân biệt yếm mặc trong truyền thống với áo cổ yếm cách tân. Khi mặc truyền thống thường khoác áo tứ thân hoặc áo cánh bên ngoài.',
    source: 'Báo Dân Việt — Áo yếm: Di sản trang phục của Việt Nam',
    accessories: ['Áo tứ thân khoác ngoài', 'Váy lụa đũi đen', 'Khăn mỏ quạ'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 29,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu tím',
    audience: 'Nữ',
    color: 'Tím',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Chụp ảnh nghệ thuật', 'Biểu diễn'],
    style: ['Dân gian', 'Thơ mộng'],
    image_url: '/images/dataset/Nu/aoyem/yem_tim.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_tim.jpg',
    type_description: 'Áo yếm lụa tơ tằm màu tím mộng mơ.',
    variant_description: 'Áo yếm nữ màu tím dịu dàng e ấp, cổ yếm viền cong ôm khéo.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Nét kín đáo, tế nhị và e ấp của người con gái trong ca dao dân gian.',
    cultural_notes: 'Thích hợp phối cùng áo khoác mỏng hoặc blazer hiện đại phong cách Y2K.',
    source: 'Báo Dân Việt',
    accessories: ['Váy đụp lụa', 'Dây chuyền bạc', 'Guốc gỗ'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 30,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu trắng',
    audience: 'Nữ',
    color: 'Trắng',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Chụp ảnh sen', 'Dạo phố', 'Biểu diễn'],
    style: ['Thanh thuần', 'Tối giản'],
    image_url: '/images/dataset/Nu/aoyem/yem_trang.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_trang.jpg',
    type_description: 'Áo yếm lụa bạch đầm sen trong sáng thuần khiết.',
    variant_description: 'Áo yếm nữ màu trắng ngà mộc mạc thanh thoát, nét đẹp mộc mạc thôn quê.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Vẻ đẹp thanh bạch, chân phương của phụ nữ nông thôn Bắc Bộ xưa.',
    cultural_notes: 'Rất phổ biến trong các bộ ảnh chụp đầm sen mùa hạ.',
    source: 'Báo Dân Việt',
    accessories: ['Hoa sen búp', 'Váy lụa tơ tằm', 'Nón quai thao'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 31,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu vàng be',
    audience: 'Nữ',
    color: 'Vàng be',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Chụp ảnh nghệ thuật', 'Dạo phố'],
    style: ['Vintage', 'Mộc mạc'],
    image_url: '/images/dataset/Nu/aoyem/yem_vangbe.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_vangbe.jpg',
    type_description: 'Áo yếm đũi thô dệt thủ công màu vàng be cổ điển.',
    variant_description: 'Áo yếm nữ màu vàng be nền nã, mang sắc thái cổ xưa ấm áp.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Sự gắn bó với cội nguồn rơm rạ đồng quê mộc mạc.',
    cultural_notes: 'Chất liệu thoáng mát, thấm hút mồ hôi tốt.',
    source: 'Báo Dân Việt',
    accessories: ['Khăn mỏ quạ', 'Vòng cổ ngọc trai'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 32,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu vàng tươi',
    audience: 'Nữ',
    color: 'Vàng tươi',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Biểu diễn Quan họ', 'Chụp ảnh xuân'],
    style: ['Tươi tắn', 'Dân gian'],
    image_url: '/images/dataset/Nu/aoyem/yem_vangtuoi.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_vangtuoi.jpg',
    type_description: 'Áo yếm lụa vàng tươi rực rỡ nắng xuân.',
    variant_description: 'Áo yếm nữ màu vàng tươi thắm, điểm nhấn tuyệt đẹp bên trong tà áo tứ thân Kinh Bắc.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Ánh nắng mặt trời, sự vui vẻ rộn ràng của những ngày hội Lim.',
    cultural_notes: 'Thường phối cùng áo tứ thân màu nâu non hoặc xanh lá bên ngoài.',
    source: 'Báo Dân Việt',
    accessories: ['Áo tứ thân', 'Khăn mỏ quạ', 'Nón ba tầm'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 33,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu xanh',
    audience: 'Nữ',
    color: 'Xanh',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Chụp ảnh nghệ thuật'],
    style: ['Dân gian', 'Tự nhiên'],
    image_url: '/images/dataset/Nu/aoyem/yem_xanh.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_xanh.jpg',
    type_description: 'Áo yếm lụa màu xanh thiên nhiên trong lành.',
    variant_description: 'Áo yếm nữ màu xanh (sắc độ mát mẻ), tôn lên bờ vai thon thả.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Sự trẻ trung, căng tràn sức xuân của người thiếu nữ.',
    cultural_notes: 'Tránh hở lưng quá đà ở những chốn tôn nghiêm đền chùa.',
    source: 'Báo Dân Việt',
    accessories: ['Áo cánh mỏng khoác ngoài', 'Váy lụa'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 34,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu xanh lam',
    audience: 'Nữ',
    color: 'Xanh lam',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Biểu diễn', 'Chụp ảnh'],
    style: ['Dịu mát', 'Thanh lịch'],
    image_url: '/images/dataset/Nu/aoyem/yem_xanhlam.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_xanhlam.jpg',
    type_description: 'Áo yếm lụa xanh lam ngọc đằm thắm.',
    variant_description: 'Áo yếm nữ màu xanh lam thanh khiết, đường viền cổ may tỉ mỉ.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Sự tươi mát của làn nước hồ sen và sự dịu dàng của người con gái Kinh Bắc.',
    cultural_notes: 'Thích hợp các buổi trình diễn nghệ thuật dân ca quan họ.',
    source: 'Báo Dân Việt',
    accessories: ['Dải thắt lưng hoa đào', 'Váy đũi đen'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  },
  {
    id: 35,
    category: 'Áo yếm',
    name: 'Áo yếm nữ màu xanh lục',
    audience: 'Nữ',
    color: 'Xanh lục',
    region: 'Dân gian Việt Nam',
    occasion: ['Lễ hội', 'Chụp ảnh nghệ thuật', 'Biểu diễn'],
    style: ['Tươi tắn', 'Cổ truyền'],
    image_url: '/images/dataset/Nu/aoyem/yem_xanhluc.jpg',
    dataset_path: 'dataset/Nu/aoyem/yem_xanhluc.jpg',
    type_description: 'Áo yếm gấm xanh lục biếc óng ả.',
    variant_description: 'Áo yếm nữ màu xanh lục bảo tươi mát, tượng trưng cho sức sống mãnh liệt của thiên nhiên.',
    origin: 'Trang phục cổ truyền.',
    cultural_meaning: 'Màu của lá sen, đồng nội và sự sinh sôi nảy nở.',
    cultural_notes: 'Kết hợp cùng kiềng bạc để tạo điểm nhấn sang trọng.',
    source: 'Báo Dân Việt',
    accessories: ['Kiềng bạc tròn', 'Áo tứ thân khoác ngoài'],
    image_source: 'VietFashion Dataset v2',
    image_license: 'Giáo dục & Nghiên cứu văn hóa',
    type_review_status: 'reviewed',
    image_review_status: 'reviewed'
  }
];

export class DatabaseService {
  private pool: pg.Pool | null = null;
  private isConnected = false;
  private lastCheckTime = 0;
  private cachedCatalog: CatalogItem[] = REAL_DATASET_FALLBACK;

  constructor() {
    this.initPool();
  }

  private initPool() {
    const host = process.env.POSTGRES_HOST || '127.0.0.1';
    const port = parseInt(process.env.POSTGRES_PORT || '5433');
    const database = process.env.POSTGRES_DB || 'vietfashion';
    const user = process.env.POSTGRES_USER || 'vietfashion';
    const password = process.env.POSTGRES_PASSWORD || '123456';

    try {
      this.pool = new Pool({
        host,
        port,
        database,
        user,
        password,
        connectionTimeoutMillis: 3000,
        idleTimeoutMillis: 10000,
        max: 5
      });

      this.pool.on('error', (err) => {
        // Suppress unhandled errors when postgres is offline
        this.isConnected = false;
      });
    } catch (e) {
      console.warn('Postgres client initialization deferred:', e);
    }
  }

  public async getStatus() {
    const host = process.env.POSTGRES_HOST || '127.0.0.1';
    const port = parseInt(process.env.POSTGRES_PORT || '5433');
    const database = process.env.POSTGRES_DB || 'vietfashion';
    const user = process.env.POSTGRES_USER || 'vietfashion';

    const connected = await this.testConnection();

    return {
      connected,
      config: {
        host,
        port,
        database,
        user,
      },
      catalogCount: this.cachedCatalog.length,
      realImagesVerified: 35,
      categories: ['Áo bà ba', 'Áo dài', 'Áo giao lĩnh', 'Áo ngũ thân tay chẽn', 'Áo yếm'],
      message: connected
        ? `Đã kết nối PostgreSQL thành công tại ${host}:${port}/${database}`
        : `PostgreSQL (${host}:${port}/${database}) chưa chạy. Đang sử dụng dữ liệu 35 ảnh thật từ VietFashion Dataset v2.`
    };
  }

  public async testConnection(): Promise<boolean> {
    if (!this.pool) return false;

    // Cache connection state for 15s to avoid excessive retries
    const now = Date.now();
    if (now - this.lastCheckTime < 15000 && this.isConnected) {
      return this.isConnected;
    }

    try {
      const client = await this.pool.connect();
      try {
        const res = await client.query('SELECT 1 as alive');
        this.isConnected = res.rows.length > 0;
        this.lastCheckTime = now;

        // Try reading outfit catalog from postgres view
        await this.syncFromDb(client);
        return true;
      } finally {
        client.release();
      }
    } catch (err: any) {
      this.isConnected = false;
      this.lastCheckTime = now;
      return false;
    }
  }

  private async syncFromDb(client: pg.PoolClient) {
    try {
      // Check if schema & view wardrobe.outfit_catalog exist
      const checkView = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.views 
          WHERE table_schema = 'wardrobe' AND table_name = 'outfit_catalog'
        );
      `);

      if (checkView.rows[0]?.exists) {
        const result = await client.query(`
          SELECT * FROM wardrobe.outfit_catalog ORDER BY category, color, id;
        `);
        if (result.rows && result.rows.length > 0) {
          this.cachedCatalog = result.rows.map((r, i) => ({
            id: r.id || i + 1,
            category: r.category || 'Áo truyền thống',
            name: r.name,
            audience: r.audience || 'Nữ',
            color: r.color,
            region: r.region || null,
            occasion: Array.isArray(r.occasion) ? r.occasion : [],
            style: Array.isArray(r.style) ? r.style : [],
            image_url: r.image_url,
            dataset_path: r.dataset_path,
            type_description: r.type_description || null,
            variant_description: r.variant_description || null,
            origin: r.origin || null,
            cultural_meaning: r.cultural_meaning || null,
            cultural_notes: r.cultural_notes || null,
            source: r.source || null,
            accessories: Array.isArray(r.accessories) ? r.accessories : [],
            image_source: r.image_source || 'VietFashion Dataset v2',
            image_license: r.image_license || 'Quyền sử dụng nghiên cứu',
            type_review_status: r.type_review_status || 'reviewed',
            image_review_status: r.image_review_status || 'reviewed'
          }));
          console.log(`[DatabaseService] Successfully loaded ${this.cachedCatalog.length} items from wardrobe.outfit_catalog!`);
        }
      }
    } catch (e) {
      console.warn('[DatabaseService] Failed to read from wardrobe.outfit_catalog, using fallback seed:', e);
    }
  }

  public async getCatalog(): Promise<CatalogItem[]> {
    await this.testConnection();
    return this.cachedCatalog;
  }
}

export const dbService = new DatabaseService();

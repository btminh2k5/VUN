-- Chạy TOÀN BỘ file trong Query Tool của VUNdata bằng F5.
-- Cập nhật nội dung chung của đúng 5 loại áo; không thêm dòng hay sửa 35 ảnh.
-- Các cột dưới đây được thay bằng nội dung đã chọn, kể cả NULL/mảng rỗng.
-- Không sửa style vì chưa phân loại phong cách của các mẫu thực tế.
BEGIN;

DO $$
BEGIN
    IF (SELECT count(*) FROM wardrobe.garment_types
        WHERE code IN ('aobaba', 'aodai', 'aogiaolinh', 'aonguthan_taychen', 'aoyem')) <> 5 THEN
        RAISE EXCEPTION 'Chua du 5 loai ao. Hay chay 02_import_dataset.sql truoc.';
    END IF;
END;
$$;

UPDATE wardrobe.garment_types
SET description = 'Trang phục có thiết kế giản dị, dáng áo truyền thống tương đối rộng và thẳng, thuận tiện cho sinh hoạt. Các mẫu hiện đại có thể điều chỉnh eo, cổ và tay áo.',
    origin = NULL,
    cultural_meaning = 'Gắn với đời sống lao động, sinh hoạt và bản sắc văn hóa của cư dân Nam Bộ.',
    region = 'Nam Bộ, đặc biệt Đồng bằng sông Cửu Long',
    occasion = ARRAY['Sinh hoạt thường ngày', 'Lễ, Tết', 'Hoạt động cộng đồng'],
    cultural_notes = 'Các bối cảnh sử dụng được ghi nhận ở cấp loại trang phục; cần đối chiếu kiểu dáng từng mẫu trước khi gợi ý.',
    source = $src$Mô tả: Báo Cần Thơ — Thêm nét duyên khi diện áo bà ba
https://baocantho.com.vn/them-net-duyen-khi-dien-ao-ba-ba-a189137.html
Vùng và đời sống: Báo Cần Thơ — Trang phục của người Việt ở Đồng bằng Sông Cửu Long xưa
https://baocantho.com.vn/trang-phuc-cua-nguoi-viet-o-dong-bang-song-cuu-long-xua-a20250.html
Bối cảnh sử dụng: Báo Cần Thơ — Nghề may áo bà ba - giữ nét truyền thống
https://baocantho.com.vn/nghe-may-ao-ba-ba-giu-net-truyen-thong-a148351.html$src$,
    review_status = 'needs_review'
WHERE code = 'aobaba';

UPDATE wardrobe.garment_types
SET description = 'Áo dài hiện đại thường có hai tà trước và sau, mặc cùng quần dài. Kiểu cổ, tay, độ ôm và chiều dài tà thay đổi theo thiết kế.',
    origin = 'Áo dài hiện đại phát triển từ các dạng áo truyền thống, trong đó có áo ngũ thân. Những cải tiến của họa sĩ Nguyễn Cát Tường trong thập niên 1930 là một dấu mốc của quá trình phát triển này.',
    cultural_meaning = 'Một biểu tượng văn hóa Việt Nam, gắn với hình ảnh phụ nữ Việt và sự tiếp nối giữa truyền thống với thẩm mỹ hiện đại.',
    region = 'Việt Nam',
    occasion = ARRAY['Tết', 'Cưới hỏi', 'Lễ kỷ niệm', 'Chụp ảnh'],
    cultural_notes = 'Mục này dùng cho áo dài hiện đại, phân biệt với mục áo ngũ thân tay chẽn. Thông tin chung không xác nhận mọi mẫu trong dataset là mẫu lịch sử.',
    source = $src$Kiểu dáng, quá trình phát triển và bối cảnh sử dụng: Vietnam Tourism — Tất cả về áo dài
https://vietnam.travel/vi/things-to-do/all-about-ao-dai-vietnams-national-dress
Giá trị văn hóa và lịch sử phát triển: Bảo tàng Phụ nữ Nam Bộ — Bộ sưu tập áo dài phụ nữ Việt Nam
https://baotangphunu.com/b-su-tp-ao-dai-ph-n-vit-nam/$src$,
    review_status = 'needs_review'
WHERE code = 'aodai';

UPDATE wardrobe.garment_types
SET description = 'Dạng áo có hai phần cổ giao nhau trước ngực. Kiểu dáng thay đổi theo thời kỳ và đối tượng sử dụng.',
    origin = NULL,
    cultural_meaning = 'Một dạng cổ phục Việt từng được sử dụng ở nhiều tầng lớp, từ cung đình đến dân gian, phản ánh sự đa dạng của lịch sử trang phục.',
    region = NULL,
    occasion = ARRAY['Lễ, Tết', 'Cưới hỏi theo phong cách cổ phục'],
    cultural_notes = 'Các dịp sử dụng ở đây phản ánh thực hành hiện nay được báo chí ghi nhận. Không mặc định mọi áo giao lĩnh là lễ phục hoặc thuộc cùng một triều đại.',
    source = $src$Đặc điểm, vai trò và bối cảnh sử dụng hiện nay: VietnamPlus/TTXVN — Áo Giao Lĩnh: Ngược dòng lịch sử cùng tinh hoa cổ phục Việt
https://www.vietnamplus.vn/video-ao-giao-linh-nguoc-dong-lich-su-cung-tinh-hoa-co-phuc-viet-post609553.vnp$src$,
    review_status = 'needs_review'
WHERE code = 'aogiaolinh';

UPDATE wardrobe.garment_types
SET description = 'Dạng áo ngũ thân cổ đứng, có cấu tạo năm thân áo và tay tương đối hẹp, ôm gọn cánh tay; phân biệt với dạng tay thụng.',
    origin = 'Gắn với lịch sử trang phục thời chúa Nguyễn và triều Nguyễn.',
    cultural_meaning = 'Một bộ phận của di sản trang phục Việt, gắn với lịch sử và hoạt động bảo tồn văn hóa trang phục ở Huế.',
    region = 'Huế; không giới hạn phạm vi sử dụng ở Huế',
    occasion = ARRAY[]::TEXT[],
    cultural_notes = 'Phân biệt tay chẽn với tay thụng, thường gọi là áo tấc. Chưa gán sự kiện cụ thể khi chưa đối chiếu đủ nguồn cho dạng tay chẽn.',
    source = $src$Cấu tạo, bối cảnh lịch sử và liên hệ với Huế: Trang thông tin ngành văn hóa Huế — Áo dài Việt Nam qua các thời kỳ lịch sử
https://svhttdl.hue.gov.vn/tin-trong-nuoc/ao-dai-viet-nam-qua-cac-thoi-ky-lich-su-mot-trien-lam-khong-the-bo-qua.html$src$,
    review_status = 'needs_review'
WHERE code = 'aonguthan_taychen';

UPDATE wardrobe.garment_types
SET description = 'Trang phục che ngực, thường làm từ mảnh vải hình vuông hoặc hình thoi, có dây buộc ở cổ và lưng. Yếm truyền thống là lớp mặc trong.',
    origin = NULL,
    cultural_meaning = 'Gắn với đời sống phụ nữ Việt xưa và hình tượng dải yếm trong ca dao về tình cảm đôi lứa.',
    region = NULL,
    occasion = ARRAY[]::TEXT[],
    cultural_notes = 'Phân biệt yếm mặc trong truyền thống với áo cổ yếm cách tân. Chưa gán niên đại, vùng hoặc sự kiện cụ thể trong bản nhập này.',
    source = $src$Hình dạng, công dụng mặc trong và hình tượng ca dao: Báo Dân Việt — Áo yếm: Di sản trang phục của Việt Nam
https://danviet.vn/ao-yem-34di-san-trang-phuc34-cua-viet-nam-777760957-d211884.html
Chỉ sử dụng các nội dung nêu trên; không sử dụng nhận định về niên đại xuất hiện hoặc quy tắc màu sắc trong bài.$src$,
    review_status = 'needs_review'
WHERE code = 'aoyem';

COMMIT;

-- Sau khi chạy, Data Output hiển thị 5 dòng đã cập nhật.
SELECT code, name, description, origin, cultural_meaning, region,
       occasion, cultural_notes, source, review_status
FROM wardrobe.garment_types
WHERE code IN ('aobaba', 'aodai', 'aogiaolinh', 'aonguthan_taychen', 'aoyem')
ORDER BY name;

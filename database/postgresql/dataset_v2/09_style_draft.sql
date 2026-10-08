-- =============================================================================
-- BẢN NHÁP phân loại phong cách — KHÔNG tự động chạy khi khởi tạo database.
--
-- Nội dung dưới đây do Claude đề xuất, CHƯA được đối chiếu nguồn và CHƯA được
-- bạn xác nhận. Vì vậy:
--   * file này không nằm trong compose.yml / database/Dockerfile;
--   * review_status giữ nguyên 'needs_review', không nâng lên 'reviewed';
--   * 04_update_type_information.sql vẫn giữ nguyên tắc "không sửa style".
--
-- Bạn KHÔNG bắt buộc phải chạy file này. Engine đã xử lý được cột style rỗng:
-- nó bỏ tiêu chí phong cách ra khỏi công thức và chia lại 20% trọng số cho các
-- tiêu chí còn lại, đồng thời báo rõ trong score_basis.dimensions_missing.
-- Chạy file này chỉ để BẬT thêm tiêu chí phong cách, không phải để sửa lỗi.
--
-- Cách dùng: đọc, sửa lại cho đúng ý bạn, rồi chạy toàn bộ bằng F5.
--
-- Giá trị phải khớp với các lựa chọn phong cách ở giao diện Step 1:
--   Hiện đại · Tối giản · Cổ điển · Thanh lịch · Phá cách Y2K
-- (xem STYLE_MATCHES trong backend/app/engine.py)
-- =============================================================================
BEGIN;

DO $$
BEGIN
    IF (SELECT count(*) FROM wardrobe.garment_types
        WHERE code IN ('aobaba', 'aodai', 'aogiaolinh', 'aonguthan_taychen', 'aoyem')) <> 5 THEN
        RAISE EXCEPTION 'Chua du 5 loai ao. Hay chay 02_import_dataset.sql truoc.';
    END IF;
END;
$$;

-- Áo bà ba: phom giản dị, thuận tiện sinh hoạt; dễ mặc thường ngày và dạo phố.
UPDATE wardrobe.garment_types
SET style = ARRAY['Tối giản', 'Cổ điển']
WHERE code = 'aobaba';

-- Áo dài: loại có phổ phong cách rộng nhất, từ lễ nghi tới biến tấu hiện đại.
UPDATE wardrobe.garment_types
SET style = ARRAY['Thanh lịch', 'Hiện đại', 'Cổ điển']
WHERE code = 'aodai';

-- Áo giao lĩnh: cổ phục đan chéo, gắn với phục dựng trang phục lịch sử.
UPDATE wardrobe.garment_types
SET style = ARRAY['Cổ điển']
WHERE code = 'aogiaolinh';

-- Áo ngũ thân tay chẽn: khuôn thước, trang trọng; cũng được mặc theo hướng
-- tân cổ điển trong các hoạt động bảo tồn trang phục hiện nay.
UPDATE wardrobe.garment_types
SET style = ARRAY['Cổ điển', 'Thanh lịch']
WHERE code = 'aonguthan_taychen';

-- Áo yếm: truyền thống là lớp mặc trong; các cách phối hiện nay đa dạng hơn.
-- Đây là mục tôi kém chắc chắn nhất — bạn nên xem lại kỹ dòng này.
UPDATE wardrobe.garment_types
SET style = ARRAY['Cổ điển', 'Phá cách Y2K']
WHERE code = 'aoyem';

COMMIT;

-- Sau khi chạy, kiểm tra lại 5 dòng.
SELECT code, name, style, review_status
FROM wardrobe.garment_types
WHERE code IN ('aobaba', 'aodai', 'aogiaolinh', 'aonguthan_taychen', 'aoyem')
ORDER BY name;

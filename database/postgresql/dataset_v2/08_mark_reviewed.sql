-- =============================================================================
-- Đánh dấu dữ liệu đã kiểm duyệt. KHÔNG tự động chạy khi khởi tạo database.
--
-- Vì sao cần file này: trước đây không có đường nào để một dòng trở thành
-- 'reviewed'. Mọi dòng mắc ở 'needs_review'/'draft', nên badge "đã kiểm chứng"
-- trên giao diện không bao giờ có căn cứ, và query lọc theo reviewed luôn rỗng.
--
-- Cách dùng: ĐỌC nguồn trong cột source, đối chiếu với ảnh và nội dung, rồi
-- bỏ comment đúng dòng tương ứng. Duyệt từng mã một, đừng duyệt cả loạt.
-- =============================================================================
BEGIN;

-- --- Cấp loại trang phục: nội dung văn hoá dùng chung ---------------------
-- Chỉ duyệt khi đã đọc hết nguồn trong cột source của mã đó.
-- UPDATE wardrobe.garment_types SET review_status = 'reviewed' WHERE code = 'aobaba';
-- UPDATE wardrobe.garment_types SET review_status = 'reviewed' WHERE code = 'aodai';
-- UPDATE wardrobe.garment_types SET review_status = 'reviewed' WHERE code = 'aogiaolinh';
-- UPDATE wardrobe.garment_types SET review_status = 'reviewed' WHERE code = 'aonguthan_taychen';
-- UPDATE wardrobe.garment_types SET review_status = 'reviewed' WHERE code = 'aoyem';

-- --- Cấp ảnh: nhãn màu và kiểu dáng của từng file -------------------------
-- Duyệt theo loại sau khi đã xem từng ảnh:
-- UPDATE wardrobe.garment_variants v SET review_status = 'reviewed'
-- FROM wardrobe.garment_types t
-- WHERE t.id = v.garment_type_id AND t.code = 'aodai';

-- Hoặc duyệt đúng một ảnh:
-- UPDATE wardrobe.garment_variants SET review_status = 'reviewed'
-- WHERE dataset_path = 'dataset/aodai/ad_do.jpg';

-- --- Phụ kiện và giày dép -------------------------------------------------
-- Tên và phân loại suy ra từ tên thư mục, màu chưa ghi nhận. Duyệt từng món:
-- UPDATE wardrobe.styling_items SET review_status = 'reviewed'
-- WHERE dataset_path = 'dataset/accessories/nonla/nonla.jpg';

COMMIT;

-- Kiểm tra sau khi chạy: còn bao nhiêu dòng chưa duyệt.
SELECT 'garment_types' AS bang, review_status, count(*)
FROM wardrobe.garment_types GROUP BY review_status
UNION ALL
SELECT 'garment_variants', review_status, count(*)
FROM wardrobe.garment_variants GROUP BY review_status
UNION ALL
SELECT 'styling_items', review_status, count(*)
FROM wardrobe.styling_items GROUP BY review_status
ORDER BY bang, review_status;

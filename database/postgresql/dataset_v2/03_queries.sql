-- All types and counts, including drafts.
SELECT t.id, t.name, count(v.id) AS number_of_images
FROM wardrobe.garment_types t
LEFT JOIN wardrobe.garment_variants v ON v.garment_type_id = t.id
GROUP BY t.id, t.name ORDER BY t.name;

-- Inspect the whole dataset in one table.
SELECT * FROM wardrobe.outfit_catalog ORDER BY category, color, id;

-- Inspect just one garment type.
SELECT * FROM wardrobe.outfit_catalog
WHERE category = 'Áo bà ba' ORDER BY color, id;

-- Tiến độ kiểm duyệt. Query cũ ("chỉ lấy hàng đã reviewed") luôn trả 0 dòng
-- vì chưa có gì được duyệt, nên không nói cho bạn biết điều gì. Báo cáo này
-- cho thấy còn bao nhiêu phải duyệt và đang nằm ở trạng thái nào.
SELECT t.review_status AS trang_thai_loai,
       v.review_status AS trang_thai_anh,
       count(*) AS so_dong
FROM wardrobe.garment_variants v
JOIN wardrobe.garment_types t ON t.id = v.garment_type_id
GROUP BY t.review_status, v.review_status
ORDER BY so_dong DESC;

-- Cột nào đang trống hoàn toàn — dùng để biết engine đang thiếu tiêu chí nào.
SELECT count(*) FILTER (WHERE style = '{}') AS loai_thieu_style,
       count(*) FILTER (WHERE occasion = '{}') AS loai_thieu_occasion,
       count(*) FILTER (WHERE era IS NULL) AS loai_thieu_era,
       count(*) FILTER (WHERE material IS NULL) AS loai_thieu_material,
       count(*) FILTER (WHERE do_notes = '{}') AS loai_thieu_do_notes,
       count(*) AS tong_so_loai
FROM wardrobe.garment_types;

-- Hàng đã duyệt đủ cả hai cấp (dùng cho website khi đã có dữ liệu duyệt).
SELECT * FROM wardrobe.outfit_catalog
WHERE type_review_status = 'reviewed' AND image_review_status = 'reviewed';

-- Example only: replace content with researched information before uncommenting.
/*
UPDATE wardrobe.garment_types
SET description = 'Mô tả đã kiểm chứng',
    origin = 'Nguồn gốc có tài liệu hỗ trợ',
    cultural_meaning = 'Ý nghĩa có tài liệu hỗ trợ',
    source = 'Tên tài liệu, tác giả, URL hoặc số trang',
    review_status = 'needs_review'
WHERE code = 'aobaba';

UPDATE wardrobe.garment_variants
SET image_source = 'Nguồn ảnh thực tế', image_license = 'Quyền sử dụng đã xác minh'
WHERE dataset_path = 'dataset/aobaba/BB_do.jpg';
*/

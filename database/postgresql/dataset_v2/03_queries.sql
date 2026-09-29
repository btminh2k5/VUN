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

-- Website: both shared cultural content and image labels must be reviewed.
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
WHERE dataset_path = 'dataset/Nu/aobaba/BB_do.jpg';
*/

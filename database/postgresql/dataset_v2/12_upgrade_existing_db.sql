-- Chạy MỘT LẦN trên database Docker được tạo trước bản main c79d792.
-- Giữ nguyên 35 mẫu áo, 25 phụ kiện và metadata đã nhập.
-- Giao dịch sẽ rollback toàn bộ nếu đường dẫn mới trùng khóa hoặc view có phụ thuộc.
BEGIN;

ALTER TABLE wardrobe.garment_types
    ADD COLUMN IF NOT EXISTS era TEXT,
    ADD COLUMN IF NOT EXISTS material TEXT,
    ADD COLUMN IF NOT EXISTS do_notes TEXT[] NOT NULL DEFAULT '{}',
    ADD COLUMN IF NOT EXISTS dont_notes TEXT[] NOT NULL DEFAULT '{}';

UPDATE wardrobe.garment_variants
SET dataset_path = replace(dataset_path, 'dataset/Nu/', 'dataset/'),
    image_url = replace(image_url, '/images/dataset/Nu/', '/images/dataset/')
WHERE dataset_path LIKE 'dataset/Nu/%';

DROP VIEW wardrobe.outfit_catalog;
CREATE VIEW wardrobe.outfit_catalog AS
SELECT v.id, t.name AS category, v.name, v.color,
       t.region, t.occasion, t.style, v.image_url, v.dataset_path,
       t.description AS type_description, v.description AS variant_description,
       t.origin, t.era, t.material, t.do_notes, t.dont_notes,
       t.cultural_meaning, t.cultural_notes, t.source,
       v.accessories, v.image_source, v.image_license,
       t.review_status AS type_review_status, v.review_status AS image_review_status
FROM wardrobe.garment_variants v
JOIN wardrobe.garment_types t ON t.id = v.garment_type_id;

COMMIT;
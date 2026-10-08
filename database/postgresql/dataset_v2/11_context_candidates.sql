-- BẢN ĐỀ XUẤT về phong cách và bối cảnh phối đồ; nhóm cần duyệt trước khi chạy.
-- Không được Docker tự động nạp. So sánh với 09_style_draft.sql trước khi áp dụng.
BEGIN;
UPDATE wardrobe.garment_types SET style = CASE code
  WHEN 'aobaba' THEN ARRAY['Tối giản']::TEXT[]
  WHEN 'aodai' THEN ARRAY['Thanh lịch','Hiện đại']::TEXT[]
  WHEN 'aogiaolinh' THEN ARRAY['Cổ điển']::TEXT[]
  WHEN 'aonguthan_taychen' THEN ARRAY['Cổ điển']::TEXT[]
  WHEN 'aoyem' THEN ARRAY['Hiện đại']::TEXT[] END
WHERE cardinality(style)=0 AND code IN ('aobaba','aodai','aogiaolinh','aonguthan_taychen','aoyem');
UPDATE wardrobe.garment_types SET occasion=ARRAY['Lễ hội']::TEXT[]
WHERE code='aonguthan_taychen' AND cardinality(occasion)=0;
-- Nhãn Dạo phố là gợi ý phối đồ cho bộ ảnh cổ yếm cách tân, không phải nhận định lịch sử.
UPDATE wardrobe.garment_types SET occasion=ARRAY['Dạo phố']::TEXT[]
WHERE code='aoyem' AND cardinality(occasion)=0;
COMMIT;

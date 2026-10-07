-- Generated accessories/footwear labels from directory names; all new rows are draft.
-- Unknown color, origin and image sources are intentionally left NULL.
-- Existing rows are preserved on rerun, except old auto-generated slug suffixes in names.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'bongtai', 'Bông tai', 'Bông tai', 'dataset/accessories/bongtai/bongtai.jpg', '/images/dataset/accessories/bongtai/bongtai.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'daylung', 'Dây lưng', 'Dây lưng', 'dataset/accessories/daylung/daylung.jpg', '/images/dataset/accessories/daylung/daylung.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'keptoc', 'Kẹp tóc', 'Kẹp tóc', 'dataset/accessories/keptoc/keptoc.jpg', '/images/dataset/accessories/keptoc/keptoc.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'khanlua', 'Khăn lụa', 'Khăn lụa', 'dataset/accessories/khanlua/khanlua.jpg', '/images/dataset/accessories/khanlua/khanlua.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'khanmoqua', 'Khăn mỏ quạ', 'Khăn mỏ quạ', 'dataset/accessories/khanmoqua/khanmoqua.jpg', '/images/dataset/accessories/khanmoqua/khanmoqua.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'khanran', 'Khăn rằn', 'Khăn rằn', 'dataset/accessories/khanran/khanran.jpg', '/images/dataset/accessories/khanran/khanran.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'luoccaitoc', 'Lược cài tóc', 'Lược cài tóc', 'dataset/accessories/luoccaitoc/luocaitoc.jpg', '/images/dataset/accessories/luoccaitoc/luocaitoc.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'nonla', 'Nón lá', 'Nón lá', 'dataset/accessories/nonla/nonla.jpg', '/images/dataset/accessories/nonla/nonla.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'nonquaithao', 'Nón quai thao', 'Nón quai thao', 'dataset/accessories/nonquaithao/nonquaithao.jpg', '/images/dataset/accessories/nonquaithao/nonquaithao.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'quatgiay', 'Quạt giấy', 'Quạt giấy', 'dataset/accessories/quatgiay/quatgiay.jpg', '/images/dataset/accessories/quatgiay/quatgiay.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'quatlua', 'Quạt lụa', 'Quạt lụa', 'dataset/accessories/quatlua/quatlua.jpg', '/images/dataset/accessories/quatlua/quatlua.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'tramcaitoc', 'Trâm cài tóc', 'Trâm cài tóc', 'dataset/accessories/tramcaitoc/tramcaitoc.jpg', '/images/dataset/accessories/tramcaitoc/tramcaitoc.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'tuicoi', 'Túi cói', 'Túi cói', 'dataset/accessories/tuicoi/tuicoi.jpg', '/images/dataset/accessories/tuicoi/tuicoi.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'tuidayrut', 'Túi dây rút', 'Túi dây rút', 'dataset/accessories/tuidayrut/tuidayrut.jpg', '/images/dataset/accessories/tuidayrut/tuidayrut.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'tuimay', 'Túi mây', 'Túi mây', 'dataset/accessories/tuimay/tuimay.jpg', '/images/dataset/accessories/tuimay/tuimay.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'tuivai', 'Túi vải', 'Túi vải', 'dataset/accessories/tuivai/tuivai.jpg', '/images/dataset/accessories/tuivai/tuivai.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'tuixachnho', 'Túi xách nhỏ', 'Túi xách nhỏ', 'dataset/accessories/tuixachnho/tuixachnho.jpg', '/images/dataset/accessories/tuixachnho/tuixachnho.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'vongco', 'Vòng cổ', 'Vòng cổ', 'dataset/accessories/vongco/vongco.jpg', '/images/dataset/accessories/vongco/vongco.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('accessories', 'vongtay', 'Vòng tay', 'Vòng tay', 'dataset/accessories/vongtay/vongtay.jpg', '/images/dataset/accessories/vongtay/vongtay.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('footwear', 'depquaingang', 'Dép quai ngang', 'Dép quai ngang', 'dataset/footwear/depquaingang/depquaingang.jpg', '/images/dataset/footwear/depquaingang/depquaingang.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('footwear', 'giaybupbe', 'Giày búp bê', 'Giày búp bê', 'dataset/footwear/giaybupbe/giaybupbe.jpg', '/images/dataset/footwear/giaybupbe/giaybupbe.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('footwear', 'giaycaogot', 'Giày cao gót', 'Giày cao gót', 'dataset/footwear/giaycaogot/giaycaogot.jpg', '/images/dataset/footwear/giaycaogot/giaycaogot.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('footwear', 'giaythethao', 'Giày thể thao', 'Giày thể thao', 'dataset/footwear/giaythethao/giaythethao.jpg', '/images/dataset/footwear/giaythethao/giaythethao.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('footwear', 'guocmoc', 'Guốc mộc', 'Guốc mộc', 'dataset/footwear/guocmoc/guocmoc.jpg', '/images/dataset/footwear/guocmoc/guocmoc.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.styling_items (item_group, type_code, category, name, dataset_path, image_url)
VALUES ('footwear', 'sandal', 'Sandal', 'Sandal', 'dataset/footwear/sandal/sandal.jpg', '/images/dataset/footwear/sandal/sandal.jpg')
ON CONFLICT (dataset_path) DO NOTHING;
UPDATE wardrobe.styling_items
SET name = category
WHERE name = category || ' — ' || split_part(split_part(dataset_path, '/', 4), '.', 1);
COMMIT;

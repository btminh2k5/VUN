-- Generated from dataset folder names, NOT verified image or cultural labels.
-- Rerunnable: existing rows are preserved by code/dataset_path.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO wardrobe.garment_types (code, name) VALUES
('aobaba', 'Áo bà ba'),
('aodai', 'Áo dài'),
('aogiaolinh', 'Áo giao lĩnh'),
('aonguthan_taychen', 'Áo ngũ thân tay chẽn'),
('aoyem', 'Áo yếm')
ON CONFLICT (code) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_Tim.jpg', 'Áo bà ba nữ màu tím', 'Nữ', 'Tím', '/images/dataset/Nu/aobaba/BB_Tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_cam.jpg', 'Áo bà ba nữ màu cam', 'Nữ', 'Cam', '/images/dataset/Nu/aobaba/BB_cam.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_do.jpg', 'Áo bà ba nữ màu đỏ', 'Nữ', 'Đỏ', '/images/dataset/Nu/aobaba/BB_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_hong.jpg', 'Áo bà ba nữ màu hồng', 'Nữ', 'Hồng', '/images/dataset/Nu/aobaba/BB_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_nau.jpg', 'Áo bà ba nữ màu nâu', 'Nữ', 'Nâu', '/images/dataset/Nu/aobaba/BB_nau.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_trang.jpg', 'Áo bà ba nữ màu trắng', 'Nữ', 'Trắng', '/images/dataset/Nu/aobaba/BB_trang.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_xanhcom.jpg', 'Áo bà ba nữ màu xanh cốm', 'Nữ', 'Xanh cốm', '/images/dataset/Nu/aobaba/BB_xanhcom.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aobaba/BB_xanhlam.jpg', 'Áo bà ba nữ màu xanh lam', 'Nữ', 'Xanh lam', '/images/dataset/Nu/aobaba/BB_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_cam.jpg', 'Áo dài nữ màu cam', 'Nữ', 'Cam', '/images/dataset/Nu/aodai/ad_cam.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_do.jpg', 'Áo dài nữ màu đỏ', 'Nữ', 'Đỏ', '/images/dataset/Nu/aodai/ad_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_hong.jpg', 'Áo dài nữ màu hồng', 'Nữ', 'Hồng', '/images/dataset/Nu/aodai/ad_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_tim.jpg', 'Áo dài nữ màu tím', 'Nữ', 'Tím', '/images/dataset/Nu/aodai/ad_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_vang.jpg', 'Áo dài nữ màu vàng', 'Nữ', 'Vàng', '/images/dataset/Nu/aodai/ad_vang.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_xanhlam.jpg', 'Áo dài nữ màu xanh lam', 'Nữ', 'Xanh lam', '/images/dataset/Nu/aodai/ad_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aodai/ad_xanhluc.jpg', 'Áo dài nữ màu xanh lục', 'Nữ', 'Xanh lục', '/images/dataset/Nu/aodai/ad_xanhluc.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aogiaolinh/agl_do.jpg', 'Áo giao lĩnh nữ màu đỏ', 'Nữ', 'Đỏ', '/images/dataset/Nu/aogiaolinh/agl_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aogiaolinh/agl_hong.jpg', 'Áo giao lĩnh nữ màu hồng', 'Nữ', 'Hồng', '/images/dataset/Nu/aogiaolinh/agl_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aogiaolinh/agl_tim.jpg', 'Áo giao lĩnh nữ màu tím', 'Nữ', 'Tím', '/images/dataset/Nu/aogiaolinh/agl_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aogiaolinh/agl_xanhla.jpg', 'Áo giao lĩnh nữ màu xanh lá', 'Nữ', 'Xanh lá', '/images/dataset/Nu/aogiaolinh/agl_xanhla.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aogiaolinh/agl_xanhlam.jpg', 'Áo giao lĩnh nữ màu xanh lam', 'Nữ', 'Xanh lam', '/images/dataset/Nu/aogiaolinh/agl_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_be.jpg', 'Áo ngũ thân tay chẽn nữ màu be', 'Nữ', 'Be', '/images/dataset/Nu/aonguthan_taychen/ant_be.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_do.jpg', 'Áo ngũ thân tay chẽn nữ màu đỏ', 'Nữ', 'Đỏ', '/images/dataset/Nu/aonguthan_taychen/ant_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_hong.jpg', 'Áo ngũ thân tay chẽn nữ màu hồng', 'Nữ', 'Hồng', '/images/dataset/Nu/aonguthan_taychen/ant_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_tim.jpg', 'Áo ngũ thân tay chẽn nữ màu tím', 'Nữ', 'Tím', '/images/dataset/Nu/aonguthan_taychen/ant_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_trang.jpg', 'Áo ngũ thân tay chẽn nữ màu trắng', 'Nữ', 'Trắng', '/images/dataset/Nu/aonguthan_taychen/ant_trang.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_xanhlam.jpg', 'Áo ngũ thân tay chẽn nữ màu xanh lam', 'Nữ', 'Xanh lam', '/images/dataset/Nu/aonguthan_taychen/ant_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aonguthan_taychen/ant_xanhluc.jpg', 'Áo ngũ thân tay chẽn nữ màu xanh lục', 'Nữ', 'Xanh lục', '/images/dataset/Nu/aonguthan_taychen/ant_xanhluc.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_hong.jpg', 'Áo yếm nữ màu hồng', 'Nữ', 'Hồng', '/images/dataset/Nu/aoyem/yem_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_tim.jpg', 'Áo yếm nữ màu tím', 'Nữ', 'Tím', '/images/dataset/Nu/aoyem/yem_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_trang.jpg', 'Áo yếm nữ màu trắng', 'Nữ', 'Trắng', '/images/dataset/Nu/aoyem/yem_trang.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_vangbe.jpg', 'Áo yếm nữ màu vàng be', 'Nữ', 'Vàng be', '/images/dataset/Nu/aoyem/yem_vangbe.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_vangtuoi.jpg', 'Áo yếm nữ màu vàng tươi', 'Nữ', 'Vàng tươi', '/images/dataset/Nu/aoyem/yem_vangtuoi.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_xanh.jpg', 'Áo yếm nữ màu xanh (chưa xác định sắc độ)', 'Nữ', 'Xanh (chưa xác định sắc độ)', '/images/dataset/Nu/aoyem/yem_xanh.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_xanhlam.jpg', 'Áo yếm nữ màu xanh lam', 'Nữ', 'Xanh lam', '/images/dataset/Nu/aoyem/yem_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, audience, color, image_url)
SELECT id, 'dataset/Nu/aoyem/yem_xanhluc.jpg', 'Áo yếm nữ màu xanh lục', 'Nữ', 'Xanh lục', '/images/dataset/Nu/aoyem/yem_xanhluc.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
COMMIT;

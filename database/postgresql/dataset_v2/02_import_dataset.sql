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
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_Tim.jpg', 'Áo bà ba màu tím', 'Tím', '/images/dataset/aobaba/BB_Tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_cam.jpg', 'Áo bà ba màu cam', 'Cam', '/images/dataset/aobaba/BB_cam.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_do.jpg', 'Áo bà ba màu đỏ', 'Đỏ', '/images/dataset/aobaba/BB_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_hong.jpg', 'Áo bà ba màu hồng', 'Hồng', '/images/dataset/aobaba/BB_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_nau.jpg', 'Áo bà ba màu nâu', 'Nâu', '/images/dataset/aobaba/BB_nau.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_trang.jpg', 'Áo bà ba màu trắng', 'Trắng', '/images/dataset/aobaba/BB_trang.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_xanhcom.jpg', 'Áo bà ba màu xanh cốm', 'Xanh cốm', '/images/dataset/aobaba/BB_xanhcom.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aobaba/BB_xanhlam.jpg', 'Áo bà ba màu xanh lam', 'Xanh lam', '/images/dataset/aobaba/BB_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aobaba'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_cam.jpg', 'Áo dài màu cam', 'Cam', '/images/dataset/aodai/ad_cam.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_do.jpg', 'Áo dài màu đỏ', 'Đỏ', '/images/dataset/aodai/ad_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_hong.jpg', 'Áo dài màu hồng', 'Hồng', '/images/dataset/aodai/ad_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_tim.jpg', 'Áo dài màu tím', 'Tím', '/images/dataset/aodai/ad_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_vang.jpg', 'Áo dài màu vàng', 'Vàng', '/images/dataset/aodai/ad_vang.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_xanhlam.jpg', 'Áo dài màu xanh lam', 'Xanh lam', '/images/dataset/aodai/ad_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aodai/ad_xanhluc.jpg', 'Áo dài màu xanh lục', 'Xanh lục', '/images/dataset/aodai/ad_xanhluc.jpg'
FROM wardrobe.garment_types WHERE code = 'aodai'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aogiaolinh/agl_do.jpg', 'Áo giao lĩnh màu đỏ', 'Đỏ', '/images/dataset/aogiaolinh/agl_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aogiaolinh/agl_hong.jpg', 'Áo giao lĩnh màu hồng', 'Hồng', '/images/dataset/aogiaolinh/agl_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aogiaolinh/agl_tim.jpg', 'Áo giao lĩnh màu tím', 'Tím', '/images/dataset/aogiaolinh/agl_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aogiaolinh/agl_xanhla.jpg', 'Áo giao lĩnh màu xanh lá', 'Xanh lá', '/images/dataset/aogiaolinh/agl_xanhla.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aogiaolinh/agl_xanhlam.jpg', 'Áo giao lĩnh màu xanh lam', 'Xanh lam', '/images/dataset/aogiaolinh/agl_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aogiaolinh'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_be.jpg', 'Áo ngũ thân tay chẽn màu be', 'Be', '/images/dataset/aonguthan_taychen/ant_be.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_do.jpg', 'Áo ngũ thân tay chẽn màu đỏ', 'Đỏ', '/images/dataset/aonguthan_taychen/ant_do.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_hong.jpg', 'Áo ngũ thân tay chẽn màu hồng', 'Hồng', '/images/dataset/aonguthan_taychen/ant_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_tim.jpg', 'Áo ngũ thân tay chẽn màu tím', 'Tím', '/images/dataset/aonguthan_taychen/ant_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_trang.jpg', 'Áo ngũ thân tay chẽn màu trắng', 'Trắng', '/images/dataset/aonguthan_taychen/ant_trang.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_xanhlam.jpg', 'Áo ngũ thân tay chẽn màu xanh lam', 'Xanh lam', '/images/dataset/aonguthan_taychen/ant_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aonguthan_taychen/ant_xanhluc.jpg', 'Áo ngũ thân tay chẽn màu xanh lục', 'Xanh lục', '/images/dataset/aonguthan_taychen/ant_xanhluc.jpg'
FROM wardrobe.garment_types WHERE code = 'aonguthan_taychen'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_hong.jpg', 'Áo yếm màu hồng', 'Hồng', '/images/dataset/aoyem/yem_hong.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_tim.jpg', 'Áo yếm màu tím', 'Tím', '/images/dataset/aoyem/yem_tim.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_trang.jpg', 'Áo yếm màu trắng', 'Trắng', '/images/dataset/aoyem/yem_trang.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_vangbe.jpg', 'Áo yếm màu vàng be', 'Vàng be', '/images/dataset/aoyem/yem_vangbe.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_vangtuoi.jpg', 'Áo yếm màu vàng tươi', 'Vàng tươi', '/images/dataset/aoyem/yem_vangtuoi.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_xanh.jpg', 'Áo yếm màu xanh (chưa xác định sắc độ)', 'Xanh (chưa xác định sắc độ)', '/images/dataset/aoyem/yem_xanh.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_xanhlam.jpg', 'Áo yếm màu xanh lam', 'Xanh lam', '/images/dataset/aoyem/yem_xanhlam.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
INSERT INTO wardrobe.garment_variants (garment_type_id, dataset_path, name, color, image_url)
SELECT id, 'dataset/aoyem/yem_xanhluc.jpg', 'Áo yếm màu xanh lục', 'Xanh lục', '/images/dataset/aoyem/yem_xanhluc.jpg'
FROM wardrobe.garment_types WHERE code = 'aoyem'
ON CONFLICT (dataset_path) DO NOTHING;
COMMIT;

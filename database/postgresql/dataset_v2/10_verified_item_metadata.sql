-- Bổ sung mô tả quan sát từ ảnh và thông tin văn hóa đã đối chiếu.
-- Không điền nguồn ảnh, giấy phép ảnh hoặc đánh dấu reviewed.
-- Chạy lại được: giữ nguyên giá trị đã nhập thủ công.
BEGIN;
UPDATE wardrobe.garment_types SET
  description='Yếm truyền thống là lớp trang phục che ngực của phụ nữ. Các ảnh trong bộ dữ liệu này thể hiện áo cổ yếm cách tân với nhiều dáng và độ dài khác nhau; không dùng ảnh làm tư liệu phục dựng yếm cổ.',
  cultural_notes='Phân biệt yếm mặc trong truyền thống với áo cổ yếm cách tân trong bộ ảnh. Không suy diễn niên đại, vùng hay nghi lễ của từng mẫu từ tên gọi áo yếm.'
WHERE code='aoyem' AND description='Trang phục che ngực, thường làm từ mảnh vải hình vuông hoặc hình thoi, có dây buộc ở cổ và lưng. Yếm truyền thống là lớp mặc trong.';
WITH features(dataset_path,description) AS (VALUES
  ('dataset/aobaba/BB_Tim.jpg', 'Bộ áo bà ba màu tím nhạt, áo tay dài cài nút trước, phối với quần cùng tông.'),
  ('dataset/aobaba/BB_cam.jpg', 'Bộ áo bà ba màu cam, áo tay dài cài nút trước, phối với quần cùng tông; thân áo có hoa văn.'),
  ('dataset/aobaba/BB_do.jpg', 'Bộ áo bà ba đỏ sẫm, áo tay dài cài nút trước, phối với quần cùng tông.'),
  ('dataset/aobaba/BB_hong.jpg', 'Bộ áo bà ba màu hồng, áo tay dài cài nút trước, phối với quần cùng tông.'),
  ('dataset/aobaba/BB_nau.jpg', 'Áo bà ba màu nâu có hoa văn, tay dài, cài nút phía trước; ảnh chỉ thể hiện áo.'),
  ('dataset/aobaba/BB_trang.jpg', 'Bộ áo bà ba màu trắng ngà, áo tay dài cài nút trước, phối với quần sáng màu.'),
  ('dataset/aobaba/BB_xanhcom.jpg', 'Bộ áo bà ba xanh cốm, áo tay dài cài nút trước, phối với quần cùng tông.'),
  ('dataset/aobaba/BB_xanhlam.jpg', 'Áo bà ba tông xanh nhạt, tay dài, cài nút trước, phối với quần hồng nhạt.'),
  ('dataset/aodai/ad_cam.jpg', 'Áo dài màu cam có cổ đứng, tay lửng và viền hoa ở cổ, tay, gấu; phối với quần xanh nhạt.'),
  ('dataset/aodai/ad_do.jpg', 'Áo dài màu đỏ, cổ đứng, tay lửng và họa tiết hoa ở thân áo, cổ tay; phối với quần cùng tông.'),
  ('dataset/aodai/ad_hong.jpg', 'Áo dài màu hồng nhạt, cổ đứng, tay dài và lớp vải mỏng phía ngoài; phối với quần sáng màu.'),
  ('dataset/aodai/ad_tim.jpg', 'Áo dài tím nhạt, cổ đứng, tay dài dáng rộng; phối với quần trắng.'),
  ('dataset/aodai/ad_vang.jpg', 'Áo dài màu vàng, cổ đứng, tay dài, có họa tiết hoa trên thân và tay áo; ảnh chỉ thể hiện phần trên.'),
  ('dataset/aodai/ad_xanhlam.jpg', 'Áo dài xanh lam nhạt, cổ đứng, tay dài dáng rộng; phối với quần cùng tông.'),
  ('dataset/aodai/ad_xanhluc.jpg', 'Áo dài xanh lục đậm, cổ đứng, tay lửng, viền họa tiết ở cổ và gấu; phối với quần xanh nhạt.'),
  ('dataset/aogiaolinh/agl_do.jpg', 'Áo giao lĩnh màu đỏ với hai vạt cổ giao nhau, tay áo rộng; phối cùng lớp áo cổ trắng.'),
  ('dataset/aogiaolinh/agl_hong.jpg', 'Áo giao lĩnh màu hồng nhạt, hai vạt cổ giao nhau và tay áo rộng.'),
  ('dataset/aogiaolinh/agl_tim.jpg', 'Áo giao lĩnh màu tím, cổ vắt chéo và tay áo rộng; phối cùng lớp áo sáng màu.'),
  ('dataset/aogiaolinh/agl_xanhla.jpg', 'Áo giao lĩnh xanh lá nhạt, cổ vắt chéo và tay áo rộng; phối cùng lớp áo sáng màu.'),
  ('dataset/aogiaolinh/agl_xanhlam.jpg', 'Áo giao lĩnh xanh lam nhạt, cổ vắt chéo và tay áo rộng; phối cùng lớp áo sáng màu.'),
  ('dataset/aonguthan_taychen/ant_be.jpg', 'Áo ngũ thân màu be, cổ đứng cài nút, tay dài; phối cùng quần sáng màu.'),
  ('dataset/aonguthan_taychen/ant_do.jpg', 'Áo ngũ thân màu đỏ, cổ đứng, tay dài, tà áo dài; phối cùng quần trắng.'),
  ('dataset/aonguthan_taychen/ant_hong.jpg', 'Áo ngũ thân màu hồng có hoa văn, cổ đứng, tay dài và tà áo dài.'),
  ('dataset/aonguthan_taychen/ant_tim.jpg', 'Áo ngũ thân tím nhạt, cổ đứng, tay dài, họa tiết hoa ở ngực; phối cùng quần tím.'),
  ('dataset/aonguthan_taychen/ant_trang.jpg', 'Áo ngũ thân màu trắng, cổ đứng, tay dài, họa tiết hoa trên thân áo.'),
  ('dataset/aonguthan_taychen/ant_xanhlam.jpg', 'Áo ngũ thân xanh lam đậm có hoa văn, cổ đứng và tay dài.'),
  ('dataset/aonguthan_taychen/ant_xanhluc.jpg', 'Áo ngũ thân xanh lục đậm có hoa văn, cổ đứng, tay dài; phối cùng quần đen.'),
  ('dataset/aoyem/yem_hong.jpg', 'Áo cổ yếm cách tân màu hồng nhạt, dáng dài, để hở vai; phối cùng quần dài.'),
  ('dataset/aoyem/yem_tim.jpg', 'Áo cổ yếm cách tân tím nhạt, dáng ngắn, không tay; phối cùng chân váy vàng nhạt.'),
  ('dataset/aoyem/yem_trang.jpg', 'Áo cổ yếm màu trắng, dây đeo qua cổ, gấu viền ren; phối cùng váy sáng màu.'),
  ('dataset/aoyem/yem_vangbe.jpg', 'Áo cổ yếm màu vàng be, dáng ngắn, để hở vai; phối cùng lớp vải hồng nhạt.'),
  ('dataset/aoyem/yem_vangtuoi.jpg', 'Áo cổ yếm màu vàng, dây đeo qua cổ, gấu viền ren; phối cùng quần hồng.'),
  ('dataset/aoyem/yem_xanh.jpg', 'Áo cổ yếm tông xanh, dáng dài, để hở vai; phối cùng quần sáng màu.'),
  ('dataset/aoyem/yem_xanhlam.jpg', 'Áo cổ yếm xanh lam đậm, dáng xòe, không tay; phối cùng váy trắng.'),
  ('dataset/aoyem/yem_xanhluc.jpg', 'Áo cổ yếm xanh lục đậm, không tay, điểm họa tiết nhỏ gần cổ; phối cùng váy xanh nhạt.')
) UPDATE wardrobe.garment_variants v SET description=f.description
FROM features f WHERE v.dataset_path=f.dataset_path
AND (v.description IS NULL OR btrim(v.description)='');
WITH items(type_code,color,description,cultural_notes) AS (VALUES
  ('bongtai', 'Trắng và bạc', 'Đôi bông tai dạng móc, phần rủ hình hoa màu trắng.', NULL),
  ('daylung', 'Nâu', 'Dây lưng màu nâu, bản hẹp, có khóa kim loại.', NULL),
  ('keptoc', 'Đen và trắng', 'Kẹp tóc hình nơ màu đen với lớp vải họa tiết hoa.', NULL),
  ('khanlua', 'Xanh lam và hồng', 'Khăn vuông họa tiết nhiều màu, có thể buộc ở cổ hoặc tóc; chất liệu chưa được xác minh.', NULL),
  ('khanmoqua', 'Đen', 'Khăn đội đầu màu đen, tạo dáng mỏ quạ với hai đầu khăn dài.', 'Khăn mỏ quạ xuất hiện trong trang phục của liền chị Quan họ; không mặc định hợp với mọi loại cổ phục.'),
  ('khanran', 'Đen và trắng', 'Khăn rằn họa tiết ô đen trắng, có tua ở hai đầu.', 'Khăn rằn gắn với đời sống Nam Bộ và thường xuất hiện cùng áo bà ba, nón lá.'),
  ('luoccaitoc', 'Vàng và trắng', 'Lược cài tóc có nhiều răng, trang trí nhánh lá sáng màu.', NULL),
  ('nonla', 'Trắng ngà', 'Nón lá dáng chóp, vành tròn rộng, màu sáng.', 'Nón lá là vật dụng che nắng, mưa quen thuộc và cũng xuất hiện trong hình ảnh trang phục Việt.'),
  ('nonquaithao', 'Vàng nhạt và đỏ', 'Nón quai thao có vành rộng, dáng gần phẳng, điểm chi tiết đỏ.', 'Nón quai thao là một phần trang phục biểu diễn của liền chị Quan họ Bắc Ninh.'),
  ('quatgiay', 'Xanh lam và trắng', 'Quạt xếp có nan sáng màu và mặt quạt trang trí họa tiết hoa xanh.', NULL),
  ('quatlua', 'Trắng ngà và vàng', 'Quạt xếp màu sáng, mặt quạt có họa tiết vàng; chất liệu mặt quạt chưa được xác minh.', NULL),
  ('tramcaitoc', 'Nâu và trắng', 'Trâm cài tóc thân nâu, đầu trâm trang trí hình hoa trắng.', NULL),
  ('tuicoi', 'Be và nâu', 'Túi xách dáng cong màu be, bề mặt đan và quai nâu; chất liệu chưa được xác minh.', NULL),
  ('tuidayrut', 'Be', 'Túi xách màu be có miệng rút dây, quai ngắn và dây đeo dài.', NULL),
  ('tuimay', 'Be', 'Túi xách màu be, bề mặt đan nổi và quai xách liền; chất liệu chưa được xác minh.', NULL),
  ('tuivai', 'Trắng', 'Túi vải màu trắng có quai xách và hình in nhân vật đội nón.', NULL),
  ('tuixachnho', 'Trắng', 'Túi xách nhỏ màu trắng, dáng hộp, có quai đeo vai.', NULL),
  ('vongco', 'Trắng và vàng', 'Vòng cổ dạng chuỗi mảnh, nhiều hạt sáng màu.', NULL),
  ('vongtay', 'Đen và bạc', 'Ảnh có hai vòng tay dây đen và dây bạc với chi tiết kim loại.', NULL),
  ('depquaingang', 'Đen và be', 'Dép đế đen, một quai ngang họa tiết kẻ ô.', NULL),
  ('giaybupbe', 'Trắng ngà và nâu', 'Giày búp bê đế thấp, quai ngang, trang trí nơ họa tiết.', NULL),
  ('giaycaogot', 'Đen', 'Giày cao gót đen bóng, mũi nhọn, gót cao mảnh.', NULL),
  ('giaythethao', 'Trắng và đen', 'Giày thể thao buộc dây màu trắng, có sọc đen ở hai bên.', NULL),
  ('guocmoc', 'Nâu gỗ và đen', 'Guốc có đế vân gỗ, gót thấp và quai ngang màu đen.', 'Guốc mộc được ghi nhận trong cách phối áo bà ba ở các hoạt động chụp ảnh và giới thiệu văn hóa Nam Bộ.'),
  ('sandal', 'Nâu và đen', 'Dép sandal đế bằng màu đen, quai bản rộng màu nâu.', NULL)
) UPDATE wardrobe.styling_items s SET
  color=COALESCE(NULLIF(btrim(s.color),''),i.color),
  description=COALESCE(NULLIF(btrim(s.description),''),i.description),
  cultural_notes=COALESCE(NULLIF(btrim(s.cultural_notes),''),i.cultural_notes)
FROM items i WHERE s.type_code=i.type_code
AND (s.color IS NULL OR btrim(s.color)='' OR s.description IS NULL OR btrim(s.description)='' OR (s.cultural_notes IS NULL AND i.cultural_notes IS NOT NULL));
COMMIT;

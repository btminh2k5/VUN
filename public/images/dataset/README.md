# Thư mục thu thập ảnh dataset

Chỉ dùng bộ ảnh tại public/images/dataset, không tạo thêm dataset ở gốc dự án.

- Nu/: ảnh các loại áo nữ hiện có, giữ nguyên cách đặt tên.
- accessories/: ảnh phụ kiện.
- footwear/: ảnh giày và dép.

## Danh mục thư mục

| Nhóm | Thư mục | Nội dung |
| --- | --- | --- |
| accessories | nonla | Nón lá |
| accessories | nonquaithao | Nón quai thao |
| accessories | khanmoqua | Khăn mỏ quạ |
| accessories | khanran | Khăn rằn |
| accessories | khanlua | Khăn lụa |
| accessories | tuivai | Túi vải |
| accessories | tuidayrut | Túi dây rút |
| accessories | tuicoi | Túi cói |
| accessories | tuimay | Túi mây |
| accessories | tuixachnho | Túi xách nhỏ |
| accessories | vongco | Vòng cổ |
| accessories | vongtay | Vòng tay |
| accessories | bongtai | Bông tai |
| accessories | tramcaitoc | Trâm cài tóc |
| accessories | luoccaitoc | Lược cài tóc |
| accessories | keptoc | Kẹp tóc |
| accessories | quatgiay | Quạt giấy |
| accessories | quatlua | Quạt lụa |
| accessories | daylung | Dây lưng |
| footwear | guocmoc | Guốc mộc |
| footwear | giaybupbe | Giày búp bê |
| footwear | giaycaogot | Giày cao gót |
| footwear | giaythethao | Giày thể thao |
| footwear | sandal | Sandal |
| footwear | depquaingang | Dép quai ngang |

## Cách thêm ảnh phụ kiện và giày dép

Đặt ảnh vào thư mục đúng loại. Dùng tên không dấu, không khoảng trắng:
`<loai>_<mau>_<so-thu-tu>.<duoi-anh>`.

Ví dụ:

- accessories/nonla/nonla_tunhien_01.jpg
- accessories/khanran/khanran_den_trang_01.jpg
- accessories/tuicoi/tuicoi_nau_01.jpg
- footwear/giaybupbe/giaybupbe_trang_01.jpg
- footwear/guocmoc/guocmoc_tunhien_01.jpg

Chấp nhận ảnh JPG, JPEG, PNG hoặc WebP. Giữ đúng đuôi theo định dạng thật; không đổi đuôi để chuyển định dạng. Có nhiều ảnh cùng loại/màu thì tăng số 01, 02, 03... để tránh ghi đè. Nếu chưa xác định màu, dùng chuaxacdinh.

File .gitkeep chỉ giúp Git lưu thư mục khi chưa có ảnh. Các thư mục hiện đã có ảnh nên đã bỏ file giữ chỗ này.

Hiện có 19 thư mục phụ kiện (19 ảnh), 6 thư mục giày dép (6 ảnh) và 35 ảnh áo. Danh mục trên phản ánh các thư mục hiện có sau khi chọn lọc; không bắt buộc bổ sung lại khăn đóng hoặc hài thêu đã bỏ. Tên ảnh hiện tại chưa ghi màu/số thứ tự vẫn có thể giữ để thu thập; quy tắc ở trên dùng khi cần thêm nhiều mẫu cùng loại.

## Trạng thái nhập database

Script `database/postgresql/dataset_v2/generate-import.mjs` nhận cả ảnh áo và hai nhóm accessories/footwear. Nhãn loại mới cần thêm trong `styling-mappings.json`. Script tạo `02_import_dataset.sql` cho áo và `06_import_styling_items.sql` cho phụ kiện/giày dép. Chạy `05_styling_items_schema.sql` trước lần nhập phụ kiện đầu tiên; dữ liệu nằm trong bảng `wardrobe.styling_items`.

Màu của phụ kiện/giày dép hiện để NULL để bổ sung thủ công, không suy đoán từ ảnh hoặc tên file. Tên nhóm và loại lấy từ thư mục; tên mẫu có thêm tên file để phân biệt nhiều ảnh cùng loại. Tên ảnh áo vẫn theo quy tắc cũ vì bộ đọc màu áo dùng phần cuối tên file.

Việc thêm ảnh vào thư mục không tự thêm dữ liệu vào pgAdmin. Danh mục này không khẳng định mỗi phụ kiện đều phù hợp với mọi loại áo.

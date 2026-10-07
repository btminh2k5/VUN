# Nhập dataset theo loại áo và màu

**Chạy tự động bằng Docker:** xem [hướng dẫn Docker](../../DOCKER.md). Compose ở thư mục gốc tự nạp schema, dataset và thông tin văn hóa vào database riêng `vietfashion` khi khởi tạo lần đầu. Các bước pgAdmin dưới đây là cách chạy thủ công.

Đây là cấu trúc mới dành cho dataset hiện tại. Dùng schema `wardrobe` trong database `VUNdata` để không đụng bảng `public.outfits` bạn đã tạo hoặc các bảng cũ. Không xóa hay tự chuyển dữ liệu đã nhập trước đó.

## Bạn làm ngay trong pgAdmin

1. Mở Query Tool của database VUNdata. Dán toàn bộ `01_schema.sql` trong thư mục **dataset_v2** và chạy một lần.
2. Thay nội dung Query Tool bằng toàn bộ `02_import_dataset.sql` trong **dataset_v2** và chạy. File này nhập toàn bộ dataset trong một transaction.
3. Refresh Schemas. Mở **wardrobe → Tables**: `garment_types` chứa loại áo; `garment_variants` chứa từng ảnh/màu. Nhấp phải bảng → View/Edit Data → All Rows.
4. Muốn xem chung như bảng Excel: mở **wardrobe → Views → outfit_catalog**, hoặc chạy `SELECT * FROM wardrobe.outfit_catalog ORDER BY category, color;`.

Bảng public.outfits trong database cũ, nếu có, không bị thay đổi; dữ liệu mới nằm trong wardrobe. Backend hiện chưa kết nối với các bảng mới.

## Cách tổ chức

- `garment_types`: tên loại, vùng, sự kiện, phong cách, mô tả, nguồn gốc, ý nghĩa, lưu ý, nguồn tài liệu. Thông tin chung chỉ điền một lần cho mỗi loại.
- `garment_variants`: loại áo liên quan, khóa nhập dataset_path, tên mẫu, nhóm Nữ/Nam, màu, URL ảnh, mô tả riêng, phụ kiện, nguồn và quyền sử dụng ảnh.
- `outfit_catalog`: view ghép hai bảng để xem và lọc; sửa dữ liệu ở bảng gốc, không sửa trên view.

Một ảnh hiện được nhập thành một mẫu. Nếu sau này một mẫu có nhiều góc chụp, nên thêm bảng ảnh thay vì coi mỗi góc là một màu mới. Mô hình hiện giả định vùng/sự kiện/phong cách dùng chung theo loại; nếu một mẫu có bối cảnh riêng thì cần mở rộng phần dữ liệu mẫu.

## Kết quả lần nhập ban đầu

35 ảnh thuộc 5 loại: áo bà ba (8), áo dài (7), áo giao lĩnh (5), áo ngũ thân tay chẽn (7), áo yếm (8). Tất cả ở nhánh Nu. Xem `import-report.json` để biết kết quả lần tạo file gần nhất.

**Chỉ lưu một bộ ảnh tại `public/images/dataset/`.** Thư mục `dataset/` ở gốc dự án đã được bỏ vì trùng nội dung. Ví dụ file `public/images/dataset/Nu/aobaba/BB_do.jpg` có URL `/images/dataset/Nu/aobaba/BB_do.jpg`.

Cột `dataset_path` giữ giá trị `dataset/Nu/aobaba/BB_do.jpg` như một khóa nhập logic để tương thích dữ liệu cũ, không phải đường dẫn file tính từ gốc repository. Script vẫn dùng khóa này để tránh nhập trùng. Không cần chạy migration hoặc nhập lại database sau khi bỏ bộ ảnh trùng; image_url không đổi.

Loại áo, nhóm và màu suy ra từ tên thư mục/file, chưa xác minh nội dung ảnh. Tên `xanh` giữ là “Xanh (chưa xác định sắc độ)”; không đoán thêm. Tất cả bản ghi nhập mới giữ `draft`. Không có khẳng định lịch sử hoặc nguồn ảnh được tự điền.

## Bạn cần bổ sung sau khi nhập

Đã có file `04_update_type_information.sql` chứa nội dung có nguồn cho 5 loại áo. Sau khi nhập dataset, chạy toàn bộ file này trong Query Tool bằng F5. File chỉ UPDATE 5 dòng hiện có, không sửa ảnh. Nó thay thế các cột nội dung được nêu trong file, kể cả đặt NULL/mảng rỗng ở phần chưa đủ căn cứ, và đặt trạng thái `needs_review`; giữ nguyên style. Nếu đã sửa nội dung bằng tay, đối chiếu trước khi chạy lại. Nguồn gốc áo bà ba, giao lĩnh, yếm và các diễn giải biểu tượng chưa chắc chắn được bỏ khỏi bản nhập. Các URL nguồn kiến thức nằm trong cột source; không phải nguồn của ảnh dataset.

Trong garment_types: kiểm tra nhãn loại rồi điền mô tả, nguồn gốc, ý nghĩa, nguồn tài liệu, vùng/sự kiện/phong cách phù hợp. Trong garment_variants: đối chiếu ảnh/màu, điền nguồn ảnh và quyền sử dụng; bổ sung phụ kiện nếu có. ID và thời gian tự sinh.

Chỉ đánh dấu reviewed sau khi nhóm kiểm chứng. Database kiểm tra giá trị trạng thái hợp lệ nhưng không tự xác minh nội dung, độ đầy đủ hoặc quyền sử dụng. Truy vấn website trong file 03 yêu cầu cả loại và mẫu đã reviewed nên ban đầu sẽ trả về rỗng.

## Khi thêm ảnh, màu hoặc loại mới

1. Đặt ảnh vào `public/images/dataset/<Nu hoặc Nam>/<mã loại>/<tiền tố>_<mã màu>.jpg`. Hỗ trợ jpg, jpeg, png, webp.
2. Nếu có mã loại/màu mới, thêm tên hiển thị tương ứng trong `mappings.json`.
3. Tại terminal ở thư mục gốc dự án chạy:

```powershell
node database/postgresql/dataset_v2/generate-import.mjs
```

4. Chạy lại **chỉ 02_import_dataset.sql** vừa tạo trong pgAdmin. Không chạy lại schema.

Script dừng và liệt kê nếu gặp cấu trúc/nhãn chưa hiểu; không âm thầm bỏ ảnh. File không phải ảnh được ghi trong báo cáo. Không cần cài thư viện npm. Import dùng code và dataset_path để tránh nhập trùng, giữ nguyên các chỉnh sửa bằng tay trong database.

Đổi tên/di chuyển ảnh bên trong public/images/dataset sẽ tạo khóa nhập mới; cần đối chiếu bản ghi cũ thủ công. Xóa ảnh không xóa bản ghi database. Script không sửa hoặc sao chép ảnh. Sửa mappings không tự sửa nhãn của các bản ghi đã nhập: dùng UPDATE sau khi đối chiếu.

Các file SQL không tự chạy trên PostgreSQL. Script Node đọc bộ ảnh duy nhất để tạo SQL và báo cáo; bạn chạy SQL trong pgAdmin để nạp vào database.

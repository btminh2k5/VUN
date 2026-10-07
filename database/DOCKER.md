# Chạy database VietFashion bằng Docker

Cần Docker Desktop đang chạy với Linux containers và Docker Compose v2. Chạy lệnh từ thư mục gốc repository (D:\VUN trên máy hiện tại).

## 1. Chuẩn bị cấu hình

Nếu chưa có .env, copy .env.example thành .env. Nếu đã có .env, chỉ thêm các dòng POSTGRES bên dưới, không ghi đè các thiết lập khác:

```dotenv
POSTGRES_DB=vietfashion
POSTGRES_USER=vietfashion
POSTGRES_PASSWORD=thay_bang_mat_khau_cua_ban
POSTGRES_PORT=5433
```

Thay mật khẩu ví dụ trước khi chạy. .env đã được .gitignore loại trừ; chỉ đưa .env.example lên Git. Cổng 5433 tránh trùng PostgreSQL trên máy đang dùng cổng 5432.

## 2. Khởi động

```powershell
docker compose config --quiet
docker compose up -d
docker compose ps
docker compose logs --tail=100 postgres
```

Lần đầu Docker tải image postgres:18, tạo database vietfashion, rồi chạy đúng thứ tự:

1. 01_schema.sql: hai bảng và view trong schema wardrobe.
2. 02_import_dataset.sql: 5 loại áo, 35 mẫu ảnh.
3. 04_update_type_information.sql: thông tin văn hóa có nguồn.
4. 05_styling_items_schema.sql: bảng styling_items cho phụ kiện và giày dép.
5. 06_import_styling_items.sql: 19 phụ kiện và 6 mẫu giày dép.

Compose ánh xạ trực tiếp các file hiện có vào /docker-entrypoint-initdb.d, không cần tạo bản sao schema.sql/seed.sql hoặc Dockerfile. File truy vấn 03 không được chạy tự động.

Healthcheck kiểm tra PostgreSQL nhận kết nối; cần dùng câu lệnh dưới để xác nhận dữ liệu đã nhập đủ, không chỉ dựa vào trạng thái healthy.

## 3. Kiểm tra dữ liệu

Với tài khoản/database mặc định trong .env.example:

```powershell
docker compose exec postgres psql -U vietfashion -d vietfashion -c "SELECT category, count(*) AS so_anh FROM wardrobe.outfit_catalog GROUP BY category ORDER BY category;"
```

Kết quả ban đầu: áo bà ba 8, áo dài 7, áo giao lĩnh 5, áo ngũ thân tay chẽn 7, áo yếm 8. Nếu đổi POSTGRES_USER/POSTGRES_DB, thay đối số -U/-d tương ứng.

## 4. Xem trong pgAdmin đang có trên máy

### Cập nhật container đã tạo trước khi thêm phụ kiện

Tại thư mục gốc dự án, chạy các lệnh sau (giữ nguyên volume dữ liệu):

```powershell
docker compose up -d
docker compose exec postgres psql -U vietfashion -d vietfashion -v ON_ERROR_STOP=1 -f /docker-entrypoint-initdb.d/04_styling_items_schema.sql
docker compose exec postgres psql -U vietfashion -d vietfashion -v ON_ERROR_STOP=1 -f /docker-entrypoint-initdb.d/05_import_styling_items.sql
docker compose exec postgres psql -U vietfashion -d vietfashion -c "SELECT item_group, count(*) FROM wardrobe.styling_items GROUP BY item_group;"
```

Lệnh up cập nhật các mount SQL, không tự chạy migration trên volume cũ. Kết quả: accessories 19, footwear 6. Có thể chạy lại hai file này, không tạo dòng trùng; dữ liệu áo giữ nguyên. Nếu tài khoản/database trong .env khác mặc định, đổi -U/-d tương ứng. Script generate-import.mjs nay sinh cả file nhập áo và file nhập phụ kiện; sau khi thêm phụ kiện chỉ cần nạp lại file 05_import_styling_items.sql trong container.

### Kết nối pgAdmin

Register → Server, đặt tên hiển thị VietFashion Docker. Trong Connection:

| Mục | Giá trị mặc định |
| --- | --- |
| Host name/address | 127.0.0.1 |
| Port | 5433 |
| Maintenance database | vietfashion |
| Username | vietfashion |
| Password | Giá trị POSTGRES_PASSWORD trong .env |

Sau đó mở Databases → vietfashion → Schemas → wardrobe → Tables hoặc Views. Đây là database riêng, không tự thay thế hoặc đồng bộ VUNdata của PostgreSQL cài trên máy. Những sửa đổi chỉ thực hiện trong pgAdmin cũ sẽ không tự xuất hiện trong Docker; cần lưu chúng vào migration/SQL nếu muốn bàn giao.

Backend chạy trực tiếp trên máy kết nối 127.0.0.1:5433; nếu backend được thêm vào cùng mạng Compose thì dùng postgres:5432. Compose này chỉ chạy database, chưa chạy hoặc kết nối ứng dụng.

## 5. Dữ liệu được giữ ở đâu?

Database nằm trong named volume postgres_data của Compose. Dừng rồi mở lại vẫn giữ dữ liệu:

```powershell
docker compose down
docker compose up -d
```

Không thêm --volumes/-v vào lệnh down nếu muốn giữ dữ liệu. Đổi POSTGRES_PASSWORD trong .env không tự đổi mật khẩu tài khoản của database đã tồn tại; biến khởi tạo chỉ có tác dụng ở lần tạo database đầu tiên.

SQL khởi tạo chỉ tự chạy khi thư mục dữ liệu còn trống. Sửa SQL hoặc khởi động lại container không tự cập nhật database đã có. Với schema thay đổi, dùng migration riêng; không chạy lại 01_schema.sql.

Nếu thêm ảnh và đã chạy generate-import.mjs, có thể nạp lại file import vào database đang chạy bằng:

```powershell
docker compose exec postgres psql -U vietfashion -d vietfashion -v ON_ERROR_STOP=1 -f /docker-entrypoint-initdb.d/02_seed.sql
```

Nếu cố ý muốn thay nội dung văn hóa bằng bản SQL mới (lệnh này ghi đè các trường nêu trong file):

```powershell
docker compose exec postgres psql -U vietfashion -d vietfashion -v ON_ERROR_STOP=1 -f /docker-entrypoint-initdb.d/03_type_information.sql
```

Nếu lần khởi tạo gặp lỗi, đọc logs và sửa nguyên nhân trước. Khởi động lại không tự chạy tiếp các script trên volume đã khởi tạo dở; không xóa volume có dữ liệu cần giữ. Có thể kiểm tra/nạp phần còn thiếu bằng psql sau khi xác định lỗi.

## 6. Bàn giao lên GitHub

Giữ docker-compose.yml, .env.example, database/ và public/images/dataset/. Chỉ có một bộ ảnh tại public/images/dataset; không cần thư mục dataset/ riêng ở gốc. Database chỉ lưu URL ảnh; PostgreSQL không phục vụ ảnh. Ảnh do ứng dụng web phục vụ từ public/images/dataset, không cần mount vào container database. Khóa dataset_path trong SQL giữ nguyên để tương thích dữ liệu đã nhập; không cần cập nhật database khi bỏ thư mục ảnh trùng.

Đồng đội clone repository, tạo .env rồi chạy docker compose up -d sẽ khởi tạo cùng schema và dữ liệu từ SQL. Không commit .env, thư mục dữ liệu PostgreSQL hoặc volume Docker.

Nguồn kỹ thuật: [PostgreSQL Official Image](https://hub.docker.com/_/postgres), [Docker Compose interpolation](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/).

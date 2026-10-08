# VietFashion AI Stylist

Gợi ý một outfit hoàn chỉnh từ dữ liệu thật trong PostgreSQL: trang phục chính, phụ kiện và giày dép.

Kiến trúc pipeline:

```
Browser → Frontend (React) → Express → FastAPI → PostgreSQL
                                   ↓
                     Rule engine chấm điểm & chọn outfit (KHÔNG dùng LLM)
                                   ↓
                   Frontend hiển thị outfit + mockup 2D theo z-index
                                   ↓
              (tuỳ chọn) LLM tư vấn phối đồ, bị ràng buộc theo engine
```

## Hướng dẫn chạy dự án

### Yêu cầu môi trường
- **Docker Desktop** (chạy PostgreSQL và tùy chọn FastAPI)
- **Node.js** (khuyến nghị v20+ hoặc v22)
- **Python 3.11+** (chỉ cần nếu chạy FastAPI ngoài máy thay vì dùng Docker)

---

### Bước 1: Khởi tạo cấu hình môi trường (.env)

Tạo file `.env` từ file mẫu:

```powershell
# Windows PowerShell
Copy-Item .env.example .env

# Hoặc CMD / Git Bash
cp .env.example .env
```

Mở file `.env` để kiểm tra hoặc điền thêm API key LLM nếu cần (mặc định đã cấu hình sẵn database và tắt gọi LLM trả phí).

---

### Bước 2: Khởi động Database & Backend FastAPI

Có 2 cách linh hoạt để khởi động:

#### Cách 1: Dùng Docker Compose (Khuyên dùng - Tiện nhất, không cần cài Python)
Khởi động đồng thời cả **PostgreSQL** (chứa sẵn 35 trang phục thật) và **FastAPI Engine** (rule engine chấm điểm):

```powershell
docker compose --profile api up -d --build
```

> **Mẹo:** Nếu chỉ muốn chạy riêng cơ sở dữ liệu PostgreSQL qua Docker:
> ```powershell
> docker compose up -d --build
> ```

#### Cách 2: Chạy FastAPI thủ công bằng Python (Dành cho dev sửa rule engine)
Sau khi đã bật container database, mở một terminal riêng:
```powershell
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

---

### Bước 3: Khởi động Frontend & Express Gateway

Tại thư mục gốc dự án:

1. **Cài đặt thư viện Node.js:**
   ```powershell
   npm install --legacy-peer-deps
   ```
   *(Thêm cờ `--legacy-peer-deps` để đảm bảo cài đặt suôn sẻ trên Windows mà không bị xung đột peer dependency).*

2. **Khởi động ứng dụng React (Vite + Express):**
   ```powershell
   npm run dev
   ```

---

### Bước 4: Kiểm tra các cổng truy cập

Sau khi khởi động, các dịch vụ sẵn sàng tại:

| Dịch vụ | Địa chỉ truy cập | Chức năng |
| :--- | :--- | :--- |
| **Giao diện Web (React + Express)** | [http://localhost:3000](http://localhost:3000) | Ứng dụng chính VietFashion AI Stylist |
| **FastAPI Swagger Docs** | [http://localhost:8000/docs](http://localhost:8000/docs) | Tài liệu kiểm thử API phối đồ & Rule Engine |
| **PostgreSQL Database** | `127.0.0.1:5433` | Cổng CSDL bên ngoài máy host (User/Pass trong `.env`) |

---

### Khắc phục sự cố thường gặp

- **Lỗi `'tsx' is not recognized` trên Windows PowerShell:**
  - *Nguyên nhân:* Thư mục `node_modules` thiếu file thực thi `.cmd` tương thích Windows do cài đặt từ Linux/Docker hoặc lệnh install bị ngắt giữa chừng.
  - *Xử lý:* Chạy lệnh `npm install --legacy-peer-deps`.
- **Lỗi 502 `FastAPI recommendation service is unavailable`:**
  - *Nguyên nhân:* Server FastAPI chưa chạy ở cổng 8000.
  - *Xử lý:* Chạy `docker compose --profile api up -d` để bật container API.
- **Reset làm mới hoàn toàn dữ liệu cơ sở dữ liệu:**
  ```powershell
  docker compose down -v
  docker compose up -d --build
  ```


## Hai tầng tách bạch

**1. Gợi ý phối đồ — `POST /api/recommendations` → FastAPI `POST /recommendations`**

Hoàn toàn bằng rule engine, không gọi LLM. Engine đọc `wardrobe.outfit_catalog` và
`wardrobe.styling_items`, sinh candidate rồi chấm điểm theo trọng số:
màu sắc 25%, phong cách 20%, bối cảnh 20%, văn hóa 35%.

**Thiếu dữ liệu không bị quy thành điểm trung bình.** Mỗi tiêu chí có ba trạng thái:
khớp (10), có dữ liệu nhưng không khớp (4.5), và `null` = database chưa có dữ liệu.
Tiêu chí `null` bị loại khỏi công thức và trọng số của nó được **chia lại** cho các
tiêu chí còn lại. Nhờ vậy áo ngũ thân và áo yếm (có `occasion` rỗng theo đúng chủ ý
trong `04_update_type_information.sql`) không bị trừ oan ở mọi bối cảnh. Response trả
kèm `score_basis` nói rõ điểm được tính trên tiêu chí nào và trọng số hiệu dụng là bao
nhiêu; điểm bằng nhau thì outfit được chấm trên nhiều tiêu chí hơn được xếp trước.

Hai thứ tách bạch, không trộn:

- `warnings` của mỗi outfit: CHỈ cảnh báo về cách phối/văn hoá của riêng outfit đó.
- `data_quality` ở cấp response: tình trạng kiểm duyệt của cả database, nói một lần.
  Trước đây cảnh báo "metadata chờ kiểm duyệt" bị nhân bản vào mọi outfit nên thành
  tiếng ồn và làm người dùng bỏ qua luôn cảnh báo văn hoá thật.

`max_per_category` (mặc định 2) giới hạn số outfit cùng một loại trang phục. Quota
được áp **sau** khi sắp theo điểm nên không bao giờ đảo thứ tự điểm. Frontend nhận
danh sách này y nguyên và không được xếp hạng lại.

```json
{ "occasion": "Tết", "style": "Hiện đại", "color": "Đỏ", "limit": 5 }
```

Trả về kèm `mockup_2d.layers` (mỗi lớp có `z_index`) — frontend vẽ mockup đúng theo thứ tự này.

**Một nguồn dữ liệu, không trộn.** `App.tsx` dùng `apiOutfits ?? localOutfits` — dữ liệu
dự phòng cục bộ (`OUTFIT_SETS`) chỉ vào khi engine không trả được kết quả, không bao giờ
trộn song song với kết quả thật. Step 2 luôn hiện badge nguồn dữ liệu, kể cả khi thành công.

**Không đắp dữ liệu mẫu lên món đồ thật.** `toGarmentItem` dựng object tường minh, không
spread `OUTFIT_SETS`. Field nào database chưa có (`era`, `material`, `do_notes`…) thì để
`undefined` và giao diện ẩn đi — không hiện giá trị của một outfit mẫu khác kèm nhãn nguồn.
Badge "đã kiểm duyệt" suy từ `review_status`, không suy từ điểm số.

**2. Tư vấn phối đồ — `POST /api/ai-styling` → FastAPI `POST /advice`** *(đang TẮT ở UI)*

Khối UI tư vấn trong `Step4CompleteOutfit.tsx` đang tắt bằng cờ `ENABLE_AI_ADVICE = false`
để khỏi tốn chi phí gọi API. Backend vẫn đầy đủ; đổi cờ thành `true` là bật lại.

Đây là chỗ duy nhất gọi LLM. LLM nhận outfit và điểm số mà engine đã chốt, và bị ràng buộc:

- prompt cấm thêm/bớt/thay item và cấm tự chấm điểm;
- sau khi trả về, backend ghi đè lại điểm số và cảnh báo bằng giá trị của engine;
- tip nào không nhắc tới món có thật trong outfit thì bị loại.

Nếu LLM chưa cấu hình hoặc gọi lỗi, endpoint vẫn trả tư vấn theo luật, kèm `llm_error`
nói rõ lý do — không còn fallback im lặng.

## Cấu hình LLM

Đặt `LLM_PROVIDER` trong `.env` là một trong `gemini | openai | anthropic | openrouter | none`
rồi điền API key tương ứng. Mọi provider đều gọi qua HTTP nên không cần SDK riêng.

Kiểm tra nhanh provider/model đang dùng: `GET /api/llm/status` (hoặc FastAPI `GET /llm/health`).
Tên model thay đổi theo thời gian — luôn đối chiếu lại với trang model list của provider.

## Dataset ảnh

`public/images/dataset/` chứa trực tiếp các thư mục trang phục (`aodai/`, `aobaba/`, …)
cùng `accessories/` và `footwear/`. Không còn cấp thư mục theo giới tính.
Sau khi thêm/đổi ảnh:

```powershell
npm run seed:generate   # sinh lại SQL import từ thư mục ảnh
npm run check           # đối chiếu ảnh ↔ SQL ↔ dữ liệu dự phòng + cảnh báo metadata
npm run lint            # tsc --noEmit
npm run check:engine    # kiểm chứng bất biến của engine chấm điểm (không cần DB)
```

## Hai file SQL chạy tay

Cả hai **không** nằm trong `database/Dockerfile`, nên không tự chạy khi khởi tạo database:

- **`08_mark_reviewed.sql`** — đường duy nhất để một dòng trở thành `reviewed`. Trước đây
  không có file này nên mọi dòng mắc ở `needs_review`/`draft` và badge "đã kiểm chứng"
  không bao giờ có căn cứ. Đọc nguồn, đối chiếu, rồi bỏ comment từng mã.
- **`09_style_draft.sql`** — bản nháp phân loại `garment_types.style` do Claude đề xuất,
  **chưa đối chiếu nguồn**. Không bắt buộc chạy: engine đã xử lý được cột `style` rỗng.
  Chạy nó chỉ để BẬT thêm tiêu chí phong cách, không phải để sửa lỗi.

`npm run check` không cần database hay mạng. Nó bắt đúng loại lỗi dễ xảy ra nhất:
đổi tên/di chuyển ảnh mà quên sinh lại SQL, SQL trỏ tới ảnh không tồn tại, ảnh lồng
sai cấp thư mục, hoặc dữ liệu dự phòng lệch số với dataset.

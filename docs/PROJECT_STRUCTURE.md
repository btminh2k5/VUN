# VietFashion - Cấu trúc dự án

## Các khu vực chính

```text
src/                        # Frontend React/TypeScript (chỉ code chạy trên trình duyệt)
  App.tsx, main.tsx         # Điểm vào ứng dụng
  components/
    steps/                  # Các bước của luồng chính: StepHeader, Step1 → Step3
    modals/                 # Hộp thoại: dataset, lookbook, quy chuẩn văn hóa
    common/                 # Thành phần dùng chung: nền động, mockup 2D
  types/
    fashion.ts              # GarmentItem, OutfitSet, DatasetVariantRecord
  data/                     # Dữ liệu dự phòng khi engine không trả kết quả
    datasetRecords.ts       # REAL_DATASET_35_ITEMS (35 ảnh trang phục thật)
    garmentItems.ts         # VIET_FASHION_ITEMS (chi tiết từng món)
    outfitSets.ts           # OUTFIT_SETS (bộ phối mẫu)
    options.ts              # Tùy chọn bối cảnh/phong cách/màu + quy chuẩn văn hóa
  services/                 # Gọi API (recommendations, advice)
  utils/                    # Logic dùng chung (matchingEngine dự phòng)
server/                     # Express + Vite dev server (chạy bằng tsx)
  index.ts                  # Điểm vào: route /api/*, phục vụ public/ và dist/
  db.ts                     # Kết nối PostgreSQL
api/                        # Serverless function cho Vercel (giữ ở gốc theo quy ước Vercel)
public/                     # Ảnh và tài nguyên tĩnh
backend/                    # FastAPI: rule engine phối đồ + endpoint tư vấn
  app/                      # Mã nguồn Python
  tests/                    # Kiểm chứng engine chấm điểm
database/                   # Schema, dữ liệu SQL và Dockerfile của database
  Dockerfile                # Image PostgreSQL multi-stage (tự sinh SQL seed)
  postgresql/dataset_v2/    # SQL đánh số theo thứ tự chạy + generator seed
scripts/                    # Script kiểm tra dataset
docs/                       # Tài liệu dự án
compose.yml                 # Điều phối: db mặc định, api/web theo profile
```

## Chạy giao diện

```powershell
npm install --legacy-peer-deps
npm run dev
```

Mở `http://localhost:3000`.

## Chạy API Python tùy chọn

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

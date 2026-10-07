# VietFashion - Cấu trúc dự án

## Các khu vực chính

```text
src/                    # Frontend React/TypeScript
  components/           # Component giao diện
  data/                 # Dữ liệu fallback
  server/               # Kết nối PostgreSQL cho Express
  services/             # Gọi API
  utils/                # Logic dùng chung
public/                 # Ảnh và tài nguyên tĩnh
backend/app/            # API FastAPI tùy chọn
database/               # Schema và dữ liệu SQL
server.ts               # Express + Vite dev server
docker-compose.yml      # PostgreSQL local
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

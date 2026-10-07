# VietFashion AI Stylist

Ứng dụng gợi ý một outfit hoàn chỉnh từ dữ liệu thật trong PostgreSQL: trang phục chính, phụ kiện và giày dép. FastAPI tạo candidate, chấm độ phù hợp theo màu sắc 25%, phong cách 20%, bối cảnh 20% và văn hóa 35%; Gemini chỉ nhận các candidate đã kiểm tra để viết giải thích/cảnh báo.

## Chạy dự án

```powershell
docker compose up -d --build
npm install
npm run dev
```

- Frontend/Express: `http://localhost:3000`
- FastAPI docs: `http://localhost:8000/docs`
- PostgreSQL: `127.0.0.1:5433`

Nếu chưa cấu hình `GEMINI_API_KEY`, recommendation engine vẫn hoạt động và dùng giải thích theo luật. Biến môi trường mẫu nằm trong `.env.example`.

## API recommendation

Frontend gọi `POST /api/recommendations`; Express chuyển tiếp request đến FastAPI. Payload:

```json
{
  "occasion": "Tết",
  "style": "Hiện đại",
  "color": "Đỏ",
  "limit": 5
}
```

FastAPI chỉ đọc `wardrobe.outfit_catalog` và `wardrobe.styling_items`; không dùng danh sách phụ kiện hard-code để trả kết quả.

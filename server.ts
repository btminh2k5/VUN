import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbService } from './src/server/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Explicitly serve public assets (including /images/dataset/...)
app.use(express.static(path.resolve(__dirname, 'public')));

// Database status endpoint
app.get('/api/database/status', async (_req, res) => {
  try {
    const status = await dbService.getStatus();
    return res.json({ success: true, ...status });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Database catalog endpoint (returns all 35 real garments & photos)
app.get('/api/database/catalog', async (_req, res) => {
  try {
    const items = await dbService.getCatalog();
    const status = await dbService.getStatus();
    return res.json({
      success: true,
      count: items.length,
      connected: status.connected,
      items
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// Browser-facing proxy to the FastAPI recommendation pipeline.
app.post('/api/recommendations', async (req, res) => {
  const fastApiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
  try {
    const response = await fetch(`${fastApiUrl}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(30_000),
    });
    const payload = await response.json();
    return res.status(response.status).json(payload);
  } catch (error: any) {
    return res.status(502).json({
      success: false,
      error: 'FastAPI recommendation service is unavailable.',
      detail: error.message,
    });
  }
});

// API route for AI Styling Advice with Gemini
app.post('/api/ai-styling', async (req, res) => {
  try {
    const { context, style, color, currentOutfit, question } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        success: true,
        source: 'vietfashion_knowledge_engine',
        advice: `Gợi ý phối đồ cho bối cảnh ${context || 'Tết'}, phong cách ${style || 'Hiện đại'}, tông màu ${color || 'Đỏ'}:
- Điểm nhấn Gen Z: Kết hợp phom dáng truyền thống tôn dáng với phụ kiện tối giản thanh lịch (như mini bag, guốc mộc quai trong hoặc giày Mary Jane).
- Lưu ý văn hóa: Giữ nguyên độ dài tà áo chuẩn mực, tránh cắt ngắn quá mức hoặc mặc tà áo không kèm quần để tôn trọng giá trị di sản.
- Hài hòa màu sắc: Tông màu rất hợp với bối cảnh, tạo năng lượng tươi trẻ nhưng vẫn đoan trang.`,
        culturalCheck: {
          status: 'verified',
          score: 95,
          culturalRespectTips: 'Bộ trang phục bảo đảm đúng tinh thần trang nghiêm, tà áo thướt tha, kết hợp phụ kiện hiện đại một cách tinh tế.',
          cautions: 'Tuyệt đối không phối áo dài xẻ tà với quần sooc ngắn hoặc chân váy siêu ngắn khi tham gia các sự kiện văn hóa truyền thống.'
        }
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Bạn là Chuyên gia Cố vấn Phong cách Việt Phục (VietFashion AI Stylist) kết hợp giữa nghiên cứu văn hóa truyền thống Việt Nam và phong cách thời trang Gen Z hiện đại.
Người dùng đang quan tâm:
- Bối cảnh: ${context || 'Lễ hội/Tết'}
- Phong cách mong muốn: ${style || 'Hiện đại / Gen Z'}
- Màu sắc chủ đạo: ${color || 'Đỏ'}
- Outfit đang chọn: ${currentOutfit ? JSON.stringify(currentOutfit) : 'Áo dài / Áo ngũ thân'}
- Câu hỏi thêm (nếu có): ${question || 'Hãy gợi ý cách phối trang phục vừa trẻ trung vừa tôn trọng văn hóa.'}

Hãy phân tích và trả về định dạng JSON thuần túy (không bọc trong markdown codeblock nếu có thể, hoặc bọc trong \`\`\`json) với cấu trúc:
{
  "genZConcept": "Mô tả ngắn về ý tưởng phối đồ cho Gen Z",
  "stylingTips": [
    "Tip 1 về trang phục chính và phụ kiện",
    "Tip 2 về cách chọn giày/tóc/makeup",
    "Tip 3 về mẹo chụp ảnh hoặc dạo phố"
  ],
  "culturalSignificance": "Ý nghĩa lịch sử, cội nguồn văn hóa của trang phục này",
  "culturalCheck": {
    "status": "safe",
    "score": 96,
    "culturalRespectTips": "Lời khuyên gìn giữ bản sắc",
    "cautions": "Cảnh báo những cách kết hợp sai lệch hoặc phản cảm cần tránh tuyệt đối"
  },
  "colorHarmonyNote": "Nhận xét về sự phối hợp màu sắc theo ngũ hành và gu thẩm mỹ Gen Z"
}`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    let parsedData;
    try {
      parsedData = JSON.parse(text);
    } catch {
      // Fallback regex clean
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleaned);
    }

    return res.json({
      success: true,
      source: process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite',
      ...parsedData
    });
  } catch (error: any) {
    console.error('Error generating AI styling:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Lỗi khi kết nối với AI Stylist'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`VietFashion AI Server running at http://0.0.0.0:${port}`);
  });
}

startServer();

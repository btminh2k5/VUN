import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dbService } from './db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Explicitly serve public assets (including /images/dataset/...)
app.use(express.static(path.resolve(__dirname, '..', 'public')));

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

// Browser-facing proxy to the FastAPI advice endpoint.
// LLM chỉ được gọi ở đây, và FastAPI buộc nó tuân theo kết quả rule engine.
app.post('/api/ai-styling', async (req, res) => {
  const fastApiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
  const { occasion, style, color, outfitId, limit } = req.body ?? {};
  try {
    const response = await fetch(`${fastApiUrl}/advice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        occasion: occasion || 'Tết',
        style: style || 'Hiện đại',
        color: color || 'Đỏ',
        limit: limit ?? 5,
        outfit_id: outfitId ?? null,
      }),
      signal: AbortSignal.timeout(45_000),
    });
    const payload = await response.json();
    return res.status(response.status).json(payload);
  } catch (error: any) {
    return res.status(502).json({
      success: false,
      error: 'FastAPI advice service is unavailable.',
      detail: error.message,
    });
  }
});

// Reports which LLM provider/model the advice endpoint is using. Never returns keys.
app.get('/api/llm/status', async (_req, res) => {
  const fastApiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
  try {
    const response = await fetch(`${fastApiUrl}/llm/health`, { signal: AbortSignal.timeout(5_000) });
    return res.status(response.status).json(await response.json());
  } catch (error: any) {
    return res.status(502).json({ enabled: false, reason: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
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

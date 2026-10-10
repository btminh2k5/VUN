export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

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
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const fastApiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
  try {
    const response = await fetch(`${fastApiUrl}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
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
}

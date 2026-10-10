export default async function handler(_req: any, res: any) {
  const fastApiUrl = process.env.FASTAPI_URL || 'http://127.0.0.1:8000';
  try {
    const response = await fetch(`${fastApiUrl}/llm/health`, {
      signal: AbortSignal.timeout(5_000),
    });
    return res.status(response.status).json(await response.json());
  } catch (error: any) {
    return res.status(502).json({ enabled: false, reason: error.message });
  }
}

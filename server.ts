import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { fetchWeatherData } from './src/server/weatherService';
import { generateWeatherAdvisory } from './src/server/geminiService';
import { evaluateRiskAlert } from './src/utils/riskEvaluator';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      app: 'MausamRakshak',
      theme: 'Sabz Pakistan',
      openWeatherKeySet: !!process.env.OPENWEATHER_API_KEY,
      geminiKeySet: !!process.env.GEMINI_API_KEY,
    });
  });

  // 2. Weather endpoint (Server-side & Secure)
  app.get('/api/weather', async (req, res) => {
    try {
      const city = req.query.city ? String(req.query.city) : undefined;
      const lat = req.query.lat ? parseFloat(String(req.query.lat)) : undefined;
      const lon = req.query.lon ? parseFloat(String(req.query.lon)) : undefined;

      const weather = await fetchWeatherData(city, lat, lon);
      const riskAlert = evaluateRiskAlert(weather);

      res.json({
        weather,
        riskAlert,
      });
    } catch (err: any) {
      console.error('API /api/weather error:', err);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });

  // 3. AI Gemini Advisory endpoint
  app.post('/api/advisory', async (req, res) => {
    try {
      const { weather, userQuestion } = req.body;
      if (!weather) {
        return res.status(400).json({ error: 'Weather object is required' });
      }

      const advisory = await generateWeatherAdvisory(weather, userQuestion);
      res.json({ advisory });
    } catch (err: any) {
      console.error('API /api/advisory error:', err);
      res.status(500).json({ error: 'Failed to generate advisory' });
    }
  });

  // 4. Vite middleware integration for dev vs static server for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MausamRakshak] Sabz Pakistan Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});

import express from 'express';
import apiRouter from './routes/api';
import { connectDatabase } from './db';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (_req, res) => {
  res.json({
    status: 'OctoFit Tracker API is running',
    apiBaseUrl: API_BASE_URL,
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

connectDatabase()
  .then(() => {
    console.log(`API base URL: ${API_BASE_URL}`);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

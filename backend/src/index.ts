import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { config } from '@/config/environment';
import { errorHandler } from '@/middleware/errorHandler';
import logger from '@/utils/logger';
import healthRoutes from '@/routes/health';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: config.api.corsOrigin }));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg) } }));

app.use('/api', healthRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler as any);

const PORT = config.api.port;
app.listen(PORT, () => {
  logger.info(`🚀 Last-Mile CRM API running on port ${PORT}`);
  logger.info(`Environment: ${config.env}`);
});

export default app;
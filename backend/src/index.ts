/**
 * Express API Entry Point
 * Last-Mile CRM Backend Server
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { config } from '@/config/environment';
import { errorHandler } from '@/middleware/errorHandler';
import logger from '@/utils/logger';
import healthRoutes from '@/routes/health';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: config.api.corsOrigin }));
app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg) } }));

// Routes
app.use('/api', healthRoutes);

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    statusCode: 404,
    timestamp: new Date().toISOString(),
  });
});

// Error Handler (Must be last)
app.use(errorHandler as any);

// Start Server
const PORT = config.api.port;
app.listen(PORT, () => {
  logger.info(`🚀 Last-Mile CRM API running on port ${PORT}`);
  logger.info(`Environment: ${config.env}`);
});

export default app;

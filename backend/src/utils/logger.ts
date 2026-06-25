import winston from 'winston';
import { config } from '@/config/environment';

const logFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  let meta = '';
  if (Object.keys(metadata).length > 0) {
    meta = JSON.stringify(metadata);
  }
  return `${timestamp} [${level.toUpperCase()}]: ${message} ${meta}`;
});

export const logger = winston.createLogger({
  level: config.logging.level,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  defaultMeta: { service: 'last-mile-crm-api' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${config.logging.dir}/error.log`, level: 'error' }),
    new winston.transports.File({ filename: `${config.logging.dir}/combined.log` }),
  ],
});

export default logger;
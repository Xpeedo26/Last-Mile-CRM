/**
 * Error Handling Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from '@/utils/response';
import logger from '@/utils/logger';

export class ApiError extends Error {
  constructor(
    public statusCode: number = 500,
    message: string = 'Internal Server Error',
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    logger.error(err.message, { statusCode: err.statusCode });
    return res.status(err.statusCode).json(createErrorResponse(err.message, err.message, err.statusCode));
  }

  logger.error(err.message || 'Unknown error');
  return res.status(500).json(
    createErrorResponse(
      err.message || 'Internal Server Error',
      'An unexpected error occurred',
      500
    )
  );
};

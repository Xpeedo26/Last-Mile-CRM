/**
 * Validation Middleware
 * Request validation using Joi
 */

import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ApiError } from './errorHandler';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(', ');
      throw new ApiError(400, messages);
    }

    req.body = value;
    next();
  };
};

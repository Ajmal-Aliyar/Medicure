import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function errorHandler(
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const description = err.description || 'An unexpected error occurred';

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    description,
  });
}

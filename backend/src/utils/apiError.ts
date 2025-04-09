export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public description: string;

  constructor(statusCode: number, message: string, description: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.description = description;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, description: string): ApiError {
    return new ApiError(400, message, description);
  }

  static notFound(message: string, description: string): ApiError {
    return new ApiError(404, message, description);
  }

  static internal(message: string, description: string): ApiError {
    return new ApiError(500, message, description);
  }
}

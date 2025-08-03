import { PaginationMeta } from "@/interfaces";
import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  meta?: PaginationMeta
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data: data ?? null,
    ...(meta && { meta })
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: any
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: errors ?? null,
  });
};

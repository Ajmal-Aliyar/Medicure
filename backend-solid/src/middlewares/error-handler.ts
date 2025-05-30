import { NextFunction, Request, Response } from "express";
import { BaseError } from "@/errors";
import { errorResponse } from "@/utils";
import { GLOBAL_MESSAGES, HTTP_STATUS, } from "@/constants";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof BaseError) {
    return errorResponse(res, err.statusCode, err.message);
  }

  console.error("Unhandled Error:", err);
  return errorResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, GLOBAL_MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
};

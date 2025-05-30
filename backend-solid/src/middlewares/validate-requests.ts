import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@/errors";

export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    console.log('request reached validate request');
    
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstError = result.error.errors[0];
      const path = firstError.path.join(".");
      const message = `${firstError.message}`;
      return next(new BadRequestError(message));
    }

    req.body = result.data;
    next();
  };
};

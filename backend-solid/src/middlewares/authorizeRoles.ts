import { Request, Response, NextFunction } from "express";
import { ForbiddenError } from "@/errors";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      throw new ForbiddenError();
    }
    next();
  };
};

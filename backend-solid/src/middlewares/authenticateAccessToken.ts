import { GLOBAL_MESSAGES } from "@/constants/messages";
import { UnauthorizedError } from "@/errors";
import { TYPES } from "@/di/types";
import { NextFunction, Request, Response } from "express";
import { getContainer } from "@/di";
import { ITokenService } from "@/interfaces";
import jwt from "jsonwebtoken";
export const authenticateAccessToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const container = getContainer();
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.ACCESS_TOKEN_MISSING);
    }

    const tokenService = container.get<ITokenService>(TYPES.TokenService);

    const { id, role } = tokenService.verifyAccessToken(token);
    if (!id || !role) {
      throw new UnauthorizedError(GLOBAL_MESSAGES.ERROR.ACCESS_TOKEN_MISSING);
    }

    req.user = {
      id,
      role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new UnauthorizedError(GLOBAL_MESSAGES.ERROR.ACCESS_TOKEN_EXPIRED)
      );
    }

    console.log("Access Token Error:", error);
    next(error);
  }
};

import { GLOBAL_MESSAGES } from "@/constants/messages";
import { UnauthorizedError } from "@/errors";
import { TYPES } from "@/di/types";
import { TokenService } from "@/services";
import { NextFunction, Request, Response } from "express";
import { getContainer } from "@/di";

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

    const tokenService = container.get<TokenService>(TYPES.TokenService);

    const { id, role } = tokenService.verifyAccessToken(token);
    console.log("RM-LOG",'ID<ROLE',id, role);
    

    req.user = {
      id, role
    };

    next();
  } catch (error) {
    next(error)
  }
};

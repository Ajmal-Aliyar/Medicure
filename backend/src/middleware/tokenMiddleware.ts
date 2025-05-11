import { Request, Response, NextFunction } from "express";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/tokenUtil";

declare global {
  namespace Express {
    interface Request {
      client?: {
        _id: string;
        role: string;
        isApproved?: boolean;
      };
    }
  }
}
export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const accessToken = req?.cookies?.accessToken ?? null;
    const refreshToken = req?.cookies?.refreshToken ?? null;
    
    if (!accessToken && !refreshToken) {
      res.status(403).json("Access denied, no token provided");
      return
    }

    if (accessToken) {
      try {
        const decoded = verifyAccessToken(accessToken);
        req.client = decoded;
        
        next();
        return
      } catch (error) {
        console.error("Invalid access token:", error);
        res.status(403).send("Invalid access token");
      }
    }

    if (refreshToken) {
      try {
        const refreshDecoded = verifyRefreshToken(refreshToken);
        const { _id, role, isApproved } = refreshDecoded;
        const newAccessToken = generateAccessToken({ _id, role, isApproved });
        res.cookie("accessToken", newAccessToken, {
          httpOnly: false,
          maxAge: 15 * 60 * 1000,
          secure: true,
        });
        req.client = refreshDecoded;
        next();
        return
      } catch (error) {
        console.error("Refresh token error:", error);
        res.status(403).send("Invalid or expired refresh token");
      }
    }

    res.status(303).json({ message: "User not logined"});
    return 
  } catch (error) {
    console.error("Unexpected error in tokenMiddleware:", error);
    res.status(500).send("Internal server error");
  }
};

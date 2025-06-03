import { Request, Response } from "express";

export interface IAuthController {
    login(req: Request, res: Response ): Promise<void>;
    register(req: Request, res: Response ): Promise<void>;
    verifyOtpAndRegister(req: Request, res: Response ): Promise<void>;
    refreshToken(req: Request, res: Response ): Promise<void>;
    logout(req: Request, res: Response ): Promise<void>;
    me(req: Request, res: Response ): Promise<void>;
}
import { NextFunction, Request, Response } from "express";

export interface IAuthController {
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    verifyOtpAndRegister(req: Request, res: Response, next: NextFunction): Promise<void>;
    refreshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
    me(req: Request, res: Response, next: NextFunction): Promise<void>;
}
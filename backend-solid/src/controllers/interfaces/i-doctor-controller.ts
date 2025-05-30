import { NextFunction, Request, Response } from "express";

export interface IDoctorController {
  updateProfileImage( req: Request, res: Response, next: NextFunction): Promise<void>;
}

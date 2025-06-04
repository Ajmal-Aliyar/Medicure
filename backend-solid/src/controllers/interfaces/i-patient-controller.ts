import { Request, Response } from "express";

export interface IPatientController {
    getProfileDetails( req: Request, res: Response): Promise<void>;
    updateProfile(req: Request, res: Response): Promise<void>;
    updateProfileImage(req: Request, res: Response): Promise<void>;
}
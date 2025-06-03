import { Request, Response } from "express";

export interface IPatientController {
    getProfileDetails( req: Request, res: Response): Promise<void>;
}
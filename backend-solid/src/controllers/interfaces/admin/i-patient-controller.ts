import { Request, Response } from "express";

export interface IAdminPatientController {
  getPatientProfile(req: Request, res: Response): Promise<void>;
  blockPatient(req: Request, res: Response): Promise<void>;
  unblockPatient(req: Request, res: Response): Promise<void>;
  getPatientsSummary(req: Request, res: Response): Promise<void>;
}

import { Request, Response } from "express";

export interface IAdminDoctorController {
  getDoctorsByReviewStatus(req: Request, res: Response): Promise<void>;
  getDoctorApprovalDetails(req: Request, res: Response): Promise<void>;
  updateDoctorStatus(req: Request, res: Response): Promise<void>;
  blockDoctor(req: Request, res: Response): Promise<void>;
  unblockDoctor(req: Request, res: Response): Promise<void>
}

import { NextFunction, Request, Response } from "express";

export interface IDoctorController {
  updateProfileImage( req: Request, res: Response): Promise<void>;
  getProfileDetails( req: Request, res: Response): Promise<void>;
  updateProfile( req: Request, res: Response): Promise<void>;
  getProfessionalDetails( req: Request, res: Response): Promise<void>;
  updateProfessionalDetails( req: Request, res: Response): Promise<void>;
  getVerificationProofs( req: Request, res: Response): Promise<void>;
  updateVerificationProofs(req: Request, res: Response): Promise<void>;
  submitForReview(req: Request, res: Response): Promise<void>;
}

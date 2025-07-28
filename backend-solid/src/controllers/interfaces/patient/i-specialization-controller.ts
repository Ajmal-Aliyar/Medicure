import { Request, Response } from "express";

export interface IPatientSpecializationController {
  getPublicDetails(_req: Request, res: Response): Promise<void>;
}

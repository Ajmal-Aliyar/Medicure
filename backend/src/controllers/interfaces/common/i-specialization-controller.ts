import { Request, Response } from "express";

export interface ISpecializationController {
  getPublicDetails(_req: Request, res: Response): Promise<void>;
  getSpecializationDetails(req: Request, res: Response): Promise<void>;
}

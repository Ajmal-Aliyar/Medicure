import { Request, Response } from "express";

export interface IDoctorSlotController {
  getSlotsByDoctorAndDate(req: Request, res: Response): Promise<void>;
}

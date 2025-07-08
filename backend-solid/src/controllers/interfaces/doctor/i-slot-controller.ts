import { Request, Response } from "express";

export interface IDoctorSlotController {
  getSlots(req: Request, res: Response): Promise<void>;
}

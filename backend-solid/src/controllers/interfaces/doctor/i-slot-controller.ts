import { Request, Response } from "express";

export interface IDoctorSlotController {
  updateSlotStatus (
    req: Request,
    res: Response
  ): Promise<void>
  getSlotDashboard(
    req: Request,
    res: Response
  ): Promise<void> 
}

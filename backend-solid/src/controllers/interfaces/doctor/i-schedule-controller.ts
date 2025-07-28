import { Request, Response } from "express";

export interface IDoctorScheduleController {
  getSchedule(req: Request, res: Response): Promise<void>;
  updateSchedule(req: Request, res: Response): Promise<void>;
}

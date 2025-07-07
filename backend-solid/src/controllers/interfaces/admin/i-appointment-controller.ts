import { Request, Response } from "express";

export interface IAdminAppointmentController {
    getAppointmentsByAdminId(
    req: Request,
    res: Response
  ): Promise<void>
}
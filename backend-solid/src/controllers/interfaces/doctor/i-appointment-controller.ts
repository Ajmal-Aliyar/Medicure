import { Request, Response } from "express";

export interface IDoctorAppointmentController {
    getAppointmentsByDoctorId(
    req: Request,
    res: Response
  ): Promise<void>
}
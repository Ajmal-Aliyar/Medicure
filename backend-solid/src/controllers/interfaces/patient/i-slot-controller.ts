import { Request, Response } from "express";

export interface IPatientSlotController {
    getDoctorSlotsForBooking(req: Request, res: Response): Promise<void>
}
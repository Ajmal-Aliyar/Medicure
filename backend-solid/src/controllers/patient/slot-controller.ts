import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { successResponse } from "@/utils";
import { IPatientSlotController } from "../interfaces";
import { HTTP_STATUS } from "@/constants";
import { IPatientSlotService } from "@/services";

@injectable()
export class PatientSlotController implements IPatientSlotController{
  constructor(
    @inject(TYPES.PatientSlotService)
    private readonly slotService: IPatientSlotService
  ) {}

   getDoctorSlotsForBooking = async (req: Request, res: Response): Promise<void> => {
    const { doctorId, date } = req.query;
    const result = await this.slotService.getDoctorSlotsForBooking(
      String(doctorId),
      String(date),
      {skip: 0, limit: Infinity}
    );
    successResponse(res, HTTP_STATUS.OK, "Available slots for booking", result);
  }
  
}

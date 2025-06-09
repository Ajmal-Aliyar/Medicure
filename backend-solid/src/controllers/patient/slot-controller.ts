import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { ISlotService } from "@/services";
import { getPaginationParams, successResponse } from "@/utils";
import { IPatientSlotController } from "../interfaces";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class PatientSlotController implements IPatientSlotController{
  constructor(
    @inject(TYPES.SlotService)
    private readonly slotService: ISlotService
  ) {}

  async getDoctorSlotsForBooking(req: Request, res: Response) {
    const { doctorId, date } = req.query;
    const pagination = getPaginationParams(req)
    // const slots = await this.slotService.getAvailableSlots(
    //   String(doctorId),
    //   new Date(String(date))
    // );
    return successResponse(res, HTTP_STATUS.OK, "Available slots for booking", );
  }
  
}

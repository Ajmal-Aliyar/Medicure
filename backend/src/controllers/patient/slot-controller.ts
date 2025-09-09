import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { IPatientSlotController } from "../interfaces";
import { HTTP_STATUS } from "@/constants";
import { IPatientSlotService } from "@/services";

@injectable()
export class PatientSlotController implements IPatientSlotController{
  constructor(
    @inject(TYPES.PatientSlotService)
    private readonly _slotService: IPatientSlotService
  ) {}

   getDoctorSlotsForBooking = async (req: Request, res: Response): Promise<void> => {
    const { doctorId, date } = req.query;
     const pagination = getPaginationParams(req);
    const { slots, total} = await this._slotService.getDoctorSlotsForBooking(
      String(doctorId),
      String(date),
      pagination
    );
     const meta = buildPaginationMeta(total, pagination.skip);
    successResponse(res, HTTP_STATUS.OK, "Available slots for booking", slots, meta);
  }
  
}

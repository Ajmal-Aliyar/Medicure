import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { successResponse } from "@/utils";
import { HTTP_STATUS, SLOT_MESSAGES } from "@/constants";
import { IDoctorSlotController } from "../interfaces";
import { IDoctorSlotService } from "@/services";

@injectable()
export class DoctorSlotController implements IDoctorSlotController {
  constructor(
     @inject(TYPES.DoctorSlotService)
    private readonly doctorSlotService: IDoctorSlotService
  ) {}

  updateSlotStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const {id} = req.user; 
    const { slotId } = req.params;
    const { isActive } = req.body;
 
    const updatedSlot = await this.doctorSlotService.updateSlotStatus(id, slotId, isActive);
    successResponse(res, HTTP_STATUS.OK, SLOT_MESSAGES.SLOT_FETCHED, {
      id: updatedSlot._id,
      ...updatedSlot.toObject?.(), 
    });
  }

  getSlotDashboard = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const {id} = req.user; 
    const { startDate, endDate } = req.query
 
    const data = await this.doctorSlotService.getSlotsForDashboard(id, String(startDate), String(endDate));
    successResponse(res, HTTP_STATUS.OK, SLOT_MESSAGES.SLOT_FETCHED, data);
  }
}

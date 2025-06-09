import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { ISlotService } from "@/services";
import { getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IDoctorSlotController } from "../interfaces";

@injectable()
export class DoctorSlotController implements IDoctorSlotController {
  constructor(
    @inject(TYPES.SlotService)
    private readonly slotService: ISlotService
  ) {}

  async createSlots(req: Request, res: Response) {
    const doctorId = req.user.id;
    // const slots = await this.slotService.createSlotsForDoctor(doctorId, req.body);
    return successResponse(res, HTTP_STATUS.CREATED, "Slots created successfully");
  }

  async getMySlots(req: Request, res: Response) {
    const doctorId = req.user.id;
    const pagination = getPaginationParams(req)
    // const slots = await this.slotService.getAllSlotsByDoctor(doctorId, pagination);
    return successResponse(res, HTTP_STATUS.OK, "Your slots fetched",);
  }

  async deleteSlot(req: Request, res: Response) {
    const doctorId = req.user.id;
    const { slotId } = req.params;
    // await this.slotService.deleteSlotById(slotId, doctorId);
    return successResponse(res, HTTP_STATUS.OK, "Slot deleted");
  }
}

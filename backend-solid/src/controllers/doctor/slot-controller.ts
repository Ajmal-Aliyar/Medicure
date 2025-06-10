import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS, SLOT_MESSAGES } from "@/constants";
import { IDoctorSlotController } from "../interfaces";
import { IDoctorSlotService } from "@/services";
import { getSlotsByDoctorAndDateSchema } from "@/validators";
import { BadRequestError } from "@/errors";

@injectable()
export class DoctorSlotController implements IDoctorSlotController {
  constructor(
    @inject(TYPES.DoctorSlotService)
    private readonly doctorSlotService: IDoctorSlotService
  ) {}

  getSlotsByDoctorAndDate = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const validation = getSlotsByDoctorAndDateSchema.safeParse(req.query);

    if (!validation.success) {
      throw new BadRequestError("Validation failed");
    }
    const { date, isActive, status } = validation.data;
    const doctorId = req.user.id;
    const data = await this.doctorSlotService.getSlotsByDoctorAndDate(
      doctorId,
      date,
      status,
      isActive
    );
    successResponse(res, HTTP_STATUS.OK, SLOT_MESSAGES.SLOT_FETCHED, data);
  };

  async createSlots(req: Request, res: Response) {
    const doctorId = req.user.id;
    // const slots = await this.slotService.createSlotsForDoctor(doctorId, req.body);
    return successResponse(
      res,
      HTTP_STATUS.CREATED,
      "Slots created successfully"
    );
  }

  async getMySlots(req: Request, res: Response) {
    const doctorId = req.user.id;
    const pagination = getPaginationParams(req);
    // const slots = await this.slotService.getAllSlotsByDoctor(doctorId, pagination);
    return successResponse(res, HTTP_STATUS.OK, "Your slots fetched");
  }

  async deleteSlot(req: Request, res: Response) {
    const doctorId = req.user.id;
    const { slotId } = req.params;
    // await this.slotService.deleteSlotById(slotId, doctorId);
    return successResponse(res, HTTP_STATUS.OK, "Slot deleted");
  }
}

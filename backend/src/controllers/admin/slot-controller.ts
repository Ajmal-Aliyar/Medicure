import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { ISlotService } from "@/services";
import { getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IAdminSlotController } from "../interfaces";

@injectable()
export class AdminSlotController implements IAdminSlotController {
  constructor(
    // @inject(TYPES.SlotService)
    // private readonly slotService: ISlotService
  ) {}

   getDoctorSlots = async(req: Request, res: Response): Promise<void> => {
    const { doctorId } = req.params;
    const pagination = getPaginationParams(req)
    // const slots = await this.slotService.getAllSlotsByDoctor(doctorId);
    successResponse(res, HTTP_STATUS.OK, "Doctor slots retrieved", );
  }
}

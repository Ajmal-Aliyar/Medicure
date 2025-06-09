import { injectable } from "inversify";
import { ISlotController } from "../interfaces";
import { Request, Response } from "express";
import { getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class SlotController implements ISlotController {
  constructor() {}

  getAvailableSlotsByDoctor = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { doctorId, date } = req.query;
    const pagination = getPaginationParams(req);
    // const slots = await this.slotService.getSlotsByDoctorAndDate(
    //   String(doctorId),
    //   new Date(String(date)),
    //   pagination
    // );
    successResponse(res, HTTP_STATUS.OK, "Slots fetched successfully");
  };
}

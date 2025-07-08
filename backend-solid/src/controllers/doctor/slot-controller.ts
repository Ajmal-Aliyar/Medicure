import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS, SLOT_MESSAGES } from "@/constants";
import { IDoctorSlotController } from "../interfaces";
import { ISlotService } from "@/services";
import { filterSlotQuerySchema } from "@/validators/slot-validator";

@injectable()
export class DoctorSlotController implements IDoctorSlotController {
  constructor(
    @inject(TYPES.SlotService)
    private readonly slotService: ISlotService
  ) {}

  getSlots = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const parsedQuery = filterSlotQuerySchema.parse(req.query);
    const pagination = getPaginationParams(req);
    const { id, role } = req.user;

    const { slots, total } = await this.slotService.getSlots( id, role, parsedQuery, pagination);
     const meta = buildPaginationMeta(total, pagination.limit);
    successResponse(res, HTTP_STATUS.OK, SLOT_MESSAGES.SLOT_FETCHED, slots, meta);
  };  

  
}

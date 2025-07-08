import { inject, injectable } from "inversify";
import { ISlotController } from "../interfaces";
import { Request, Response } from "express";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS, SLOT_MESSAGES } from "@/constants";
import { filterSlotQuerySchema } from "@/validators/slot-validator";
import { ISlotService } from "@/services";
import { TYPES } from "@/di/types";

@injectable()
export class SlotController implements ISlotController {
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

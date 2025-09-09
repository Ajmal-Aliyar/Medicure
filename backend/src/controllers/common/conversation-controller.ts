import { TYPES } from "@/di/types";
import { IConversationService } from "@/services";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IConversationController } from "../interfaces";

@injectable()
export class ConversationController implements IConversationController {
    constructor(
        @inject(TYPES.ConversationService) private readonly _conversationService: IConversationService
    ) {}

    getConversactions = async(req: Request, res: Response): Promise<void> => {
        const { id } = req.user;
        const pagination = getPaginationParams(req)
        const { data, total} = await this._conversationService.getConversactions( id, pagination )
        const meta = buildPaginationMeta( total, pagination.skip)
        successResponse( res, HTTP_STATUS.CREATED, "Requests fetched successfully.", data, meta)
    }
}
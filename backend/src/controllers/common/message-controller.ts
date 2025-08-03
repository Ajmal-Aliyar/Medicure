import { TYPES } from "@/di/types";
import { IMessageService } from "@/services";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IMessageController } from "../interfaces";

@injectable()
export class MessageController implements IMessageController {
    constructor(
        @inject(TYPES.MessageService) private readonly messageService: IMessageService
    ) {}

    getMessages = async(req: Request, res: Response): Promise<void> => {
        const { id } = req.user;
        const { conversationId } = req.params
        const pagination = getPaginationParams(req)
        const { data, total} = await this.messageService.getMessages( id, conversationId, pagination )
        const meta = buildPaginationMeta( total, pagination.skip)
        successResponse( res, HTTP_STATUS.CREATED, "Messages fetched successfully.", data, meta)
    }
}
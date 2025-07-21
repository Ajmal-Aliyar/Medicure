import { TYPES } from "@/di/types";
import { IConnectionRequestService } from "@/services";
import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IConnectionRequestController } from "../interfaces";

@injectable()
export class ConnectionRequestController implements IConnectionRequestController {
    constructor(
        @inject(TYPES.ConnectionRequestService) private readonly connectionRequestService: IConnectionRequestService
    ) {}

    createConnectionRequest = async(req: Request, res: Response): Promise<void> => {
        const { id, role} = req.user;
        const { doctorId } = req.body;
        const request = await this.connectionRequestService.createRequest( id, role, doctorId )
        successResponse( res, HTTP_STATUS.CREATED, "Request sent successfully.", request)
    }

    approveRequest = async(req: Request, res: Response): Promise<void> => {
        const { id } = req.user;
        const { requestId } = req.params;
        await this.connectionRequestService.approveRequest( id, requestId )
        successResponse( res, HTTP_STATUS.OK, "Request approved successfully.")
    }
}
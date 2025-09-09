import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IAdminWithdrawRequestService } from "@/services";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";
import { IAdminWithdrawRequestController } from "../interfaces";
import { IWithdrawRequestStatus } from "@/interfaces";

@injectable()
export class AdminWithdrawRequestController implements IAdminWithdrawRequestController {
  constructor(
    @inject(TYPES.AdminWithdrawRequestService) private readonly _withdrawRequestService: IAdminWithdrawRequestService
  ) {}

  getWithdrawRequests = async (req: Request, res: Response): Promise<void> => {
    const { status } = req.query;
    const pagination = getPaginationParams(req)
    const { requests, total } = await this._withdrawRequestService.getWithdrawRequests( status as IWithdrawRequestStatus, pagination);
    const meta = buildPaginationMeta(total, pagination.skip)
    successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequests fetched successfully.",
      requests, meta
    );
  };

  rejectWidthdrawRequest = async (req: Request, res: Response): Promise<void> => {
    const requestId = req.query.requestId as string;
    await this._withdrawRequestService.rejectWidthdrawRequest( requestId  )
     successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequests rejected successfully.",
      true
    );
  }

  approveWithdrawRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const requestId = req.query.requestId as string;
    const transaction = await this._withdrawRequestService.approveWithdrawRequest( id, requestId)
     successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequests approved successfully.",
      transaction
    );
  }
}

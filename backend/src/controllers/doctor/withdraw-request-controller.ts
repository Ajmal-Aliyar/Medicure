import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IDoctorWithdrawRequestService } from "@/services";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";
import { IDoctorWithdrawRequestController } from "../interfaces";
import { IWithdrawRequestStatus } from "@/interfaces";

@injectable()
export class DoctorWithdrawRequestController implements IDoctorWithdrawRequestController {
  constructor(
    @inject(TYPES.DoctorWithdrawRequestService) private readonly WithdrawRequestService: IDoctorWithdrawRequestService
  ) {}

  getWithdrawRequests = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const { status } = req.query;
    const pagination = getPaginationParams(req)
    const { requests, total } = await this.WithdrawRequestService.getWithdrawRequests(id, status as IWithdrawRequestStatus, pagination);
    const meta = buildPaginationMeta(total, pagination.skip)
    successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequests fetched successfully.",
      requests, meta
    );
  };

  cancelWidthdrawRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const requestId = req.query.requestId as string;
    await this.WithdrawRequestService.cancelWidthdrawRequest( id, requestId  )
     successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequests cancelled successfully.",
      true
    );
  }
}

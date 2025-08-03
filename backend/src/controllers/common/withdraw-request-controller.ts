import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IWithdrawRequestService } from "@/services";
import { successResponse } from "@/utils";
import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";
import { IWithdrawRequestController } from "../interfaces";

@injectable()
export class WithdrawRequestController implements IWithdrawRequestController {
  constructor(
    @inject(TYPES.WithdrawRequestService) private readonly WithdrawRequestService: IWithdrawRequestService
  ) {}

  createWithdrawRequest = async (req: Request, res: Response): Promise<void> => {
    const { id , role } = req.user;
    const {request} = req.body;
    const WithdrawRequest = await this.WithdrawRequestService.createWithdrawRequest( id, role, request);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "WithdrawRequest created successfully.",
      WithdrawRequest
    );
  };
}

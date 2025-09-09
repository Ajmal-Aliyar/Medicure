import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";
import { IAdminTransactionController } from "../interfaces";
import { IAdminTransactionService } from "@/services";

@injectable()
export class AdminTransactionController implements IAdminTransactionController {
  constructor(
     @inject(TYPES.AdminTransactionService)
    private readonly _adminTransactionService: IAdminTransactionService
  ) {}

  getTransactionDashboard = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { startDate, endDate } = req.query
    const data = await this._adminTransactionService.getTransactionsForDashboard(String(startDate), String(endDate));
    successResponse(res, HTTP_STATUS.OK, "Transaction details fetched successfully.", data);
  }
}

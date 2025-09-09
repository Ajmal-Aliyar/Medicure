import { inject, injectable } from "inversify";
import { ITransactionController } from "../interfaces";
import { TYPES } from "@/di/types";
import { ITransactionService } from "@/services";
import { buildPaginationMeta, getPaginationParams, successResponse } from "@/utils";
import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class TransactionController implements ITransactionController {
    constructor(
        @inject(TYPES.TransactionService) private readonly _transactionService: ITransactionService
    ) {}

    getTransactions = async (
      req: Request,
      res: Response
    ): Promise<void> => {
      const pagination = getPaginationParams(req);
      const { id, role } = req.user;

    const { transactions, total } = await this._transactionService.getTransactionHistory( id, role, pagination);
       const meta = buildPaginationMeta(total, pagination.skip);
      successResponse(res, HTTP_STATUS.OK, "Transactions fetched successfully.", transactions, meta);
    };  
}
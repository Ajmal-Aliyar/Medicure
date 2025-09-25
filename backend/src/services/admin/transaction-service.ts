import { TYPES } from "@/di/types";
import { ITransactionRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IAdminTransactionService } from "../interfaces";
import { TransactionChartDataDTO } from "@/dtos";

@injectable()
export class AdminTransactionService implements IAdminTransactionService {
  constructor(
    @inject(TYPES.TransactionRepository)
    private _transactionRepo: ITransactionRepository
  ) {}

  async getTransactionsForDashboard(startDate: string, endDate: string): Promise<TransactionChartDataDTO[]> {
    return await this._transactionRepo.getTransactionStatsByDateRange(startDate, endDate)
  }
}

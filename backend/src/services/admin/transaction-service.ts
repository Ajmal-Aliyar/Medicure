import { TYPES } from "@/di/types";
import { ITransactionRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IAdminTransactionService } from "../interfaces";
import { TransactionChartData } from "@/interfaces";

@injectable()
export class AdminTransactionService implements IAdminTransactionService {
  constructor(
    @inject(TYPES.TransactionRepository)
    private transactionRepo: ITransactionRepository
  ) {}

  async getTransactionsForDashboard(startDate: string, endDate: string): Promise<TransactionChartData[]> {
    return await this.transactionRepo.getTransactionStatsByDateRange(startDate, endDate)
  }
}

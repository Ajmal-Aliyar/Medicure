import { ITransaction } from "@/models";
import { BaseRepository } from "../base";
import { IPagination, IRole, TransactionChartData } from "@/interfaces";

export interface ITransactionRepository extends BaseRepository<ITransaction> {
  getTransactionHistory(
    ownerId: string,
    ownerType: IRole,
    pagination: IPagination
  ): Promise<{ transactions: ITransaction[]; total: number }>;
  getTransactionStatsByDateRange(
    startDate: string,
    endDate: string
  ): Promise<TransactionChartData[]>;
}

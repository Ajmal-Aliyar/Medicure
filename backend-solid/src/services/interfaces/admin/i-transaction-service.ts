import { TransactionChartData } from "@/interfaces";

export interface IAdminTransactionService {
    getTransactionsForDashboard(startDate: string, endDate: string): Promise<TransactionChartData[]>
}
import { TransactionChartDataDTO } from "@/dtos";


export interface IAdminTransactionService {
    getTransactionsForDashboard(startDate: string, endDate: string): Promise<TransactionChartDataDTO[]>
}
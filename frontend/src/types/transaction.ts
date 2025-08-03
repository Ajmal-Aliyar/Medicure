
export type TransactionType = "appointment" | "refund" | "withdraw";

export type TransactionDirection = "debit" | "credit";

export type TransactionStatus = "pending" | "success" | "failed";

export interface Transaction  {
       id: string;
    amount: number;
    type: TransactionType;
    direction: TransactionDirection;
    createdAt: Date;
}

export interface TransactionChartData {date: string, totalAmount: number, totalTransactions: number}






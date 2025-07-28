
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





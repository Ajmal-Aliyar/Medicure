import { TransactionType } from "@/models";

export interface TransactionDetails {
    id: string;
    amount: number;
    type: TransactionType;
    doctorId?: string;
    createdAt: Date;
    direction: "credit" | "debit"
}

export interface TransactionChartData {date: string, totalAmount: number, totalTransactions: number}
import { TransactionStatus, TransactionType } from "@/models";
import { Types } from "mongoose";

export interface TransactionChartDataDTO {date: string, totalAmount: number, totalTransactions: number}

export interface TransactionDTO {
    transactionId: string;
      from: Types.ObjectId;
      to: Types.ObjectId;
      amount: number;
      type: TransactionType;
      status: TransactionStatus;
      doctorId?: Types.ObjectId;
      appointmentId?: Types.ObjectId;
      createdAt: Date;
}

export interface TransactionDetailsDTO {
    id: string;
    amount: number;
    type: TransactionType;
    doctorId?: string;
    createdAt: Date;
    direction: "credit" | "debit"
}
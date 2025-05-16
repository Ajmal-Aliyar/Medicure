import { InferSchemaType } from "mongoose";
import { transactionSchema } from "../../models/transaction/transactionSchema";
import { ITransaction } from "../../models/transaction/transactionInterface";

export type ITransactionDocument = InferSchemaType<typeof transactionSchema>;

export interface ITransactionRepository {
  createTransaction(
    transactionId: string,
    senderId: string,
    recieverId: string,
    amount: number,
    status: string
  ): Promise<ITransactionDocument>;
  getTransactions(
    id: string,
    role: string,
    skip: number,
    limit: number
  ): Promise<{ transactions: ITransaction[]; total: number }>;
  updateTransactionStatus(transactionId: string, status: string): Promise<void>;
  getTransactionById(transactionId: string): Promise<ITransaction>;
  getAllTransactions(): Promise<ITransaction[]>;
  getChartDetails(): Promise<{
    "Last 7 Days": { date: string; appointments: number; revenue: number }[];
    "Last 30 Days": { date: string; appointments: number; revenue: number }[];
  }>;
}

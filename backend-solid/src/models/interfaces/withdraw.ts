import { Document } from "mongoose";

export interface IWithdraw extends Document {
  recieverId: string;
  accountNumber: string;
  accountName: string;
  IFSC_Code: string;
  role: "doctor" | "admin";
  amount: number;
  status: "pending" | "approved" | "rejected";
  transactionId?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}
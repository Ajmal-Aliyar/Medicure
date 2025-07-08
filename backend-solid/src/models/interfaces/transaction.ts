import { Document, Types } from "mongoose";

export type TransactionType = "appointment" | "refund" | "withdraw";

export type TransactionStatus = "pending" | "success" | "failed";

export interface ITransaction extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  doctorId?: Types.ObjectId;
  appointmentId?: Types.ObjectId;
  createdAt: Date;
}

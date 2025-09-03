import { IRole } from "@/interfaces";
import mongoose, { Document } from "mongoose";

export interface IWithdrawRequest extends Document {
  _id: mongoose.Types.ObjectId;
  requesterId: mongoose.Types.ObjectId;
  role: IRole;
  amount: number;
  accountNumber: string;
  accountName: string;
  IFSC_Code: string;
  status: "pending" | "approved" | "rejected" | "cancelled";
  comment?: string;
  requestedAt: Date;
  processedAt?: Date;
}

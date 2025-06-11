import mongoose, { Schema } from "mongoose";
import { IWithdraw } from "../interfaces";

export const WithdrawSchema = new Schema<IWithdraw>(
  {
    recieverId: { type: String, required: true },
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    IFSC_Code: { type: String, required: true },
    role: { type: String, enum: ["doctor", "admin"], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    transactionId: { type: String }, 
  },
  { timestamps: true }
);

export const Withdraw = mongoose.model<IWithdraw>("Withdraw", WithdrawSchema);
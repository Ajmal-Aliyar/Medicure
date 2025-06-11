import { Schema, model, Document } from "mongoose";
import { ITransaction } from "../interfaces";

const TransactionSchema = new Schema<ITransaction>(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    senderId: {
      type: String,
    },
    recieverId: {
      type: String,
    },
    type: {
      type: String,
      enum: ["Appointment", "Refund", "Withdraw"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed", "Cancelled"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: "INR",
      uppercase: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Card", "UPI", "Wallet", "BankTransfer"],
      required: true,
    },
    gatewayTransactionId: {
      type: String,
    },
    failureReason: {
      type: String,
    },
    parentTransactionId: {
      type: String,
    },
    description: {
      type: String,
      trim: true,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);

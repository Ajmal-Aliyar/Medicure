import mongoose, { Schema } from "mongoose";
import { IWithdrawRequest } from "../interfaces";

const WithdrawRequestSchema = new Schema<IWithdrawRequest>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["doctor", "patient", "admin"],
    },
    accountNumber: { type: String, required: true },
    accountName: { type: String, required: true },
    IFSC_Code: { type: String, required: true },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    comment: {
      type: String,
      trim: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    processedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const WithdrawRequest = mongoose.model<IWithdrawRequest>(
  "WithdrawRequest",
  WithdrawRequestSchema
);

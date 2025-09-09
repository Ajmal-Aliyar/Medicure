import { Schema, model } from "mongoose";
import { ITransaction } from "../interfaces";

const TransactionSchema = new Schema<ITransaction>(
  {
    from: {
      type:  Schema.Types.ObjectId,
      required: true, 
    },
    to: {
      type:  Schema.Types.ObjectId,
      required: true,
    },
    doctorId: {
      type:  Schema.Types.ObjectId,
      ref: "Doctor",
    },
    amount: {
      type: Number,
      required: true,
      min: 1,
    },
    type: {
      type: String,
      enum: ["appointment", "withdraw", "refund"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      required: true
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);

import { Schema, model } from "mongoose";
import { IWallet } from "../interfaces";

const WalletSchema = new Schema<IWallet>(
  {
    ownerId: {
      type: Schema.Types.ObjectId, 
      required: true,
      index: true,
    },
    ownerType: {
      type: String,
      enum: ["doctor", "patient", "admin"],
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

WalletSchema.index({ ownerId: 1, ownerType: 1 }, { unique: true });

export const Wallet = model<IWallet>("Wallet", WalletSchema);

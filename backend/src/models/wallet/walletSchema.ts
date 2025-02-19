import { InferSchemaType, Schema } from "mongoose";
import { IWalletSchema } from "./walletInterface";

export const WalletSchema: Schema = new Schema<IWalletSchema>({
    ownerId: { type: String, unique: true, required: true },
    balance: { type: Number, default: 0 },
    role: { type: String, enum: ["user", "doctor", "admin"], required: true },
}, { timestamps: true });

export type IWalletDocument = IWalletSchema; 

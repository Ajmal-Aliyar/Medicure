import { Document } from "mongoose";

export interface IWalletSchema extends Document {
    ownerId: string;
    balance: number;
    role: 'user' | 'doctor' | 'admin';
    createdAt: Date;
}

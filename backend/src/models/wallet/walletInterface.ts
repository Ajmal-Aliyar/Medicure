import { Document } from "mongoose";

export interface IWalletSchema extends Document {
    ownerId: string;
    balance: number;
    role: 'patient' | 'doctor' | 'admin';
    createdAt: Date;
}

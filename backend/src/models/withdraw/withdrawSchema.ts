import { Schema } from "mongoose";
import { IWithdrawSchema } from "./withdrawInterface";

export const WithdrawSchema: Schema = new Schema<IWithdrawSchema>({
    recieverId: { type: String, required: true },
    accountNumber: { type: String, required: true },  
    accountName: { type: String, required: true },
    IFSC_Code: { type: String, required: true }, 
    role: { type: String, enum: ['doctor', 'admin'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true }); 



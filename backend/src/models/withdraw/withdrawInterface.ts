import mongoose, { Document, InferSchemaType } from "mongoose";
import { WithdrawSchema } from "./withdrawSchema";

export interface IWithdrawSchema extends Document {
    recieverId: string;
    accountNumber: string; 
    accountName: string;
    IFSC_Code: string;  
    role: 'doctor' | 'admin'; 
    amount: number;  
    status: 'pending' | 'approved' | 'rejected'; 
    createdAt: Date;
    updatedAt: Date;
 }
 
 export type IWithdrawRequests = InferSchemaType<typeof WithdrawSchema>  & { _id: mongoose.Types.ObjectId };
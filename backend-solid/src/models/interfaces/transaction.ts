import { Document, Types } from 'mongoose';
export type TransactionType = 
  | "Appointment"    
  | "Refund"         
  | "Withdraw";


export type TransactionStatus = 
  | "Pending"
  | "Completed" 
  | "Failed"
  | "Cancelled";


export type PaymentMethod = 
  | "Card"
  | "UPI"
  | "Wallet"
  | "BankTransfer"

export interface ITransaction extends Document {
  transactionId: string;    
  senderId?: string;           
  recieverId?: string;          
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;            
  paymentMethod: PaymentMethod;
  gatewayTransactionId?: string;
  failureReason?: string;
  parentTransactionId?: string; 
  description?: string;      
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
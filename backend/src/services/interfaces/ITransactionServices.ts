import { ITransaction } from "../../models/transaction/transactionInterface"
import { ITransactionDocument } from "../../repositories/interfaces/ITransactionRepository"

export interface ITransactionServices {
    createTransaction ({ transactionId, senderId, recieverId, amount, status}: ICreateTransaction): Promise<ITransactionDocument>
    getTransactionById (_id: string, role: string ): Promise<ITransaction[]>
    updateTransactionStatus( transactionId: string, status: string ): Promise<void>
}

export interface ICreateTransaction {
    transactionId: string;
    senderId: string;
    recieverId: string;
    amount: number; 
    status: string;
}
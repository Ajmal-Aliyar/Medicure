import { ITransaction } from "../../models/transaction/transactionInterface"
import { ITransactionDocument } from "../../repositories/interfaces/ITransactionRepository"

export interface ITransactionServices {
    createTransaction ({senderId, recieverId, amount, status}: ICreateTransaction): Promise<ITransactionDocument>
    getTransactionById (_id: string, role: string ): Promise<ITransaction[]>
}

export interface ICreateTransaction {
    senderId: string,
    recieverId: string,
    amount: number, 
    status: string
}
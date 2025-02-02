import { ITransactionDocument } from "../../repositories/interfaces/ITransactionRepository"

export interface ITransactionServices {
    createTransaction ({senderId, recieverId, amount, status}: ICreateTransaction): Promise<ITransactionDocument>
}

export interface ICreateTransaction {
    senderId: string,
    recieverId: string,
    amount: number, 
    status: string
}
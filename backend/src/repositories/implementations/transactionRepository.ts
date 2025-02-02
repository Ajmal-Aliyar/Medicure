import { TransactionModel } from "../../models/transaction/transactionModel";
import { ITransactionDocument, ITransactionRepository } from "../interfaces/ITransactionRepository";



export class TransactionRepository implements ITransactionRepository{

    async createTransaction (senderId: string, recieverId: string, amount: number, status: string): Promise<ITransactionDocument> {
        const transaction =  new TransactionModel({senderId, recieverId, amount, status})
        return await transaction.save()
    }

}   
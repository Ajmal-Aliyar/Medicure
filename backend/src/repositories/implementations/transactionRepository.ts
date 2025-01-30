import { TransactionModel } from "../../models/transaction/transactionModel";
import { ITransactionDocument } from "../interfaces/ITransactionRepository";



export class TransactionRepository {

    async createTransaction (patientId: string, doctorId: string, amount: number, status: string): Promise<ITransactionDocument> {
        const transaction =  new TransactionModel({patientId, doctorId, amount, status})
        return await transaction.save()
    }
}
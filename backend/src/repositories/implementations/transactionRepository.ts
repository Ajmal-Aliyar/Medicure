import { ITransaction } from "../../models/transaction/transactionInterface";
import { TransactionModel } from "../../models/transaction/transactionModel";
import { ITransactionDocument, ITransactionRepository } from "../interfaces/ITransactionRepository";



export class TransactionRepository implements ITransactionRepository {

    async createTransaction(senderId: string, recieverId: string, amount: number, status: string): Promise<ITransactionDocument> {
        const transaction = new TransactionModel({ senderId, recieverId, amount, status })
        return await transaction.save()
    }



    async getTransactions(id: string, role: string): Promise<ITransaction[]> {
        const collection = role === "user" ? "doctors" : "patients";
    
        return await TransactionModel.aggregate([
            {
                $match: {
                    $or: [{ senderId: id }, { recieverId: id }]
                }
            },
            {
                $lookup: {
                    from: collection, 
                    let: { senderIdStr: "$senderId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", { $toObjectId: "$$senderIdStr" }] }
                            }
                        },
                        {
                            $project: { fullName: 1, _id: 0 }
                        }
                    ],
                    as: "senderDetails"
                }
            },
            {
                $lookup: {
                    from: collection,
                    let: { recieverStr: "$recieverId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", { $toObjectId: "$$recieverStr" }] }
                            }
                        },
                        {
                            $project: { fullName: 1, _id: 0 }
                        }
                    ],
                    as: "recieverDetails"
                }
            },
            {
                $unwind: { path: "$senderDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $unwind: { path: "$recieverDetails", preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    senderFullName: "$senderDetails.fullName",
                    recieverFullName: "$recieverDetails.fullName",
                    transactionDate: 1,
                    amount: 1,
                    status: 1
                }
            },
            {
                $sort: { transactionDate: -1 }
            }
        ]);
    }
    
        


}   
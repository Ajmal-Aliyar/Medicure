import { response } from "express";
import { ITransaction } from "../../models/transaction/transactionInterface";
import { TransactionModel } from "../../models/transaction/transactionModel";
import {
  ITransactionDocument,
  ITransactionRepository,
} from "../interfaces/ITransactionRepository";

export class TransactionRepository implements ITransactionRepository {
  async createTransaction(
    transactionId: string,
    senderId: string,
    recieverId: string,
    amount: number,
    status: string
  ): Promise<ITransactionDocument> {
    const transaction = new TransactionModel({
      transactionId,
      senderId,
      recieverId,
      amount,
      status,
    });
    return await transaction.save();
  }

  async getTransactionById(transactionId: string): Promise<ITransaction> {
    return await TransactionModel.findOne({ transactionId });
  }

  async getAllTransactions(): Promise<ITransaction[]> {
    return await TransactionModel.find({});
  }

  async getTransactions(
    id: string,
    role: string,
    skip: number,
    limit: number
  ): Promise<{ transactions: ITransaction[]; total: number }> {
    const transactions = await TransactionModel.aggregate([
      {
        $match: {
          $or: [{ senderId: id }, { recieverId: id }],
        },
      },
      {
        $project: {
          senderId: 1,
          recieverId: 1,
          transactionDate: 1,
          amount: 1,
          status: 1,
        },
      },
      {
        $sort: { transactionDate: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const total = await TransactionModel.countDocuments({
      $or: [{ senderId: id }, { recieverId: id }],
    });

    return { transactions, total };
  }

  async updateTransactionStatus(
    transactionId: string,
    status: string
  ): Promise<void> {
    await TransactionModel.updateOne({ transactionId }, { $set: { status } });
  }
}

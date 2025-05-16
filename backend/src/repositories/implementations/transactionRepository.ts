import { response } from "express";
import { ITransaction } from "../../models/transaction/transactionInterface";
import { TransactionModel } from "../../models/transaction/transactionModel";
import {
  ITransactionDocument,
  ITransactionRepository,
} from "../interfaces/ITransactionRepository";
import { fillMissingDays } from "../../utils/fillDaysUtil";

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

  async getChartDetails(): Promise<{
    'Last 7 Days': { date: string; appointments: number; revenue: number }[];
    'Last 30 Days': { date: string; appointments: number; revenue: number }[];
  }> {
    const today = new Date();
    const startDate7 = new Date();
    startDate7.setDate(today.getDate() - 6);
  
    const startDate30 = new Date();
    startDate30.setDate(today.getDate() - 29);
  
    async function getSalesData(startDate: Date) {
      const result = await TransactionModel.aggregate([
        {
          $match: {
            status: "success",
            transactionDate: { $gte: startDate, $lte: today },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$transactionDate" },
            },
            appointments: { $sum: 1 },
            revenue: { $sum: "$amount" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);
  
      const formatted = result.map((item) => ({
        date: item._id,
        appointments: item.appointments,
        revenue: item.revenue,
      }));
  
      return fillMissingDays(startDate, today, formatted);
    }
  
    const last7Days = await getSalesData(startDate7);
    const last30Days = await getSalesData(startDate30);
  
    return {
      'Last 7 Days': last7Days,
      'Last 30 Days': last30Days,
    };
  }
}

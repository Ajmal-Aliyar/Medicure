import { ITransaction, Transaction } from "@/models";
import { BaseRepository } from "../base";
import { ITransactionRepository } from "../interfaces/i-transaction-repository";
import { Types } from "mongoose";
import { IPagination, IRole, TransactionChartData } from "@/interfaces";

export class TransactionRepository
  extends BaseRepository<ITransaction>
  implements ITransactionRepository
{
  constructor() {
    super(Transaction);
  }

  async getTransactionHistory(
    ownerId: string,
    ownerType: IRole,
    pagination: IPagination = { skip: 0, limit: 6 }
  ): Promise<{ transactions: ITransaction[]; total: number }> {
    const ownerObjectId = new Types.ObjectId(ownerId);
    const { skip = 0, limit = 6 } = pagination;

    let filter = {};

    if (ownerType === "doctor") {
      filter = { doctorId: ownerObjectId };
    } else {
      filter = {
        $or: [{ from: ownerObjectId }, { to: ownerObjectId }],
      };
    }

    const [transactions, total] = await Promise.all([
      this._model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      this._model.countDocuments(filter),
    ]);

    return { transactions, total };
  }

  async getTransactionStatsByDateRange(
    start: string,
    end: string
  ): Promise<TransactionChartData[]> {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const result = await this._model.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return result.map(({ _id, totalAmount, totalTransactions }) => ({
      date: new Date(_id).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      totalAmount,
      totalTransactions,
    }));
  }
}

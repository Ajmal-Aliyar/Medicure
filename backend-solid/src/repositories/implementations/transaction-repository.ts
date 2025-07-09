import { ITransaction, Transaction } from "@/models";
import { BaseRepository } from "../base";
import { ITransactionRepository } from "../interfaces/i-transaction-repository";
import { Types } from "mongoose";
import { IPagination, IRole } from "@/interfaces";
import { env } from "@/config";

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

    const [ transactions, total] = await Promise.all([
      this.model.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      this.model.countDocuments(filter),
    ]);

    return { transactions, total }
  }
}

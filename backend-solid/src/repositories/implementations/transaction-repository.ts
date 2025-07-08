import { ITransaction, Transaction } from "@/models";
import { BaseRepository } from "../base";
import { ITransactionRepository } from "../interfaces/i-transaction-repository";
import { Types } from "mongoose";
import { IPagination } from "@/interfaces";
import { env } from "@/config";

export class TransactionRepository
  extends BaseRepository<ITransaction>
  implements ITransactionRepository
{
  constructor() {
    super(Transaction);
  }

  async transactionHistoryOfPatient(patientId: string, { skip = 0, limit = 6}: IPagination) {
    const patientObjectId = new Types.ObjectId(patientId)
    return await this.model.find({
      $or: [{ from: patientObjectId }, { to: patientObjectId }],
    }).sort({ createdAt: -1 }).skip(skip).limit(limit);
  }

  async transactionHistoryOfDoctor(doctorId: string) {
    const doctorObjectId = new Types.ObjectId(doctorId)
    return await this.model.find({ doctorId: doctorObjectId }).sort({ createdAt: -1 })
  }

  async transactionHistoryOfAdmin() {
    const adminObjectId = new Types.ObjectId(env.ADMIN_ID)

    return await this.model.find({
      $or: [{ from: adminObjectId }, { to: adminObjectId }],
    }).sort({ createdAt: -1 });
  }
}

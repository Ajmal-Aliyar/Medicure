import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { ITransactionService } from "../interfaces";
import { ITransactionRepository } from "@/repositories";
import { ITransaction } from "@/models";
import { Types } from "mongoose";
import { env } from "@/config";
import { IPagination, IRole } from "@/interfaces";
import { TransactionMapper } from "@/mappers";
import { TransactionDetailsDTO, TransactionDTO } from "@/dtos";

@injectable()
export class TransactionService implements ITransactionService {
  constructor(
    @inject(TYPES.TransactionRepository)
    private readonly _transactionRepo: ITransactionRepository
  ) {}

  async bookAppointment(params: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
    amount: number;
    transactionId: string;
  }): Promise<TransactionDTO> {
    const { patientId, doctorId, appointmentId, amount, transactionId } = params;
    const transaction: Partial<ITransaction> = {
      from: new Types.ObjectId(patientId),
      to: new Types.ObjectId(env.ADMIN_ID),
      doctorId: new Types.ObjectId(doctorId),
      appointmentId: new Types.ObjectId(appointmentId),
      transactionId,
      amount,
      type: "appointment",
      status: "success",
      createdAt: new Date(),
    };
    return this._transactionRepo.create(transaction as TransactionDTO);
  }

  async getTransactionHistory(ownerId: string, ownerType: IRole, pagination: IPagination): Promise<{ transactions: TransactionDetailsDTO[], total: number }> {
    const {transactions, total} = await this._transactionRepo.getTransactionHistory( ownerId, ownerType, pagination)
    
    const mappedTransactions = TransactionMapper.toTransaction( ownerId, transactions)
    return { transactions: mappedTransactions, total}
  }
}

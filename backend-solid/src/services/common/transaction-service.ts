import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { ITransactionService } from "../interfaces";
import { ITransactionRepository } from "@/repositories";
import { ITransaction } from "@/models";
import { Types } from "mongoose";
import { env } from "@/config";

@injectable()
export class TransactionService implements ITransactionService {
    constructor(@inject(TYPES.TransactionRepository) private readonly transactionRepository: ITransactionRepository) {}

    async bookAppointment(params: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
    amount: number;
  }): Promise<ITransaction> {
    const { patientId, doctorId, appointmentId, amount } = params;

    const transaction: Partial<ITransaction> = {
      from: new Types.ObjectId(patientId),
      to:  new Types.ObjectId(env.ADMIN_ID), 
      doctorId: new Types.ObjectId(doctorId),
      appointmentId: new Types.ObjectId(appointmentId),
      amount,
      type: "appointment",
      status: "success",
      createdAt: new Date()
    };

    return this.transactionRepository.create(transaction as ITransaction);
  }

}
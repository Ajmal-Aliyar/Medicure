import { IPagination, IRole } from "@/interfaces";
import { TransactionDetails } from "@/interfaces/common/ITransaction";
import { ITransaction } from "@/models";

export interface ITransactionService {
bookAppointment(params: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
    transactionId: string;
    amount: number;
  }): Promise<ITransaction>
  getTransactionHistory(ownerId: string, ownerType: IRole, pagination: IPagination): Promise<{ transactions: TransactionDetails[], total: number }>
}
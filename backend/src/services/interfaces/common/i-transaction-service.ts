import { TransactionDetailsDTO, TransactionDTO } from "@/dtos";
import { IPagination, IRole } from "@/interfaces";


export interface ITransactionService {
bookAppointment(params: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
    transactionId: string;
    amount: number;
  }): Promise<TransactionDTO>
  getTransactionHistory(ownerId: string, ownerType: IRole, pagination: IPagination): Promise<{ transactions: TransactionDetailsDTO[], total: number }>
}
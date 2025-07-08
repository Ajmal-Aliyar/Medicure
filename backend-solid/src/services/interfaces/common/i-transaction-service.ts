import { ITransaction } from "@/models";

export interface ITransactionService {
bookAppointment(params: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
    amount: number;
  }): Promise<ITransaction>
}
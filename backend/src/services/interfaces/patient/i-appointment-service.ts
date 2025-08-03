import { IAppointment } from "@/models";

export interface IPatientAppointmentService {
  bookAppointment({
    doctorId,
    patientId,
    slotId,
    amount,
    paymentIntentId,
  }: {
    doctorId: string;
    patientId: string;
    slotId: string;
    amount: number;
    paymentIntentId: string;
  }): Promise<IAppointment>
}

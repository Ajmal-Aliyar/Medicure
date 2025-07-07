import { IAppointmentCreateInput, IPagination } from "@/interfaces";
import { IAppointment } from "@/models";

export interface IPatientAppointmentService {
  createAppointment({
    patientId,
    doctorId,
    slotId,
    status,
    transactionId,
  }: IAppointmentCreateInput): Promise<void>;

}

import { AppointmentCard, IPagination, IRole } from "@/interfaces";
import { IAppointment } from "@/models";
import { FilterAppointmentQuery } from "@/validators";

export interface IAppointmentService {
  getAppointmentsCardDetails(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery,
    pagination: IPagination
  ): Promise<{ appointments: AppointmentCard[]; total: number }>;
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

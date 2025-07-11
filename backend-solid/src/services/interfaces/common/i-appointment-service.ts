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
  getAppointmentByRoomId(id: string, role: IRole, roomId: string): Promise<any>;
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

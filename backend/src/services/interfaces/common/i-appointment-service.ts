import { AppointmentCard, AppointmentDetailsPopulated, AppointmentPageDetails, IPagination, IRole } from "@/interfaces";
import { FilterAppointmentQuery } from "@/validators";

export interface IAppointmentService {
  getAppointmentsCardDetails(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery,
    pagination: IPagination
  ): Promise<{ appointments: AppointmentCard[]; total: number }>;
  getAppointmentByRoomId(id: string, role: IRole, roomId: string): Promise<AppointmentDetailsPopulated>;
  getAppointmentById( id: string, role: string, appointmentId: string): Promise<AppointmentPageDetails>;
  updateNoShow(): Promise<void>;
}

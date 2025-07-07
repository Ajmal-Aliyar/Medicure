import { AppointmentCard, IPagination, IRole } from "@/interfaces";
import { FilterAppointmentQuery } from "@/validators";

export interface IAppointmentService {
  getAppointmentsCardDetails(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery,
    pagination: IPagination
  ): Promise<{ appointments: AppointmentCard[]; total: number }>;
}

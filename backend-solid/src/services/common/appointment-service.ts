import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import { IAppointmentService } from "../interfaces";
import { AppointmentCard, IPagination, IRole } from "@/interfaces";
import { AppointmentMapper } from "@/mappers";
import { IAppointmentRepository } from "@/repositories";
import { Types } from "mongoose";
import { FilterAppointmentQuery } from "@/validators";

@injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly appointmentRepo: IAppointmentRepository
  ) {}

  async getAppointmentsCardDetails(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery,
    { skip = 0, limit = 6 }: IPagination
  ): Promise<{ appointments: AppointmentCard[]; total: number }> {
    const filter = this.buildFilterByRole(id, role, parsedQuery);

    const { appointments, total } =
      await this.appointmentRepo.getAppointmentsForUser({
        filter,
        skip,
        limit,
        sort: { appointmentDate: 1, startTime: 1 },
      });

    const mappedAppointments =
      AppointmentMapper.toAppointmentsCard(appointments);

    return { appointments: mappedAppointments, total };
  }



  
  private buildFilterByRole(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery
  ): Record<string, any> {
    const filter: Record<string, any> = {};

    if (role === "patient") filter.patientId = new Types.ObjectId(id);
    else if (role === "doctor") filter.doctorId = new Types.ObjectId(id);

    if (parsedQuery.appointmentType) {
      filter.appointmentType = parsedQuery.appointmentType;
    }

    if (parsedQuery.status) {
      filter.status = parsedQuery.status;
    }

    if (parsedQuery.appointmentDate) {
      const date = new Date(parsedQuery.appointmentDate);
      if (!isNaN(date.getTime())) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        filter.appointmentDate = {
          $gte: date,
          $lt: nextDate,
        };
      }
    }

    return filter;
  }
}

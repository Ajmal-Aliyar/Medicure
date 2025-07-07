import { IAppointment } from "@/models";
import { BaseRepository } from "../base";
import { FindAllOptions } from "./i-base-repository";
import { PopulatedAppointment } from "@/interfaces";

export interface IAppointmentRepository extends BaseRepository<IAppointment> {
  getAppointmentsForUser(options: FindAllOptions<IAppointment>): Promise<{
    appointments: PopulatedAppointment[];
    total: number;
  }>;
}

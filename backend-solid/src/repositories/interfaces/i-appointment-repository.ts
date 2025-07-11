import { IAppointment } from "@/models";
import { BaseRepository } from "../base";
import { FindAllOptions } from "./i-base-repository";
import { PopulatedAppointment, PopulatedAppointmentForRoom } from "@/interfaces";

export interface IAppointmentRepository extends BaseRepository<IAppointment> {
  getAppointmentsForUser(options: FindAllOptions<IAppointment>): Promise<{
    appointments: PopulatedAppointment[];
    total: number;
  }>;
  getAppointmentsForRoom(
      filter: FindAllOptions<IAppointment>): Promise<PopulatedAppointmentForRoom | null>
}

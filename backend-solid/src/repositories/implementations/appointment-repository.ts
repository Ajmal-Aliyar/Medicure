import { injectable } from "inversify";
import { AppointmentModel, IAppointment,  } from "@/models";
import { BaseRepository } from "../base";
import { IAppointmentRepository } from "../interfaces";


@injectable()
export class AppointmentRepository
  extends BaseRepository<IAppointment>
  implements IAppointmentRepository
{
  constructor() {
    super(AppointmentModel);
  }
  
}

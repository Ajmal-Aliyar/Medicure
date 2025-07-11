import { injectable } from "inversify";
import { AppointmentModel, IAppointment } from "@/models";
import { BaseRepository } from "../base";
import { FindAllOptions, IAppointmentRepository } from "../interfaces";
import { PopulatedAppointment, PopulatedAppointmentForRoom } from "@/interfaces";

@injectable()
export class AppointmentRepository
  extends BaseRepository<IAppointment>
  implements IAppointmentRepository
{
  constructor() {
    super(AppointmentModel);
  }

  async getAppointmentsForUser({
    filter = {},
    skip = 0,
    limit = 10,
    sort = { createdAt: -1 },
  }: FindAllOptions<IAppointment>): Promise<{
    appointments: PopulatedAppointment[];
    total: number;
  }> {
    const [appointments, total] = await Promise.all([
      this.model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate("doctorId", "personal.fullName personal.profileImage professional.specialization")
        .populate("patientId", "personal.fullName personal.profileImage personal.dob")
        .lean<PopulatedAppointment[]>(),  
      this.model.countDocuments(filter),
    ]);
    return {
      appointments,
      total,
    };
  }

  async getAppointmentsForRoom({
    filter
  }: FindAllOptions<IAppointment>): Promise<PopulatedAppointmentForRoom | null> {
    return await 
      this.model
        .findOne(filter)
        .populate(
          "doctorId", 
          "personal.fullName personal.profileImage personal.dob personal.gender personal.languageSpoken professional.specialization professional.yearsOfExperience rating")
        .populate("patientId", "personal.fullName personal.profileImage personal.dob personal.bloodGroup personal.gender personal.mobile")
        .lean<PopulatedAppointmentForRoom>()
  }
}

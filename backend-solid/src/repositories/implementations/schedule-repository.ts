import { injectable } from "inversify";
import { IScheduleRepository } from "../interfaces/i-schedule-repository";
import { DoctorScheduleModel, IDoctorSchedule } from "@/models";
import { BaseRepository } from "../base";


@injectable()
export class ScheduleRepository
  extends BaseRepository<IDoctorSchedule>
  implements IScheduleRepository
{
  constructor() {
    super(DoctorScheduleModel);
  }
  async findByDoctorId(doctorId: string): Promise<IDoctorSchedule | null> {
    return this.model.findOne({ doctorId });
  }

  async update(
    doctorId: string,
    data: Partial<IDoctorSchedule>
  ): Promise<IDoctorSchedule | null> {
    const updated = await this.model.findOneAndUpdate(
      { doctorId },
      { $set: data },
      { new: true, runValidators: true }
    );
    if (!updated) null;
    return updated;
  }
}

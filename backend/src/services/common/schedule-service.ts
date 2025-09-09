import { TYPES } from "@/di/types";
import { IDoctorSchedule } from "@/models";
import { IScheduleRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IScheduleService } from "../interfaces";

@injectable()
export class ScheduleService implements IScheduleService {
    constructor(
        @inject(TYPES.ScheduleRepository) private readonly _scheduleRepo: IScheduleRepository,
    ) {}

  async findActiveDoctorSchedules(): Promise<IDoctorSchedule[]> {
    const {data}  =  await this._scheduleRepo.findAll({ filter:{isActive: true }, skip: 0, limit: Infinity })
    return data
  }
}
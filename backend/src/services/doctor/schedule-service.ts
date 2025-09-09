import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IDoctorScheduleService } from "../interfaces";
import { IScheduleRepository } from "@/repositories";
import { IDoctorSchedule } from "@/models";
import { DoctorScheduleMapper } from "@/mappers";
import { NotFoundError } from "@/errors";
import { SCHEDULE_MESSAGES } from "@/constants";
import { Types } from "mongoose";

@injectable()
export class DoctorScheduleService implements IDoctorScheduleService {
  constructor(
    @inject(TYPES.ScheduleRepository) private _scheduleRepo: IScheduleRepository
  ) {}

  async getSchedule(doctorId: string): Promise<IDoctorSchedule | null> {
  const sch = await this._scheduleRepo.findByDoctorId(doctorId);
  console.log(sch, 'Schedule fetched');
  return sch;
}

  async upsertSchedule(
    doctorId: string,
    data: Partial<IDoctorSchedule>
  ): Promise<{ schedule: IDoctorSchedule; message: string }> {
    const existing = await this._scheduleRepo.findByDoctorId(doctorId);
    if (!existing) {
      return await this.createScheduleIfNotExist(doctorId, data);
    }
    return await this.updateExistingSchedule(doctorId, data, existing);
  }

  async createScheduleIfNotExist(
    doctorId: string,
    data: Partial<IDoctorSchedule>
  ): Promise<{ schedule: IDoctorSchedule; message: string }> {
    const mapped = DoctorScheduleMapper.toDoctorScheduleCreate(doctorId, data);
    const schedule = await this._scheduleRepo.create(mapped);
    return { schedule, message: SCHEDULE_MESSAGES.SCHEDULE_CREATED };
  }

  async updateExistingSchedule(
    doctorId: string,
    data: Partial<IDoctorSchedule>,
    existing: IDoctorSchedule
  ): Promise<{ schedule: IDoctorSchedule; message: string }> {
    const mapped = DoctorScheduleMapper.toDoctorScheduleUpdate(data, existing);
    const result = await this._scheduleRepo.update(doctorId, mapped);
    if (!result) throw new NotFoundError(SCHEDULE_MESSAGES.SCHEDULE_NOT_FOUND);
    return { schedule: result, message: SCHEDULE_MESSAGES.SCHEDULE_UPDATED };
  }
}

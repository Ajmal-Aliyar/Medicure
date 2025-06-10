import { ISlot } from "@/models";
import { IBaseRepository } from "./i-base-repository";

export interface ISlotRepository extends IBaseRepository<ISlot> {
  findByDoctorAndDate(doctorId: string, date: string, isActive?: boolean, status?: string): Promise<ISlot[]>;
  findAvailableSlotsByDoctor(doctorId: string): Promise<ISlot[]>;
  bulkCreate(slots: Partial<ISlot>[]): Promise<ISlot[]>;
}

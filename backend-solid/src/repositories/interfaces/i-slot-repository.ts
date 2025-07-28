import { ISlot } from "@/models";
import { IBaseRepository } from "./i-base-repository";
import { SlotChartData } from "@/interfaces";

export interface ISlotRepository extends IBaseRepository<ISlot> {
  findByDoctorAndDate(
    doctorId: string,
    date: string,
    isActive?: boolean,
    status?: string
  ): Promise<ISlot[]>;
  findAvailableSlotsByDoctor(doctorId: string): Promise<ISlot[]>;
  bulkCreate(slots: Partial<ISlot>[]): Promise<ISlot[]>;
  updateByDoctorAndSlotId(
    doctorId: string,
    slotId: string,
    isActive: boolean
  ): Promise<ISlot | null>;
  getSlotStatsByDateRange(doctorId: string, startDate: string, endDate: string): Promise<SlotChartData[]>
}

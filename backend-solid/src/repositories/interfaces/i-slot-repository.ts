import { ISlot } from "@/models";

export interface ISlotRepository {
  findByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]>;
  findAvailableSlotsByDoctor(doctorId: string): Promise<ISlot[]>;
  bulkCreate(slots: ISlot[]): Promise<ISlot[]>;
}

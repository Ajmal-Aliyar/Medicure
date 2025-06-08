import { ISlot } from "@/models";
import { Types } from "mongoose";

export interface ISlotService {
  createBulkSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
  // createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
  getSlotsByDoctorAndDate(doctorId: string, date: string): Promise<ISlot[]>;
  getNewSlotsForDate(
    doctorId: string,
    date: string,
    generatedSlots: Partial<ISlot>[]
  ): Promise<ISlot[]>;
  //   bookSlot(slotId: string, patientId: string): Promise<ISlot>;
}

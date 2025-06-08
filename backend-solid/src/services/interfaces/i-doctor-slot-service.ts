import { ISlot } from "@/models";

export interface IDoctorSlotService {
    createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
    // getSlotsByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]>;
//   bookSlot(slotId: string, patientId: string): Promise<ISlot>;
}

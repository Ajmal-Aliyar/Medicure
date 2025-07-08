import { CategorizedSlots } from "@/dtos";
import { ISlot } from "@/models";

export interface IDoctorSlotService {
    createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
    getSlots(doctorId: string, date: string, status?: string, isActive?: boolean): Promise<CategorizedSlots>
    // getSlotsByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]>;
//   bookSlot(slotId: string, patientId: string): Promise<ISlot>;
}

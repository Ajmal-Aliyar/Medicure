import { ISlot } from "@/models";

export interface ISlotService {
  createBulkSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
  // createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
  getSlotsByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]>;
  getNewSlotsForDate(
    doctorId: string,
    date: Date,
    generatedSlots: Partial<ISlot>[]
  ): Promise<ISlot[]>;
  validateSlotAvailability(slotId: string, patientId: string): Promise<ISlot> 
  releaseSlot(slotId: string | undefined, patientId: string): Promise<boolean>
  slotBooked(slotId: string, patientId: string): Promise<void>
  //   bookSlot(slotId: string, patientId: string): Promise<ISlot>;
}

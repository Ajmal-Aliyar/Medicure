import { IPagination, IRole, ISlotDetails } from "@/interfaces";
import { ISlot } from "@/models";
import { FilterSlotQuery } from "@/validators/slot-validator";

export interface ISlotService {
  createBulkSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
  getSlotsByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]>;
  getNewSlotsForDate(
    doctorId: string,
    date: Date,
    generatedSlots: Partial<ISlot>[]
  ): Promise<ISlot[]>;
  validateSlotAvailability(slotId: string, patientId: string): Promise<ISlot>;
  releaseSlot(slotId: string | undefined, patientId: string): Promise<boolean>;
  bookSlot(slotId: string, patientId: string): Promise<void>;

  getSlots(
    id: string,
    role: IRole,
    parsedQuery: FilterSlotQuery,
    pagination: IPagination
  ): Promise<{ slots: ISlotDetails[]; total: number }>;
  updateSlotAvailable(slotId: string): Promise<void>;
}

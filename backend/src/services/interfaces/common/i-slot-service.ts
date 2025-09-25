import { ISlotDetailsDTO, SlotDTO } from "@/dtos";
import { IPagination, IRole } from "@/interfaces";
import { ISlot } from "@/models";
import { FilterSlotQuery } from "@/validators/slot-validator";

export interface ISlotService {
  createBulkSlots(slots: Partial<ISlot>[]): Promise<SlotDTO[]>;
  getSlotsByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]>;
  getNewSlotsForDate(
    doctorId: string,
    date: Date,
    generatedSlots: Partial<ISlot>[]
  ): Promise<ISlot[]>;
  validateSlotAvailability(slotId: string, patientId: string): Promise<SlotDTO>;
  releaseSlot(slotId: string | undefined, patientId: string): Promise<boolean>;
  bookSlot(slotId: string, patientId: string): Promise<void>;

  getSlots(
    id: string,
    role: IRole,
    parsedQuery: FilterSlotQuery,
    pagination: IPagination
  ): Promise<{ slots: ISlotDetailsDTO[]; total: number }>;
  updateSlotAvailable(slotId: string): Promise<void>;
}

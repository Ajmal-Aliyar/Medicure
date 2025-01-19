import { ISlotSchema } from "../../models/slot/slotInterface";
import { ISlot } from "../../types/ISlotInterface";

export interface ISlotRepository {
    getAllSlotsId(doctorId: string): Promise<string[]>;
    getAllSlots(doctorId: string): Promise<ISlotSchema[]>;
    deleteSlot(_id: string): Promise<void>;
    createSlot(slotData: ISlot): Promise<void>;
}

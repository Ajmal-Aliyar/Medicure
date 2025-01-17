import { ISlotSchema } from "../../models/slot/slot.interface";
import { ISlot } from "./slot.Interface";

export interface ISlotRepository {
    getAllSlotsId(doctorId: string): Promise<string[]>;
    getAllSlots(doctorId: string): Promise<ISlotSchema[]>;
    deleteSlot(_id: string): Promise<void>;
    createSlot(slotData: ISlot): Promise<void>;
}

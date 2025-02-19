import { UpdateResult } from "mongoose";
import { ISlotSchema } from "../../models/slot/slotInterface";
import { ISlot } from "../../types/ISlotInterface";

export interface ISlotRepository {
    getAllSlotsId(doctorId: string): Promise<string[]>;
    getAllSlots(doctorId: string): Promise<ISlotSchema[]>;
    getById(_id: string): Promise<ISlotSchema>
    deleteSlot(_id: string): Promise<void>;
    createSlot(slotData: ISlot): Promise<void>;
    incBooked(_id: string): Promise<UpdateResult>
    consultingCompleted(_id: string): Promise<UpdateResult>
}

import { ISlotSchema } from "../../models/slot/slot.interface";
import { ISlot } from "./slot.Interface";

export interface ISlotService {
    manageSlots(_id: string, slots: ISlot[], fees: number): Promise<void>
    getSlots(doctorId: string): Promise<{ slots: ISlotSchema[],fees: number}>;
}


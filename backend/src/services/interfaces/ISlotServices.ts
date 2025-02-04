import { UpdateResult } from "mongoose";
import { ISlotSchema } from "../../models/slot/slotInterface";
import { ISlot } from "../../types/ISlotInterface";

export interface ISlotService {
    manageSlots(_id: string, slots: ISlot[], fees: number): Promise<void>
    getSlots(doctorId: string): Promise<{ slots: ISlotSchema[],fees: number}>;
    fetchDoctorSlotDetails(doctorId: string): Promise<{ slots: ISlotSchema[]}>;
    isSlotLimitExceed(slotId: string): Promise<boolean>
    incBooked(slotId: string): Promise<UpdateResult>
}


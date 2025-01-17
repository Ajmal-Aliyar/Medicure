import { model } from "mongoose";
import { ISlotSchema } from "./slot.interface";
import { SlotSchema } from "./slot.schema";

export const SlotModel = model<ISlotSchema>('Slot', SlotSchema);
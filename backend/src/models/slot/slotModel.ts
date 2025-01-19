import { model } from "mongoose";
import { ISlotSchema } from "./slotInterface";
import { SlotSchema } from "./slotSchema";

export const SlotModel = model<ISlotSchema>('Slot', SlotSchema);
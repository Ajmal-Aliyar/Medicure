import { Schema } from "mongoose";
import { ISlotSchema } from "./slot.interface";

export const SlotSchema: Schema = new Schema<ISlotSchema>({
    doctorId: {type: String, required: true},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    slotLimit: { type: Number, required: true, min: 1 },
    avgConsultTime: { type: String, required: true },
    bookedSlot: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

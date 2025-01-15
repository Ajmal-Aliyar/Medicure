import { Document, model, Schema } from "mongoose";

export interface ISlotSchema extends Document {
    doctorId: string;
    startTime: string;
    endTime: string;
    slotLimit: number;
    avgConsultTime: string;
    bookedSlot: number;
    createdAt: Date;
}

const SlotSchema: Schema = new Schema<ISlotSchema>({
    doctorId: {type: String, required: true},
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    slotLimit: { type: Number, required: true, min: 1 },
    avgConsultTime: { type: String, required: true },
    bookedSlot: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

export const SlotModel = model<ISlotSchema>('Slot', SlotSchema);
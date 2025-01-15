import { Document, model, Schema } from "mongoose";

interface ISlot extends Document {
    startTime: string;
    endTime: string;
    slotLimit: number;
    avgConsultTime: string;
    isSlotBooked: boolean;
    createdAt: Date;
}

const SlotSchema: Schema = new Schema<ISlot>({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    slotLimit: { type: Number, required: true, min: 1 },
    avgConsultTime: { type: String, required: true },
    isSlotBooked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export const SlotModel = model<ISlot>('Doctor', SlotSchema);
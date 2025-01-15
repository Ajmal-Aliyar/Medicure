import mongoose from "mongoose";

export interface ISlot {
    doctorId?: string;
    startTime: string;
    endTime: string;
    slotLimit: number;
    avgConsultTime: string;
    bookedSlot?: number;
    createdAt?: Date;
    _id?: mongoose.Types.ObjectId;
}

export interface ISlotSchema extends Document {
    doctorId: string;
    startTime: string;
    endTime: string;
    slotLimit: number;
    avgConsultTime: string;
    bookedSlot: number;
    createdAt: Date;
}

export interface ISlotSchema extends Document {
    doctorId: string;
    startTime: string;
    endTime: string;
    slotLimit: number;
    avgConsultTime: string;
    consulted: number;
    bookedSlot: number;
    createdAt: Date;
}

import  { Document, Types } from "mongoose";

export interface IAppointment extends Document {
    doctorId: string;
    patientId: string;
    slotId: string;
    roomId: string;
    appointmentDate: Date;
    status: "Scheduled" | "Completed" | "Cancelled";
    transactionId: string;
    recordId: Types.ObjectId;
    createdAt: Date;
}

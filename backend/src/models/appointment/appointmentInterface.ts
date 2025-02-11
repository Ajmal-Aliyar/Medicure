import mongoose from "mongoose";

export interface IAppointment extends Document {
    doctorId: string;
    patientId: string;
    slotId: string;
    roomId: string;
    appointmentDate: Date;
    status: 'Scheduled' | 'Completed' | 'Cancelled';
    transactionId: mongoose.Types.ObjectId;
    createdAt: Date;
  }
  
import mongoose, { Schema } from "mongoose";
import { IAppointment } from "./appointmentInterface";

export const appointmentSchema = new Schema<IAppointment>({
    doctorId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
      required: true,
    },
    slotId: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      required: true,
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  });
  
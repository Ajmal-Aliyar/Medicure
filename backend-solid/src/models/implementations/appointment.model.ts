import { model, Schema } from "mongoose";
import { IAppointment } from "../interfaces";

const appointmentSchema = new Schema<IAppointment>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
      index: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
      index: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: [true, "Slot ID is required"],
      index: true,
    },
    roomId: {
      type: String,
      required: [true, "Room ID is required"],
      trim: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
      index: true,
    },
    startTime: {
      type: String,
      required: [true, "Start time is required"],
      validate: {
        validator: function (time: string) {
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        },
        message: "Start time must be in HH:MM format",
      },
    },
    endTime: {
      type: String,
      required: [true, "End time is required"],
      validate: {
        validator: function (time: string) {
          return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
        },
        message: "End time must be in HH:MM format",
      },
    },
    status: {
      type: String,
      enum: {
        values: [
          "Scheduled",
          "Confirmed",
          "In Progress",
          "Completed",
          "Cancelled",
          "No Show",
        ],
        message: "Invalid status",
      },
      default: "Scheduled",
      index: true,
    },
    appointmentType: {
      type: String,
      enum: {
        values: ["Consultation", "Follow-up", "Emergency"],
        message: "Invalid type",
      },
      required: [true, "Appointment type is required"],
    },
    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
      unique: true,
      trim: true,
    },
    recordId: {
      type: Schema.Types.ObjectId,
      ref: "MedicalRecord",
      required: [true, "Record ID is required"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
    cancelReason: {
      type: String,
      trim: true,
      maxlength: [500, "Cancel reason cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });
appointmentSchema.index({ patientId: 1, appointmentDate: 1 });
appointmentSchema.index({ appointmentDate: 1, status: 1 });
appointmentSchema.index({ doctorId: 1, status: 1 });

export const AppointmentModel = model<IAppointment>(
  "Appointment",
  appointmentSchema
);
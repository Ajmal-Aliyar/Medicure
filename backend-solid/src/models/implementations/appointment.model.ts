import { model, Schema } from "mongoose";
import { IAppointment } from "../interfaces";

const appointmentSchema = new Schema<IAppointment>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: [true, "Patient ID is required"],
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: [true, "Slot ID is required"],
    },
    roomId: {
      type: String,
      trim: true,
      required: [true, "Room ID is required"]
    },
    appointmentDate: {
      type: Date,
      required: [true, "Appointment date is required"],
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
          "scheduled",
          "in progress",
          "completed",
          "cancelled",
          "no show",
        ],
        message: "Invalid status",
      },
      default: "scheduled"
    },
    appointmentType: {
      type: String,
      enum: {
        values: ["consult", "follow-up", "emergency"],
        message: "Invalid type",
      },
      required: [true, "Appointment type is required"],
    },
    transactionId: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Transaction ID is required"],
    },
    feedbackId: {
      type: Schema.Types.ObjectId,
      ref: "Feedback",
      default: null,
    },
    prescriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
      default: null,
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


export const AppointmentModel = model<IAppointment>(
  "Appointment",
  appointmentSchema
);

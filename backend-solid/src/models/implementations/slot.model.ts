import mongoose, { Schema } from "mongoose";
import { ISlot } from "../interfaces";

const SlotSchema = new Schema<ISlot>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: {
      type: String,
      required: true,
      index: true,
    },
    type: { type: String, enum: ["consult", "emergency"], required: true },
    fees: { type: Number, required: true },
    buffer: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["available", "pending", "booked"],
      default: "available",
    },
    duration: {
      type: Number,
      required: true,
    },
    isActive: { type: Boolean, default: false},
    bookingDetails: {
      isBooked: {
        type: Boolean,
        default: false,
      },
      patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
      bookedAt: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

export const SlotModel = mongoose.model<ISlot>("Slot", SlotSchema);

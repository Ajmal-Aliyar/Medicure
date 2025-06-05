import mongoose, { Schema } from "mongoose";
import { ISlot } from "../interfaces";



const SlotSchema = new Schema<ISlot>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    type: { type: String, enum: ["in-person", "video"], required: true },
    fees: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "pending", "booked"],
      default: "available",
    },
    duration: {
      type: Number,
      required: true,
    },
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

SlotSchema.index({ doctorId: 1, startTime: 1 }, { unique: true });

export const SlotModel = mongoose.model<ISlot>("Slot", SlotSchema);

import { Schema, model } from "mongoose";
import { ISpecialization } from "../interfaces";


const SpecializationSchema = new Schema<ISpecialization>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    avgConsultTime: {
      type: Number,
      required: true,
      min: 1,
    },
    bookings: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SpecializationModel = model<ISpecialization>("Specialization", SpecializationSchema);

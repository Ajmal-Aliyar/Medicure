import mongoose, { Schema } from "mongoose";
import { IMedicalRecord } from "../interfaces";

export const MedicalRecordSchema: Schema = new Schema<IMedicalRecord>({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export const MedicalRecord = mongoose.model<IMedicalRecord>(
  "MedicalRecord",
  MedicalRecordSchema
);

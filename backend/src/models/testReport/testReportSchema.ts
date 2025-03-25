import mongoose, { Schema } from "mongoose";

export const TestReportSchema: Schema = new Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, required: true },
    testType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  });
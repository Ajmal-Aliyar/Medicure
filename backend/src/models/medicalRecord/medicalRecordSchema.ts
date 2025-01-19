import { Schema } from "mongoose";
import { IMedicalReport } from "./medicalRecordInterface";

export const MedicalReport: Schema = new Schema<IMedicalReport>({
    doctorId: {type: String, required: true},
    patientId: { type: String, required: true },
    diagnosis: { type: String, required: true },
    prescription: { type: String, required: true},
    allergy: {type: String, default: null},
    createdAt: { type: Date, default: Date.now }
});

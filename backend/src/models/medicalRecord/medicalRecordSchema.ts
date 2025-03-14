import { Schema } from "mongoose";
import { IMedicalRecord } from "./medicalRecordInterface";

export const MedicalReport: Schema = new Schema<IMedicalRecord>({
    doctorId: {type: String, default: ''},
    patientId: { type: String, default: ''},
    diagnosis: { type: String, default: ''},
    prescription: { type: String, default: ''},
    allergy: {type: String, default: ''},
    dateOfExamination: {type: Date},
    isCompleted: {type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now }
});

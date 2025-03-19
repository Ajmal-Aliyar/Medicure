import mongoose from "mongoose";
import { IMedicalRecord } from "./medicalRecordInterface";
import { MedicalReport } from "./medicalRecordSchema";


export const MedicalRecordModel = mongoose.model<IMedicalRecord>('MedicalRecord', MedicalReport);

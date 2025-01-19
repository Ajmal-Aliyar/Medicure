import mongoose from "mongoose";
import { IMedicalReport } from "./medicalRecordInterface";
import { MedicalReport } from "./medicalRecordSchema";


export const MedicalRecordModel = mongoose.model<IMedicalReport>('MedicalRecord', MedicalReport);

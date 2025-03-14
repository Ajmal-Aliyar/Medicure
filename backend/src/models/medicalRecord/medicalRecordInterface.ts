import mongoose from "mongoose";

export interface IMedicalRecord extends Document {
    _id: mongoose.Types.ObjectId
    patientId: string;
    doctorId: string;
    diagnosis: string;
    prescription: string;
    allergy: string;
    dateOfExamination: Date;
    isCompleted: boolean;
    createdAt: Date;
}
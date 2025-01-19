export interface IMedicalReport extends Document {
    patientId: string;
    doctorId: string;
    diagnosis: string;
    prescription: string;
    allergy: string;
    createdAt: Date;
}
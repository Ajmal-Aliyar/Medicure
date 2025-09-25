import { Types } from "mongoose";

export interface MedicalRecordDTO {
  patientId: Types.ObjectId;
  fileUrl: string;
  fileName: string;
  uploadedAt: Date;
}

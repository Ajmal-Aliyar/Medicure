import { Document, Types } from "mongoose";

export interface IMedicalRecord extends Document {
  patientId: Types.ObjectId;
  fileUrl: string;
  fileName: string;
  uploadedAt: Date;
}

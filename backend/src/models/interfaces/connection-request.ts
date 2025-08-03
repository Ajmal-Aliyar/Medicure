import { IConnectionRequestStatus } from "@/interfaces";
import { Document, Types } from "mongoose";

export interface IConnectionRequest extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  status: IConnectionRequestStatus;
  createdAt: Date;
}
import { Document, Types } from "mongoose";

export interface IConnectionRequest extends Document {
  initiatorId: Types.ObjectId;
  doctorId: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}
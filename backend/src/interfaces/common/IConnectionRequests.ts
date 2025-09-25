import { Types } from "mongoose";

export type IConnectionRequestStatus = "pending" | "rejected" | "accepted";

export interface PopulatedConnectionRequest {
  _id: Types.ObjectId;
  status: IConnectionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  doctorId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
    };
  };
  patientId: {
    _id: Types.ObjectId;
    personal: {
      fullName: string;
      profileImage: string;
    };
  };
}



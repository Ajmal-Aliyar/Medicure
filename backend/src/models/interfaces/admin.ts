import { Document, Types } from "mongoose";

export interface IAdmin extends Document {
  _id: Types.ObjectId;

  personal: {
    profileImage: string
    fullName: string;
    email: string;
    password: string;
  };
}

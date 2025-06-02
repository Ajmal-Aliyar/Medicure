import mongoose, { Schema } from "mongoose";
import { IAdmin } from "@/models";

const AdminShema = new Schema<IAdmin>({
  personal: {
    rofileImage: { type: String, default: null },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
});

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminShema);

import mongoose from "mongoose";

export interface IAdmin extends Document {
    _id: mongoose.Types.ObjectId;
    fullName: string;
    email: string;
    password: string;
}
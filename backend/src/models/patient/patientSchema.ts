import { Schema } from "mongoose";
import { IPatient } from "./patientInterface";

export const PatientSchema = new Schema<IPatient>({
    profileImage: {
        type: String
    },
    fullName: {
        type: String,
        required: true,
        maxlength: 100
    },
    phone: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        maxlength: 150,
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    bloodGroup: {
        type: String
    },
    address: {
        houseName: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String }
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

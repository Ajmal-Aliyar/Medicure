import mongoose, { Schema, model } from 'mongoose';

interface EducationDetails {
    degree: string;
    university: string;
    year: number;
}

interface Doctor extends Document {
    doctorId: string;
    fullName: string;
    email: string;
    phone: number;
    password: string;
    gender: 'Male' | 'Female';
    profileImage: Buffer | string;
    dob: Date;
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: Date;
    proofDocument: string[];
    about: string;
    educationDetails: EducationDetails;
    specialization: string;
    experienceYears: number;
    languageSpoken: string;
    fees: string;
    isBlocked: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const EducationDetailsSchema = new Schema<EducationDetails>({
    degree: { type: String },
    university: { type: String },
    year: { type: Number }
});

const DoctorSchema = new Schema<Doctor>({
    fullName: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 150
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 15
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    profileImage: {
        type: Buffer
    },
    dob: {
        type: Date
    },
    registrationNumber: {
        type: String,
        unique: true,
        maxlength: 50
    },
    registrationCouncil: {
        type: String,
        maxlength: 100
    },
    registrationYear: {
        type: Date
    },
    proofDocument: [{
        type: String
    }],
    about: {
        type: String
    },
    educationDetails: {
        type: EducationDetailsSchema
    },
    specialization: {
        type: String,
        maxlength: 100
    },
    experienceYears: {
        type: Number
    },
    languageSpoken: {
        type: String,
        maxlength: 255
    },
    fees: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

DoctorSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
export const DoctorModel = model('Doctor', DoctorSchema);
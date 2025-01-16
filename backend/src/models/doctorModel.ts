import mongoose, { Schema, model, Document } from 'mongoose';


interface IEducation {
    degree: string;
    university: string;
    yearOfCompletion: number;
}

export interface IAddress {
    addressLine: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
}

export interface IDoctor extends Document {
    fullName: string;
    email: string;
    phone: string; 
    password: string;
    gender: 'Male' | 'Female';
    profileImage?: Buffer | string;
    dob: Date;
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: number;
    identityProof: string;
    medicalRegistration: string;
    establishmentProof: string;
    about: string;
    educationDetails: IEducation;
    education: IEducation[]; 
    headline: string;
    address: IAddress;
    specialization: string;
    yearsOfExperience: number;
    languageSpoken: string;
    fees: number;
    isBlocked: boolean;
    isProfileCompleted: boolean;
    isApproved: boolean;
    createdAt: Date;
    updatedAt: Date;
}


const DoctorSchema = new Schema<IDoctor>({
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
        type: String, 
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
        enum: ['Male', 'Female'],
    },
    profileImage: {
        type: Buffer,
        required: false
    },
    dob: {
        type: Date,
    },
    registrationNumber: {
        type: String,
        unique: true,
        maxlength: 50,
    },
    registrationCouncil: {
        type: String,
        maxlength: 100,
    },
    registrationYear: {
        type: Number,
        required: true
    },
    identityProof: {
        type: String,
    },
    medicalRegistration: {
        type: String,
    },
    establishmentProof: {
        type: String,
    },
    about: {
        type: String,
    },
    educationDetails: {
        degree: { type: String},
        university: { type: String},
        yearOfCompletion: { type: Number}
    },
    education: [{
        degree: { type: String},
        university: { type: String},
        yearOfCompletion: { type: Number}
    }],
    headline: {
        type: String,
    },
    address: {
        addressLine: { type: String},
        streetAddress: { type: String},
        city: { type: String},
        state: { type: String},
        country: { type: String},
        pincode: { type: String}
    },
    specialization: {
        type: String,
        maxlength: 100,
    },
    yearsOfExperience: {
        type: Number,
    },
    languageSpoken: {
        type: String,
        maxlength: 255,
    },
    fees: {
        type: Number,
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
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

export const DoctorModel = model<IDoctor>('Doctor', DoctorSchema);

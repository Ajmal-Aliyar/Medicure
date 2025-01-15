import mongoose, { Schema, model, Document } from 'mongoose';


interface IDoctor extends Document {
    fullName: string;
    email: string;
    phone: string; 
    password: string;
    gender: 'Male' | 'Female';
    profileImage: Buffer | string;
    dob: Date;
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: number;
    identityProof: string;
    medicalRegistration: string;
    establishmentProof: string;
    about: string;
    educationDetails:  {
        degree: string;
        university: string;
        yearOfCompletion: number;
    }
    specialization: string;
    yearsOfExperience: number;
    languageSpoken: string;
    fees: string;
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
        type: Number
    },
    identityProof: {
        type: String
    },
    medicalRegistration: {
        type: String
    },
    establishmentProof: {
        type: String
    },
    about: {
        type: String
    },
    educationDetails: {
        degree: {
            type: String,
            required: true
        },
        university: {
            type: String,
            required: true
        },
        yearOfCompletion: {
            type: Number,
            required: true
        }
    },
    specialization: {
        type: String,
        maxlength: 100
    },
    yearsOfExperience: {
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

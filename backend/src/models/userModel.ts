import mongoose, { Schema, model } from 'mongoose';

// Define the Patient Schema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        maxlength: 100
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength: 150
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    medicalHistory: {
        type: Array,
        default:[]
    },
    houseName: {
        type: String,
        maxlength: 100
    },
    city: {
        type: String,
        maxlength: 50
    },
    state: {
        type: String,
        maxlength: 50
    },
    country: {
        type: String,
        maxlength: 50
    },
    postalCode: {
        type: String,
        maxlength: 10
    },
    isBlocked: {
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
}, {
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
});


export const UserModel = model('User', userSchema);



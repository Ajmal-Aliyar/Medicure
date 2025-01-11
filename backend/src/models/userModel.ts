import mongoose, { Schema, model } from 'mongoose';

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
        required: true,
        maxlength: 150,
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
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export const UserModel = model('User', userSchema);

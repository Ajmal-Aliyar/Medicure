import mongoose, { Schema } from "mongoose";
import { IDoctor } from "@/models";

const DoctorSchema = new Schema<IDoctor>(
  {
    personal: {
      fullName: String,
      email: { type: String, unique: true },
      mobile: String,
      password: String,
      gender: { type: String, enum: ["Male", "Female", "Other"] },
      dob: { type: String },
      profileImage: { type: String, default: null },
      languageSpoken: [String],
    },

    professional: {
      registrationNumber: String,
      registrationCouncil: String,
      registrationYear: Number,
      specialization: String,
      headline: String,
      about: String,
      yearsOfExperience: Number,
      education: [
        {
          degree: String,
          university: String,
          yearOfCompletion: Number,
          // specialization: String,
        },
      ],
      experience: [
        {
          hospitalName: String,
          role: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],
      fees: {
        amount: Number,
        currency: String,
      },
      documents: {
        identityProof: String,
        medicalRegistration: String,
        establishmentProof: String,
      },
    },

    availability: {
      days: [String],
      timeSlots: [
        {
          start: String,
          end: String,
        },
      ],
      timezone: String,
    },

    location: {
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      // geo: {
      //   lat: Number,
      //   lng: Number,
      // },
    },

    rating: {
      average: { type: Number, default: 0 },
      reviewCount: { type: Number, default: 0 },
    },

    status: {
      accountStatus: {
        isBlocked: { type: Boolean, default: false },
        reason: { type: String, default: null },
      },
      profile: {
        isApproved: { type: Boolean, default: false },
        reviewStatus: {
          type: String,
          enum: [ "pending", "applied", "approved", "rejected"],
          default: "pending",
        },
        reviewComment: { type: String, default: null }, 
      },
      verification: {
        isVerified: { type: Boolean, default: false },
        verifiedAt: { type: Date, default: null },
      },
    },
  },
  { timestamps: true }
);

export const DoctorModel = mongoose.model<IDoctor>("Doctor", DoctorSchema);

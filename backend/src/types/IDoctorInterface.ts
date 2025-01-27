import { DeleteResult, InferSchemaType, UpdateResult } from "mongoose";
import { IDoctor } from "../models/doctor/doctorInterface";
import { DoctorSchema } from "../models/doctor/doctorSchema";

export interface ICreateUser {
    fullName: string, email: string, phone: number, password: string
}

export interface IProfileVerificationInput {
    _id: string;
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: string;
    degree: string;
    university: string;
    yearOfCompletion: string;
    yearsOfExperience: string;
}

export interface IProfileVerificationRequestBody {
    registrationNumber: string;
    registrationCouncil: string;
    registrationYear: string;
    degree: string;
    university: string;
    yearOfCompletion: string;
    yearsOfExperience: string;
}

export interface IUpdateProfileRepository {
    addressLine: string;
    streetAddress: string;
    city: string;
    state: string;
    gender: string,
    specialization: string,
    languageSpoken: string,
    dob: string,
    country: string;
    pincode: string;
    about: string;
    headline: string;
    fullName: string;
}

export type IDoctorDocument = InferSchemaType<typeof DoctorSchema>;


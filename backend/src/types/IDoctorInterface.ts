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

export interface IDoctorRepository {
    createDoctor({ fullName, email, phone, password }: ICreateUser): Promise<IDoctorDocument>
    updateDoctor(_id: string, { fullName, headline, about, address }): Promise<void>
    findByEmail(email: string): Promise<IDoctor>
    findByID(_id: string): Promise<IDoctor>
    updateProfileData({
        _id,
        registrationNumber,
        registrationCouncil,
        registrationYear,
        yearsOfExperience,
        degree,
        university,
        yearOfCompletion
    }: IProfileVerificationInput): Promise<{ modifiedCount: number }>
    updateVerficationProofs(_id: string, establishmentProof: string | null, identityProof: string | null, medicalRegistration: string | null): Promise<UpdateResult>
    updatekProfileComplete(_id: string): Promise<UpdateResult>
    updateFees(_id: string, fees: number): Promise<UpdateResult>
    getFees(doctorId: string): Promise<number | null>
    changePassword(_id: string, password: string): Promise<UpdateResult>
    fetchAllApprovedDoctors(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean }>
    fetchAllRequestedDoctors(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean }>
    approveDoctor (_id: string): Promise<UpdateResult>
    deleteDoctor (_id: string): Promise<DeleteResult>
}
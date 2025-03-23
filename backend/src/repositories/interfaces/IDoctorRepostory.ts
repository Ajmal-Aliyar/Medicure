import mongoose, { DeleteResult, UpdateResult } from "mongoose"
import { IDoctor } from "../../models/doctor/doctorInterface"
import { ICreateUser, IDoctorDocument, IProfileVerificationInput } from "../../types/IDoctorInterface"

export interface IDoctorRepository {
    updateReview( _id: string, rating: number, reviewCount: number): Promise<UpdateResult>
    createDoctor({ fullName, email, phone, password }: ICreateUser): Promise<IDoctorDocument>
    updateDoctor(_id: string, { fullName, headline, about, address }): Promise<void>
    getMinDetails(_id: mongoose.Types.ObjectId): Promise<{ _id:mongoose.Types.ObjectId, fullName: string, profileImage: string }>
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
    fetchAllApprovedDoctors(skip: number, limit: number, searchQuery: string): Promise<{ data: IDoctor[], hasMore: boolean }>
    fetchAllRequestedDoctors(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean }>
    approveDoctor (_id: string): Promise<UpdateResult>
    deleteDoctor (_id: string): Promise<DeleteResult>
    block (_id:string): Promise<UpdateResult>
    unblock (_id:string): Promise<UpdateResult>
    getTopDoctors(skip: number, limit: number, specialization: string | null, search: string, sort: string,
        sortOrder: number, languageSpoken: string, yearsOfExperience: number | null
    ): Promise<{ data: IDoctor[], hasMore: boolean }>
}
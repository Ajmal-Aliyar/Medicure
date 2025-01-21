import { InferSchemaType, UpdateResult } from "mongoose";
import { ICreatePatient, IUpdateProfile } from "../../types/IPatientInterface";
import { PatientSchema } from "../../models/patient/patientSchema";
import { IPatient } from "../../models/patient/patientInterface";



export type IPatientDocument = InferSchemaType<typeof PatientSchema> 

export interface IPatientRepository {
    createUser ({fullName, email, phone, password}:ICreatePatient): Promise<IPatientDocument>
    findByEmail (email: string): Promise<IPatient> 
    findByID (_id: string): Promise<IPatient>
    changePassword (email: string, password: string): Promise<UpdateResult>
    getProfileData(_id: string): Promise<Partial<IPatient> | null>
    updateProfile ({ _id, dob, gender, address}: IUpdateProfile): Promise<UpdateResult>
    profileImage({ _id, profileImage }: { _id: string, profileImage: string }): Promise<UpdateResult>
    getAllPatient(skip: number, limit: number): Promise<{ data: IPatientDocument[], hasMore: boolean }>
    block(_id: string): Promise<UpdateResult> 
    unblock(_id: string): Promise<UpdateResult>
}
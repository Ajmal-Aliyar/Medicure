import { IDoctor } from "../../models/doctor/doctorInterface";
import { IPatient } from "../../models/patient/patientInterface";
import { IUpdateProfilePayload } from "../../types/IPatientInterface";

export interface IPatientServices {
    getProfile ( _id: string ): Promise<Partial<IPatient>>
    updateProfile ({ _id, dob, gender,  bloodGroup, houseName, street, city, state, country, pincode }:IUpdateProfilePayload): Promise<void>
    updateProfileImg (doctorId: string, newProfileImage: string): Promise<void>
    getTopDoctors(skip: number, limit: number, specialization: string | null, search: string, sort: string,
        sortOrder: number, languageSpoken: string, yearsOfExperience: number | null
    ): Promise<{ data: IDoctor[], hasMore: boolean }> 
}


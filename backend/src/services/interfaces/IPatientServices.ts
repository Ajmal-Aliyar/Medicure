import { IPatient } from "../../models/patient/patientInterface";
import { IUpdateProfilePayload } from "../../types/IPatientInterface";

export interface IPatientServices {
    getProfile ( _id: string ): Promise<Partial<IPatient>>
    updateProfile ({ _id, dob, gender,  bloodGroup, houseName, street, city, state, country, pincode }:IUpdateProfilePayload): Promise<void>
    updateProfileImg (doctorId: string, newProfileImage: string): Promise<void>
}


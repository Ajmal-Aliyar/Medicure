import { PatientProfileDto } from "@/dtos";

export interface IPatientService {
    getProfile(patientId: string): Promise<PatientProfileDto>
}
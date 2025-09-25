import { PatientProfileDTO } from "@/dtos";

export interface IPatientService {
  getProfile(patientId: string): Promise<PatientProfileDTO>;
  updateProfile(
    patientId: string,
    updateData: PatientProfileDTO
  ): Promise<void>;
  updateProfileImg(patientId: string, imageUrl: string): Promise<void>;
}

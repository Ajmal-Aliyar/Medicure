import { PatientProfileDto } from "@/dtos";

export interface IPatientService {
  getProfile(patientId: string): Promise<PatientProfileDto>;
  updateProfile(
    patientId: string,
    updateData: PatientProfileDto
  ): Promise<void>;
  updateProfileImg(patientId: string, imageUrl: string): Promise<void>;
}

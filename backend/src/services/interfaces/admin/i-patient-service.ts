import { PatientCardDetailsDTO, PatientProfileDTO } from "@/dtos";
import { IPagination } from "@/interfaces";
import { FilterPatientQuery } from "@/validators";

export interface IAdminPatientService {
  getFilteredPatient(
    PatientOptions: FilterPatientQuery,
    pagination: IPagination
  ): Promise<{ total: number; Patients: PatientCardDetailsDTO[] }>;
  getPatientProfile(PatientId: string | null): Promise<PatientProfileDTO>;
  blockPatient(PatientId: string, reason?: string): Promise<void>;
  unblockPatient(PatientId: string, reason?: string): Promise<void>;
}

import { PatientProfileDto } from "@/dtos";
import { IPagination } from "@/interfaces";
import { PatientCardDetails } from "@/interfaces/common/card-details";
import { FilterPatientQuery } from "@/validators";

export interface IAdminPatientService {
  getFilteredPatient(
    PatientOptions: FilterPatientQuery,
    pagination: IPagination
  ): Promise<{ total: number; Patients: PatientCardDetails[] }>;
  getPatientProfile(PatientId: string | null): Promise<PatientProfileDto>;
  blockPatient(PatientId: string, reason?: string): Promise<void>;
  unblockPatient(PatientId: string, reason?: string): Promise<void>;
}

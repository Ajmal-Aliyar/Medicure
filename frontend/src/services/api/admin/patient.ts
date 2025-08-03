import { api } from "@/lib/axios";
import type { PatientCardDetails } from "@/types/card";
import type { MetaType } from "@/types/common";
import type { IPatient } from "@/types/patient";


const BASE_URL = "/api/admin/patient";

interface IAdminPatientService {
  getPatients(
    queryParams: URLSearchParams
  ): Promise<{ data: PatientCardDetails[]; meta: MetaType }>;
  getPatientProfile(PatientId: string): Promise<IPatient>;
//   updatePatientStatus(
//     PatientId: string,
//     reviewStatus: "approved" | "rejected",
//     reviewComment?: string
//   ): Promise<boolean>;
  blockPatient(PatientId: string): Promise<boolean>;
  unBlockPatient(PatientId: string): Promise<boolean>;
}

export const adminPatientService: IAdminPatientService = {
  getPatients: async (
    queryParams: URLSearchParams
  ): Promise<{ data: PatientCardDetails[]; meta: MetaType }> => {
    const response = await api.get<{
      data: PatientCardDetails[];
      meta: MetaType;
    }>(`${BASE_URL}?${queryParams.toString()}`);
    return response.data;
  },

  getPatientProfile: async (
    PatientId: string
  ): Promise<IPatient> => {
    const response = await api.get<{ data: IPatient }>(
      `${BASE_URL}/${PatientId}/profile`
    );
    return response.data.data;
  },

//   updatePatientStatus: async (
//     PatientId: string,
//     reviewStatus: "approved" | "rejected",
//     reviewComment?: string
//   ): Promise<boolean> => {
//     const response = await api.patch<{ data: boolean }>(
//       `${BASE_URL}/${PatientId}/status`,
//       { reviewStatus, reviewComment }
//     );
//     return response.data.data;
//   },

  blockPatient: async (PatientId: string): Promise<boolean> => {
    const response = await api.post<{ data: boolean }>(`${BASE_URL}/${PatientId}/block`);
     return response.data.data;
  },

  unBlockPatient: async (PatientId: string): Promise<boolean> => {
    const response = await api.post<{ data: boolean }>(`${BASE_URL}/${PatientId}/unblock`);
     return response.data.data;
  },
};

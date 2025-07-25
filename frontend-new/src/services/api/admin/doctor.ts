import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type {
  DoctorProfileForAdmin,
  FilterDoctorSummary,
} from "@/types/doctor";

const BASE_URL = "/api/admin/doctor";

interface IAdminDoctorService {
  getDoctors(
    queryParams: URLSearchParams
  ): Promise<{ data: FilterDoctorSummary[]; meta: MetaType }>;
  getDoctorProfile(doctorId: string): Promise<DoctorProfileForAdmin>;
  updateDoctorStatus(
    doctorId: string,
    reviewStatus: "approved" | "rejected",
    reviewComment?: string
  ): Promise<boolean>;
  blockDoctor(doctorId: string): Promise<boolean>;
  unBlockDoctor(doctorId: string): Promise<boolean>;
}

export const adminDoctorService: IAdminDoctorService = {
  getDoctors: async (
    queryParams: URLSearchParams
  ): Promise<{ data: FilterDoctorSummary[]; meta: MetaType }> => {
    const response = await api.get<{
      data: FilterDoctorSummary[];
      meta: MetaType;
    }>(`${BASE_URL}?${queryParams.toString()}`);
    return response.data;
  },

  getDoctorProfile: async (
    doctorId: string
  ): Promise<DoctorProfileForAdmin> => {
    const response = await api.get<{ data: DoctorProfileForAdmin }>(
      `${BASE_URL}/${doctorId}/profile`
    );
    return response.data.data;
  },

  updateDoctorStatus: async (
    doctorId: string,
    reviewStatus: "approved" | "rejected",
    reviewComment?: string
  ): Promise<boolean> => {
    const response = await api.patch<{ data: boolean }>(
      `${BASE_URL}/${doctorId}/status`,
      { reviewStatus, reviewComment }
    );
    return response.data.data;
  },

  blockDoctor: async (doctorId: string): Promise<boolean> => {
    const response = await api.post<{ data: boolean }>(`${BASE_URL}/${doctorId}/block`);
     return response.data.data;
  },

  unBlockDoctor: async (doctorId: string): Promise<boolean> => {
    const response = await api.post<{ data: boolean }>(`${BASE_URL}/${doctorId}/unblock`);
     return response.data.data;
  },
};

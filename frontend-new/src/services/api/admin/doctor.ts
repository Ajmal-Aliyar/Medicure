import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { DoctorProfileForAdmin, FilterDoctorSummary } from "@/types/doctor";

const BASE_URL = "/api/admin/doctor";

export const adminDoctorService = {
  getDoctors: async (queryParams: URLSearchParams): Promise<{data: FilterDoctorSummary[], meta: MetaType}> => {
    const response = await api.get<{data: FilterDoctorSummary[], meta: MetaType}>(
      `${BASE_URL}?${queryParams.toString()}`
    );
    return response.data;
  },

  getDoctorProfile: async (doctorId: string): Promise<DoctorProfileForAdmin> => {
    const response = await api.get<{data: DoctorProfileForAdmin}>(
      `${BASE_URL}/${doctorId}/profile`
    );
    return response.data.data;
  },
};


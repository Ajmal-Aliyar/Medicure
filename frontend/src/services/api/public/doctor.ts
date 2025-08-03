import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { FilterDoctorSummary } from "@/types/doctor";

const BASE_URL = "/api/doctor";

export const publicDoctorService = {
  getDoctors: async (queryParams: URLSearchParams): Promise<{data: FilterDoctorSummary[], meta: MetaType}> => {
    const response = await api.get<{data: FilterDoctorSummary[], meta: MetaType}>(
      `${BASE_URL}?${queryParams.toString()}`
    );
    return response.data;
  }
};


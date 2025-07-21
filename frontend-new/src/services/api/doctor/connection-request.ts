import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IConnectionRequest, IConnectionRequestService } from "@/types/connection-request";

const BASE_URL = "/api/doctor/connection/request";

export interface IDoctorConnectionRequestService extends IConnectionRequestService {
  approveRequest: (requestId: string) => Promise<void> 
}

export const doctorConnectionRequestService: IDoctorConnectionRequestService = {
  getRequests: async (page: number): Promise<{ data: IConnectionRequest[], meta: MetaType}> => {
    const response = await api.get<{ data: IConnectionRequest[],  meta: MetaType}>(
      `${BASE_URL}?page=${page}`
    );
    return response.data;
  },

  approveRequest: async (requestId: string): Promise<void> => {
    const response = await api.patch(
      `${BASE_URL}/approve/${requestId}`
    );
    // return response.data;
  },
};

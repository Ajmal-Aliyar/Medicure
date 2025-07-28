import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { ConnectionRequestListDetails, IConnectionRequestService } from "@/types/connection-request";

const BASE_URL = "/api/doctor/connection/request";

export interface IDoctorConnectionRequestService extends IConnectionRequestService {
  approveRequest: (requestId: string) => Promise<boolean> 
}

export const doctorConnectionRequestService: IDoctorConnectionRequestService = {
  getRequests: async (page: number): Promise<{ data: ConnectionRequestListDetails[], meta: MetaType}> => {
    const response = await api.get<{ data: ConnectionRequestListDetails[],  meta: MetaType}>(
      `${BASE_URL}?page=${page}`
    );
    return response.data;
  },

  approveRequest: async (requestId: string): Promise<boolean> => {
    const response = await api.patch<{ status: boolean }>(
      `${BASE_URL}/approve/${requestId}`
    );
    return response.data.status;
  },
};

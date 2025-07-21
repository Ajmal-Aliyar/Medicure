import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { IConnectionRequest, IConnectionRequestService } from "@/types/connection-request";

const BASE_URL = "/api/admin/connection/request";

export interface IAdminConnectionRequestService extends IConnectionRequestService {
    request: (doctorId: string) => Promise<IConnectionRequest>
}

export const adminConnectionRequestService: IAdminConnectionRequestService = {
  getRequests: async (page: number): Promise<{ data: IConnectionRequest[], meta: MetaType}> => {
    const response = await api.get<{ data: IConnectionRequest[],  meta: MetaType}>(
      `${BASE_URL}?page=${page}`
    );
    return response.data;
  },
   request: async (doctorId: string): Promise<IConnectionRequest> => {
      const response = await api.post<{data: IConnectionRequest}>(`${BASE_URL}`, { doctorId }) 
      return response.data.data
    }
};

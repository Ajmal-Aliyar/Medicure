import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { ConnectionRequestListDetails, IConnectionRequest, IConnectionRequestService } from "@/types/connection-request";

const BASE_URL = "/api/patient/connection/request";

export interface IPatientConnectionRequestService extends IConnectionRequestService {
    request: (doctorId: string) => Promise<IConnectionRequest>
}

export const patientConnectionRequestService: IPatientConnectionRequestService = {
  getRequests: async (page: number): Promise<{ data: ConnectionRequestListDetails[], meta: MetaType}> => {
    const response = await api.get<{ data: ConnectionRequestListDetails[],  meta: MetaType}>(
      `${BASE_URL}?page=${page}`
    );
    return response.data;
  },
  request: async (doctorId: string): Promise<IConnectionRequest> => {
    const response = await api.post<{data: IConnectionRequest}>(`${BASE_URL}`, { doctorId }) 
    return response.data.data
  }
};

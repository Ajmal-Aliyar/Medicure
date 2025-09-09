import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type {
  IWithdrawRequest,
  IWithdrawRequestDTO,
  IWithdrawRequestService,
  IWithdrawRequestStatus,
} from "@/types/withdraw-request";

const BASE_URL = "/api/doctor/withdraw-request";

export const doctorWithdrawRequest: IWithdrawRequestService = {
  requestWithdraw: async (request: IWithdrawRequestDTO): Promise<IWithdrawRequest> => {
    const response = await api.post<{ data: IWithdrawRequest }>(`${BASE_URL}`, {
      request,
    });
    return response.data.data;
  },
  getWithdrawRequests: async (page: number, status?: IWithdrawRequestStatus): Promise<{ data: IWithdrawRequest[], meta: MetaType }> => {
    const response = await api.get<{ data: IWithdrawRequest[], meta: MetaType }>(`${BASE_URL}?page=${page}&status=${status}`);
    return response.data;
  },
  
  cancelWithdrawRequests: async( id: string): Promise<boolean> => {
    const response = await api.patch<{ data: boolean}>(`${BASE_URL}?requestId=${id}`)
    return  response.data.data
  }
};


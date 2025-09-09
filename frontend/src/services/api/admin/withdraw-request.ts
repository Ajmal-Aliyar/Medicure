import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type { Transaction } from "@/types/transaction";
import type {
  IWithdrawRequest,
  IWithdrawRequestDTO,
  IWithdrawRequestService,
  IWithdrawRequestStatus,
} from "@/types/withdraw-request";

const BASE_URL = "/api/admin/withdraw-request";

interface IAdminWithdrawRequestService extends IWithdrawRequestService {
  approveWithdrawRequests(id: string): Promise<Transaction>;
}

export const adminWithdrawRequest: IAdminWithdrawRequestService = {
  requestWithdraw: async (
    request: IWithdrawRequestDTO
  ): Promise<IWithdrawRequest> => {
    const response = await api.post<{ data: IWithdrawRequest }>(`${BASE_URL}`, {
      request,
    });
    return response.data.data;
  },
  getWithdrawRequests: async (
    page: number,
    status?: IWithdrawRequestStatus
  ): Promise<{ data: IWithdrawRequest[]; meta: MetaType }> => {
    const response = await api.get<{
      data: IWithdrawRequest[];
      meta: MetaType;
    }>(`${BASE_URL}?page=${page}&status=${status}`);
    return response.data;
  },
  cancelWithdrawRequests: async (id: string): Promise<boolean> => {
    const response = await api.patch<{ data: boolean }>(
      `${BASE_URL}?requestId=${id}`
    );
    return response.data.data;
  },

  approveWithdrawRequests: async (id: string): Promise<Transaction> => {
    const response = await api.patch<{ data: Transaction }>(
      `${BASE_URL}/approve?requestId=${id}`
    );
    return response.data.data;
  },
};

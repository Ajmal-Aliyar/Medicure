import { api } from "@/lib/axios";
import type { MetaType } from "@/types/common";
import type {
  IWithdrawRequest,
  IWithdrawRequestDTO,
  IWithdrawRequestService,
  IWithdrawRequestStatus,
} from "@/types/withdraw-request";

const BASE_URL = "/api/doctor/withdraw-request";
export interface IDoctorWithdrawRequest extends IWithdrawRequestService {}

export const doctorWithdrawRequest: IDoctorWithdrawRequest = {
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
};


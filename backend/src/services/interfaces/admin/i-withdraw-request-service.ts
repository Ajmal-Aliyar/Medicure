import { IPagination, IWithdrawRequestResponse } from "@/interfaces";

export interface IAdminWithdrawRequestService {
  getWithdrawRequests(
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponse[]; total: number }>;
}

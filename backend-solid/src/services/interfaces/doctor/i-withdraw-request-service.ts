import { IPagination, IWithdrawRequestResponse } from "@/interfaces";

export interface IDoctorWithdrawRequestService {
  getWithdrawRequests(
    id: string,
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponse[]; total: number }>;
}

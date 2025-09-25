import { IPagination, IWithdrawRequestResponseDTO } from "@/interfaces";

export interface IDoctorWithdrawRequestService {
  getWithdrawRequests(
    id: string,
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponseDTO[]; total: number }>;
  cancelWidthdrawRequest( doctorId: string, withdrawRequestId: string ): Promise<void>;
}

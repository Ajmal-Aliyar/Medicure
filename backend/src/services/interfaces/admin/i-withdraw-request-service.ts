import { IWithdrawRequestResponseDTO, TransactionDTO } from "@/dtos";
import { IPagination } from "@/interfaces";

export interface IAdminWithdrawRequestService {
  getWithdrawRequests(
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponseDTO[]; total: number }>;
  rejectWidthdrawRequest( withdrawRequestId: string ): Promise<void>;
  approveWithdrawRequest(
      adminId: string,
      clientId: string,
    ): Promise<TransactionDTO>;
}

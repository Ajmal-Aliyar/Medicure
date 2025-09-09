import { IPagination, IRole, IWithdrawRequestResponse } from "@/interfaces";
import { ITransaction } from "@/models";

export interface IAdminWithdrawRequestService {
  getWithdrawRequests(
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponse[]; total: number }>;
  rejectWidthdrawRequest( withdrawRequestId: string ): Promise<void>;
  approveWithdrawRequest(
      adminId: string,
      clientId: string,
    ): Promise<ITransaction>;
}

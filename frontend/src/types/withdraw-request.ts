import type { IRole } from "./auth";
import type { MetaType } from "./common";
export type IWithdrawRequestStatus = "pending" | "approved" | "rejected" | "cancelled" | 'all';

export interface IWithdrawRequest {
    id: string;
    requester: {
        profileImage: string;
        fullName: string;
        specialization?: string;
    }
  requesterId: string;
  role: IRole;
  amount: number;
  accountNumber: string;
  accountName: string;
  IFSC_Code: string;
  status: IWithdrawRequestStatus;
  comment?: string;
  requestedAt: string;
  processedAt?: string;
}

export interface IWithdrawRequestDTO {
    accountNumber: string;
    accountName: string;
    IFSC_Code: string;
    status: IWithdrawRequestStatus;
    amount: number;
    comment?: string;
    requestedAt: Date;
  }


export interface IWithdrawRequestService {
  requestWithdraw: (request: IWithdrawRequestDTO) => Promise<IWithdrawRequest>;
  getWithdrawRequests(page: number, status?: IWithdrawRequestStatus): Promise<{ data: IWithdrawRequest[], meta: MetaType }>;
  cancelWithdrawRequests( id: string, status: string): Promise<boolean>;
}
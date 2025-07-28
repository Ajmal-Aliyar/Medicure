import { IRole } from "./IRole";
export type IWithdrawRequestStatus = "pending" | "approved" | "rejected";

export interface IWithdrawRequestDTO {
  accountNumber: string;
  accountName: string;
  IFSC_Code: string;
  amount: number;
  status: IWithdrawRequestStatus;
  comment?: string;
  requestedAt: Date;
}

export interface IWithdrawRequestResponse {
  id: string;
  requester?: {
    profileImage: string | null;
    fullName: string;
    specialization?: string;
  };
  requesterId: string;
  role: IRole;
  amount: number;
  accountNumber: string;
  accountName: string;
  IFSC_Code: string;
  status: IWithdrawRequestStatus;
  requestedAt: Date;
  processedAt?: Date;
}

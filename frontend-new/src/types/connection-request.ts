import type { MetaType } from "./common";

export type IConnectionRequestStatus = "pending" | "accepted" | "rejected"
export interface IConnectionRequest {
  initiatorId: string;
  doctorId: string;
  status: IConnectionRequestStatus;
  createdAt: Date;
}

export interface IConnectionRequestService {
    getRequests: (page: number) => Promise<{data: ConnectionRequestListDetails[], meta: MetaType}>
}


export interface ConnectionRequestListDetails {
  id: string;
  status: IConnectionRequestStatus;
  createdAt: Date;
  updatedAt: Date;
  doctor: {
    id: string;
    fullName: string;
    profileImage: string;
  };
  patient: {
    id: string;
    fullName: string;
    profileImage: string;
  };
}
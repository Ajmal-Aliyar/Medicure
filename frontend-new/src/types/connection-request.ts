import type { MetaType } from "./common";

export interface IConnectionRequest {
  initiatorId: string;
  doctorId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

export interface IConnectionRequestService {
    getRequests: (page: number) => Promise<{data: IConnectionRequest[], meta: MetaType}>
}
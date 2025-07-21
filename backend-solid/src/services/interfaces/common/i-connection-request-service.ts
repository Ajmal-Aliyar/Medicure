import { IConnectionRequest } from "@/models";

export interface IConnectionRequestService {
    createRequest(
        initiatorId: string,
        role: string,
        doctorId: string
      ): Promise<IConnectionRequest>;
      approveRequest(doctorId: string, requestId: string): Promise<void>;
}
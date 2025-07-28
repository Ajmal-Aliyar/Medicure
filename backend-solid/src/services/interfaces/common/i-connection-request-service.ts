import { ConnectionRequestListDetails, IPagination, IRole } from "@/interfaces";
import { IConnectionRequest } from "@/models";

export interface IConnectionRequestService {
  createRequest(
    patientId: string,
    role: IRole,
    doctorId: string
  ): Promise<void>
  approveRequest(doctorId: string, requestId: string): Promise<void>;
 getConnectionRequests(
     id: string,
     role: IRole,
     pagination: IPagination
   ): Promise<{ data: ConnectionRequestListDetails[]; total: number }>;
}

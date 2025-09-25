import { IWithdrawRequestDTO } from "@/dtos/withdraw-request-dtos";
import { IRole } from "@/interfaces";

export interface IWithdrawRequestService {
    createWithdrawRequest(requesterId: string, role: IRole, withdraw: IWithdrawRequestDTO ): Promise<void>
}
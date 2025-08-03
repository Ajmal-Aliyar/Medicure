import { IRole, IWithdrawRequestDTO } from "@/interfaces";
import { IWithdrawRequest } from "@/models";

export interface IWithdrawRequestService {
    createWithdrawRequest(requesterId: string, role: IRole, withdraw: IWithdrawRequestDTO ): Promise<IWithdrawRequest>
}
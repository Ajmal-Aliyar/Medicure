import { IWithdrawRequests, IWithdrawSchema } from "../../models/withdraw/withdrawInterface";

export interface IWithdrawService {
    createWithdrawRequest(
        data: Partial<IWithdrawSchema>
    ): Promise<IWithdrawSchema>

    getWithdrawRequests(
        status: string, skip: number, limit: number
    ): Promise<{ withdrawRequests: IWithdrawRequests[], total: number }>

    getWithdrawRequestsByUser(
        _id: string, status: string, skip: number, limit: number
    ): Promise<{ withdrawRequests: IWithdrawRequests[], total: number }>

    approveWithdrawRequest(
        _id: string
    ): Promise<string>

    cancelWithdrawRequest(
        _id: string
    ): Promise<string>
}
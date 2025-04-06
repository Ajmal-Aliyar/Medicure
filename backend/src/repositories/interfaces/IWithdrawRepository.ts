import { UpdateResult } from "mongoose";
import { IWithdrawRequests, IWithdrawSchema } from "../../models/withdraw/withdrawInterface";

export interface IWithdrawRepository {
    createWithdrawRequest(
            data: Partial<IWithdrawSchema>
          ): Promise<IWithdrawSchema>
    
    getWithdrawRequests(
        status: string, skip: number, limit: number, _id?: string,
    ): Promise<{ withdrawRequests: IWithdrawRequests[], total: number }>

    getWithdrawRequestById(
        _id: string
    ): Promise<IWithdrawSchema>

    updateWithdrawRequest(
        _id: string, status: string
    ): Promise<UpdateResult>
}
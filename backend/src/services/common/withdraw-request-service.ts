import { TYPES } from "@/di/types";
import { IWithdrawRequestRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IWithdrawRequestService } from "../interfaces";
import { IWithdrawRequest } from "@/models";
import { IRole, IWithdrawRequestDTO } from "@/interfaces";
import { Types } from "mongoose";


@injectable()
export class WithdrawRequestService implements IWithdrawRequestService {
    constructor(
        @inject(TYPES.WithdrawRequestRepository) private readonly _withdrawRequestRepo: IWithdrawRequestRepository
    ) {}

    async createWithdrawRequest(requesterId: string, role: IRole, withdraw: IWithdrawRequestDTO ): Promise<IWithdrawRequest> {
        const WithdrawRequest = { requesterId: new Types.ObjectId(requesterId), role , ...withdraw }
        console.log(WithdrawRequest, withdraw, 'sd');
        
        return await this._withdrawRequestRepo.create(WithdrawRequest)
      }
}
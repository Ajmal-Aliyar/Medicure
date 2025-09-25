import { TYPES } from "@/di/types";
import { IWithdrawRequestRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IWithdrawRequestService } from "../interfaces";
import { IRole } from "@/interfaces";
import { Types } from "mongoose";
import { IWithdrawRequestDTO } from "@/dtos/withdraw-request-dtos";


@injectable()
export class WithdrawRequestService implements IWithdrawRequestService {
    constructor(
        @inject(TYPES.WithdrawRequestRepository) private readonly _withdrawRequestRepo: IWithdrawRequestRepository
    ) {}

    async createWithdrawRequest(requesterId: string, role: IRole, withdraw: IWithdrawRequestDTO ): Promise<void> {
        const WithdrawRequest = { requesterId: new Types.ObjectId(requesterId), role , ...withdraw }
        console.log(WithdrawRequest, withdraw, 'sd');
        
        await this._withdrawRequestRepo.create(WithdrawRequest)
      }
}
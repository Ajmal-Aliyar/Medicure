import { TYPES } from "@/di/types";
import { IWithdrawRequestRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IDoctorWithdrawRequestService } from "../interfaces";
import {
  IPagination,
  IWithdrawRequestResponse,
} from "@/interfaces";
import { Types } from "mongoose";
import { WithdrawRequestMapper } from "@/mappers";

@injectable()
export class DoctorWithdrawRequestService
  implements IDoctorWithdrawRequestService
{
  constructor(
    @inject(TYPES.WithdrawRequestRepository)
    private readonly withdrawRequestRepo: IWithdrawRequestRepository
  ) {}

  async getWithdrawRequests(
    id: string,
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponse[]; total: number }> {
    const filter = { requesterId: new Types.ObjectId(id), ...( status !== 'all' && {status}) };
    const { data, total } = await this.withdrawRequestRepo.findAll({
      filter,
      ...pagination,
      sort: { requestedAt: -1 },
    });
    const mappedRequests =
      WithdrawRequestMapper.toWithdrawRequestResponse(data);
    return { requests: mappedRequests, total };
  }
}

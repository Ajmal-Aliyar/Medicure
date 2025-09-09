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
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "@/errors";

@injectable()
export class DoctorWithdrawRequestService
  implements IDoctorWithdrawRequestService
{
  constructor(
    @inject(TYPES.WithdrawRequestRepository)
    private readonly _withdrawRequestRepo: IWithdrawRequestRepository
  ) {}

  async getWithdrawRequests(
    id: string,
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponse[]; total: number }> {
    const filter = { requesterId: new Types.ObjectId(id), ...( status !== 'all' && {status}) };
    const { data, total } = await this._withdrawRequestRepo.findAll({
      filter,
      ...pagination,
      sort: { requestedAt: -1 },
    });
    const mappedRequests =
      WithdrawRequestMapper.toWithdrawRequestResponse(data);
    return { requests: mappedRequests, total };
  }

  async cancelWidthdrawRequest( doctorId : string, withdrawRequestId: string ): Promise<void> {
    const withdrawRequest = await this._withdrawRequestRepo.findById(withdrawRequestId)
    if (!withdrawRequest) {
      throw new NotFoundError("Withdraw request not found with this id.")
    }
    if (String(withdrawRequest.requesterId) !== doctorId) {
      throw new ForbiddenError("Not allowed do this action.")
    }
    const updated = await this._withdrawRequestRepo.update( withdrawRequestId, {status: 'cancelled'})
    if (!updated) {
      throw new BadRequestError("Not able to cancel withdraw request.")
    }
  }
}

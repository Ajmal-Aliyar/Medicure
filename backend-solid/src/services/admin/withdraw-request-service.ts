import { TYPES } from "@/di/types";
import {
  IAdminRepository,
  IDoctorRepository,
  IWithdrawRequestRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import { IAdminWithdrawRequestService } from "../interfaces";
import { IPagination, IWithdrawRequestResponse } from "@/interfaces";
import { WithdrawRequestMapper } from "@/mappers";
import { IAdmin, IDoctor } from "@/models";
import { NotFoundError } from "@/errors";

@injectable()
export class AdminWithdrawRequestService
  implements IAdminWithdrawRequestService
{
  constructor(
    @inject(TYPES.WithdrawRequestRepository)
    private readonly withdrawRequestRepo: IWithdrawRequestRepository,
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,
    @inject(TYPES.AdminRepository)
    private readonly adminRepo: IAdminRepository
  ) {}

  async getWithdrawRequests(
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponse[]; total: number }> {
    const filter = { ...(status !== "all" && { status }) };
    const { data, total } = await this.withdrawRequestRepo.findAll({
      filter,
      ...pagination,
      sort: { requestedAt: -1 },
    });

    const mappedRequests = await Promise.all(
      data.map(async (request) => {
        let requesterDetails: IDoctor | IAdmin | null = null;

        if (request.role === "doctor") {
          requesterDetails = await this.doctorRepo.findById(
            String(request.requesterId)
          );
        } else if (request.role === "admin") {
          requesterDetails = await this.adminRepo.findById(
            String(request.requesterId)
          );
        }

        if (!requesterDetails) {
          throw new NotFoundError("Requester details not found");
        }

        return WithdrawRequestMapper.toWithdrawRequestAdminResponse(
          request,
          requesterDetails
        );
      })
    );

    return { requests: mappedRequests, total };
  }
}

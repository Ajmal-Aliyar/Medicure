import { TYPES } from "@/di/types";
import {
  IAdminRepository,
  IDoctorRepository,
  ITransactionRepository,
  IWalletRepository,
  IWithdrawRequestRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import { IAdminWithdrawRequestService } from "../interfaces";
import { IPagination, IRole, IWithdrawRequestResponse } from "@/interfaces";
import { WithdrawRequestMapper } from "@/mappers";
import { IAdmin, IDoctor, IWithdrawRequest } from "@/models";
import { BadRequestError, NotFoundError } from "@/errors";
import { Types } from "mongoose";
import { generateTransactionId } from "@/utils";

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
    private readonly adminRepo: IAdminRepository,
    @inject(TYPES.WalletRepository)
    private readonly walletRepo: IWalletRepository,
    @inject(TYPES.TransactionRepository)
    private readonly transactionRepo: ITransactionRepository
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

  async rejectWidthdrawRequest(withdrawRequestId: string): Promise<void> {
    const updated = await this.withdrawRequestRepo.update(withdrawRequestId, {
      status: "rejected",
    });
    if (!updated) {
      throw new BadRequestError("Not able to cancel withdraw request.");
    }
  }

  async approveWithdrawRequest(
    adminId: string,
    requestId: string
  ): Promise<string> {
    try {
      const companyWallet = await this.walletRepo.findOne({ ownerId: adminId });
      if (!companyWallet) throw new NotFoundError("Company wallet not found");

      const request = await this.withdrawRequestRepo.findById(requestId);

      if (!request)
        throw new NotFoundError(
          "Withdraw request not found or already processed"
        );

      const clientWallet = await this.walletRepo.findOne({
        ownerId: request.requesterId,
      });
      if (!clientWallet) throw new NotFoundError("Client wallet not found");

      if (clientWallet.balance < request.amount) {
        throw new Error("Insufficient balance in client account");
      }

      const amount = request.amount - 20;
      if (companyWallet.balance < amount) {
        throw new Error("Insufficient balance in company account");
      }

      request.status = "approved";
      await request.save();


      await this.transactionRepo.create({
        transactionId: generateTransactionId(),
        from: new Types.ObjectId(adminId),
        to: request.requesterId,
        amount: amount,
        doctorId: request.requesterId,
        type: "withdraw",
        status: "success",
      });

      await this.walletRepo.updateBalance(
        String(request.requesterId),
        "doctor",
        amount,
        false
      );
      await this.walletRepo.updateBalance(adminId, "admin", amount, false);

      return "Withdraw request approved successfully";
    } catch (error) {
      console.error("Error approving withdraw request:", error);
      throw error;
    }
  }
}

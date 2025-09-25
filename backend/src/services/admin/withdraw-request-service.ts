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
import { IPagination } from "@/interfaces";
import { WithdrawRequestMapper } from "@/mappers";
import { IAdmin, IDoctor } from "@/models";
import { BadRequestError, NotFoundError } from "@/errors";
import { Types } from "mongoose";
import { generateTransactionId } from "@/utils";
import { IWithdrawRequestResponseDTO, TransactionDTO } from "@/dtos";

@injectable()
export class AdminWithdrawRequestService
  implements IAdminWithdrawRequestService
{
  constructor(
    @inject(TYPES.WithdrawRequestRepository)
    private readonly _withdrawRequestRepo: IWithdrawRequestRepository,
    @inject(TYPES.DoctorRepository)
    private readonly _doctorRepo: IDoctorRepository,
    @inject(TYPES.AdminRepository)
    private readonly _adminRepo: IAdminRepository,
    @inject(TYPES.WalletRepository)
    private readonly _walletRepo: IWalletRepository,
    @inject(TYPES.TransactionRepository)
    private readonly _transactionRepo: ITransactionRepository
  ) {}

  async getWithdrawRequests(
    status: string,
    pagination: IPagination
  ): Promise<{ requests: IWithdrawRequestResponseDTO[]; total: number }> {
    const filter = { ...(status !== "all" && { status }) };
    const { data, total } = await this._withdrawRequestRepo.findAll({
      filter,
      ...pagination,
      sort: { requestedAt: -1 },
    });

    const mappedRequests = await Promise.all(
      data.map(async (request) => {
        let requesterDetails: IDoctor | IAdmin | null = null;

        if (request.role === "doctor") {
          requesterDetails = await this._doctorRepo.findById(
            String(request.requesterId)
          );
        } else if (request.role === "admin") {
          requesterDetails = await this._adminRepo.findById(
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
    const updated = await this._withdrawRequestRepo.update(withdrawRequestId, {
      status: "rejected",
    });
    if (!updated) {
      throw new BadRequestError("Not able to cancel withdraw request.");
    }
  }

  async approveWithdrawRequest(
    adminId: string,
    requestId: string
  ): Promise<TransactionDTO> {
    try {
      const companyWallet = await this._walletRepo.findOne({ ownerId: adminId });
      if (!companyWallet) throw new NotFoundError("Company wallet not found");

      const request = await this._withdrawRequestRepo.findById(requestId);

      if (!request)
        throw new NotFoundError(
          "Withdraw request not found or already processed"
        );

      const clientWallet = await this._walletRepo.findOne({
        ownerId: request.requesterId,
      });
      if (!clientWallet) throw new NotFoundError("Client wallet not found");

      if (clientWallet.balance < request.amount) {
        throw new BadRequestError("Insufficient balance in client account");
      }

      const amount = request.amount - 20;
      if (companyWallet.balance < amount) {
        throw new BadRequestError("Insufficient balance in company account");
      }

      request.status = "approved";
      await request.save();


      const transaction = await this._transactionRepo.create({
        transactionId: generateTransactionId(),
        from: new Types.ObjectId(adminId),
        to: request.requesterId,
        amount: amount,
        doctorId: request.requesterId,
        type: "withdraw",
        status: "success",
      });

      await this._walletRepo.updateBalance(
        String(request.requesterId),
        "doctor",
        request.amount,
        false
      );
      await this._walletRepo.updateBalance(adminId, "admin", amount, false);

      return transaction;
    } catch (error) {
      console.error("Error approving withdraw request:", error);
      throw error;
    }
  }
}

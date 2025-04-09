import {
  IWithdrawRequests,
  IWithdrawSchema,
} from "../../models/withdraw/withdrawInterface";
import { ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { IWalletRepository } from "../../repositories/interfaces/IWalletRepository";
import { IWithdrawRepository } from "../../repositories/interfaces/IWithdrawRepository";
import { generateId } from "../../utils/otpUtil";
import { IWithdrawService } from "../interfaces/IWithdrawService";

export class WithdrawService implements IWithdrawService {
  private withdrawRepository: IWithdrawRepository;
  private walletRepository: IWalletRepository;
  private transactionRepository: ITransactionRepository;

  constructor(
    withdrawRepository: IWithdrawRepository,
    walletRepository: IWalletRepository,
    transactionRepository: ITransactionRepository
  ) {
    this.withdrawRepository = withdrawRepository;
    this.walletRepository = walletRepository;
    this.transactionRepository = transactionRepository;
  }

  async createWithdrawRequest(
    data: Partial<IWithdrawSchema>
  ): Promise<IWithdrawSchema> {
    return await this.withdrawRepository.createWithdrawRequest(data);
  }

  async getWithdrawRequests(
    status: string,
    skip: number,
    limit: number
  ): Promise<{ withdrawRequests: IWithdrawRequests[]; total: number }> {
    try {
      return await this.withdrawRepository.getWithdrawRequests(
        status,
        skip,
        limit
      );
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  async getWithdrawRequestsByUser(
    _id: string,
    status: string,
    skip: number,
    limit: number
  ): Promise<{ withdrawRequests: IWithdrawRequests[]; total: number }> {
    try {
      return await this.withdrawRepository.getWithdrawRequests(
        status,
        skip,
        limit,
        _id
      );
    } catch (error: unknown) {
      console.error(error);
      throw error;
    }
  }

  async approveWithdrawRequest(_id: string): Promise<string> {
    try {
      const companyWallet =
        await this.walletRepository.getWalletBalanceByOwnerId("Company");
      const request: IWithdrawSchema =
        await this.withdrawRepository.getWithdrawRequestById(_id);

      if (companyWallet < request.amount) {
        throw new Error("Insufficient balance in accound.");
      }

      const updateResult = await this.withdrawRepository.updateWithdrawRequest(
        _id,
        "approved"
      );
      if (updateResult.modifiedCount <= 0) {
        throw new Error("unable to approve.");
      }

      await this.transactionRepository.createTransaction(
        generateId(),
        "Company",
        request.recieverId,
        request.amount,
        "withdraw"
      );

      await this.walletRepository.decrement("Company", request.amount);
      await this.walletRepository.decrement(request.recieverId, request.amount);

      return "withdraw request approved successfully";
    } catch (error: unknown) {
      throw error;
    }
  }

  async cancelWithdrawRequest(_id: string): Promise<string> {
    try {
      const updateResult = await this.withdrawRepository.updateWithdrawRequest(
        _id,
        "rejected"
      );

      if (updateResult.modifiedCount <= 0) {
        throw new Error("unable to cancel.");
      }

      return "withdraw request cancelled successfully";
    } catch (error: unknown) {
      throw error;
    }
  }
}

import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IWalletRepository } from "@/repositories";
import { IWalletService } from "../interfaces";
import { IWallet } from "@/models";
import { IRole } from "@/interfaces";
import { Types } from "mongoose";
import { NotFoundError } from "@/errors";

@injectable()
export class WalletService implements IWalletService {
  constructor(
    @inject(TYPES.WalletRepository)
    private readonly _walletRepo: IWalletRepository
  ) {}

  async createWallet(ownerId: string, ownerType: IRole): Promise<IWallet> {
    const existing = await this._walletRepo.findOne({ ownerId, ownerType });

    if (existing) {
      return existing;
    }

    const newWallet: Partial<IWallet> = {
      ownerId: new Types.ObjectId(ownerId),
      ownerType,
      balance: 0,
    };

    return await this._walletRepo.create(newWallet);
  }

  async updateWalletBalance(ownerId: string, ownerType: IRole, amount: number, inc = true): Promise<IWallet | null> {
    return await this._walletRepo.updateBalance(
            ownerId,
            ownerType,
            amount,
            inc
          );
  }

  async getWalletByOwnerId(ownerId: string): Promise<IWallet> {
    const wallet = await this._walletRepo.findOne({ownerId: new Types.ObjectId(ownerId)})
    if (!wallet) {
      throw new NotFoundError("Wallet not found.")
    }
    return wallet
  }

}

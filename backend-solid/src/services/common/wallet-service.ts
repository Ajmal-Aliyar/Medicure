import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IWalletRepository } from "@/repositories";
import { IWalletService } from "../interfaces";
import { IWallet } from "@/models";
import { IRole } from "@/interfaces";
import { Types } from "mongoose";

@injectable()
export class WalletService implements IWalletService {
  constructor(
    @inject(TYPES.WalletRepository)
    private readonly walletRepo: IWalletRepository
  ) {}

  async createWallet(ownerId: string, ownerType: IRole): Promise<IWallet> {
    const existing = await this.walletRepo.findOne({ ownerId, ownerType });

    if (existing) {
      return existing;
    }

    const newWallet: Partial<IWallet> = {
      ownerId: new Types.ObjectId(ownerId),
      ownerType,
      balance: 0,
    };

    return await this.walletRepo.create(newWallet);
  }

  async updateWalletBalance(ownerId: string, ownerType: IRole, amount: number): Promise<IWallet | null> {
    return await this.walletRepo.updateBalance(
            ownerId,
            ownerType,
            amount
          );
  }

}

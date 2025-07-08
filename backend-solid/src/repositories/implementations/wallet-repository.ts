import { IWallet, Wallet } from "@/models";
import { BaseRepository } from "../base";
import { IWalletRepository } from "../interfaces";
import { Types } from "mongoose";
import { IRole } from "@/interfaces";

export class WalletRepository
  extends BaseRepository<IWallet>
  implements IWalletRepository
{
  constructor() {
    super(Wallet);
  }

  async updateBalance(ownerId: string, ownerType: IRole, amount: number): Promise<IWallet | null> {
    return await this.model.findOneAndUpdate(
      { ownerId: new Types.ObjectId(ownerId), ownerType },
      { $inc: { balance: amount } },
      { new: true }
    );
  }
}

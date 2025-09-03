import { IWallet } from "@/models";
import { BaseRepository } from "../base";
import { IRole } from "@/interfaces";

export interface IWalletRepository extends BaseRepository<IWallet> {
    updateBalance(
  ownerId: string,
  ownerType: IRole,
  amount: number,
  inc: boolean
): Promise<IWallet | null>
}
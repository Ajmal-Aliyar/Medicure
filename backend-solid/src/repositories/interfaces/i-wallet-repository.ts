import { IWallet } from "@/models";
import { BaseRepository } from "../base";
import { IRole } from "@/interfaces";

export interface IWalletRepository extends BaseRepository<IWallet> {
    updateBalance(ownerId: string, ownerType: IRole, amount: number): Promise<IWallet | null>
}
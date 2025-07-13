import { IRole } from "@/interfaces";
import { IWallet } from "@/models";

export interface IWalletService {
    createWallet(ownerId: string, ownerType: IRole): Promise<IWallet>
    updateWalletBalance(ownerId: string, ownerType: IRole, amount: number): Promise<IWallet | null>
    getWalletByOwnerId(ownerId: string): Promise<IWallet>
}
import { IRole } from "@/interfaces";
import { IWallet } from "@/models";

export interface IWalletService {
    createWallet(ownerId: string, ownerType: IRole): Promise<IWallet>
    updateWalletBalance(ownerId: string, ownerType: IRole, amount: number, inc: boolean): Promise<IWallet | null>
    getWalletByOwnerId(ownerId: string): Promise<IWallet>
}
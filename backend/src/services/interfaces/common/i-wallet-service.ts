import { WalletDTO } from "@/dtos";
import { IRole } from "@/interfaces";

export interface IWalletService {
    createWallet(ownerId: string, ownerType: IRole): Promise<WalletDTO>
    updateWalletBalance(ownerId: string, ownerType: IRole, amount: number, inc: boolean): Promise<WalletDTO | null>
    getWalletByOwnerId(ownerId: string): Promise<WalletDTO>
}
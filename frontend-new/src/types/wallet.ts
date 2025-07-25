import type { IRole } from "./auth";

export interface IWallet {
    ownerId: string; 
    ownerType: IRole;
    balance: number;
}

export interface IWalletService {
    getWallet(): Promise<IWallet>
}

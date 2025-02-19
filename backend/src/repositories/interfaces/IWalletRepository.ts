import { IWalletDocument } from "../../models/wallet/walletSchema";

export interface IWalletRepository {
    createWallet(ownerId: string, role: string): Promise<IWalletDocument>
    getWalletBalanceByOwnerId(ownerId: string): Promise<number>
    increment(ownerId: string, amount: number): Promise<IWalletDocument>
    decrement(ownerId: string, amount: number): Promise<IWalletDocument>
}
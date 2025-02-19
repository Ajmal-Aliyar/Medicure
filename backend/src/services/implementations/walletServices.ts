import { IWalletRepository } from "../../repositories/interfaces/IWalletRepository";
import { IWalletServices } from "../interfaces/IWalletServices";



export class WalletServices implements IWalletServices {
    private walletRepository: IWalletRepository

    constructor( walletRepository: IWalletRepository ) {
        this.walletRepository = walletRepository
    }

    async getWallet(ownerId: string): Promise<number> {
        try {
            return await this.walletRepository.getWalletBalanceByOwnerId(ownerId)
        } catch (error: unknown) {
            console.error(error)
            throw error
        }
    }
}
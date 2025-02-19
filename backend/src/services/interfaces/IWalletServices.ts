export interface IWalletServices {
    getWallet(ownerId: string): Promise<number>
}
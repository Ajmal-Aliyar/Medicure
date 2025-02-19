import { NextFunction, Request, Response } from "express";
import { IWalletServices } from "../services/interfaces/IWalletServices";

export class WalletController {
    private walletServices: IWalletServices

    constructor( walletServices: IWalletServices ) {
        this.walletServices = walletServices

        this.getWallet = this.getWallet.bind(this)
    }

    async getWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req.client
            const wallet = await this.walletServices.getWallet(_id)
            res.status(200).json({walletBalance: wallet})
        } catch (error: unknown) {
            console.error(error)
            next(error)
        }
    }
}
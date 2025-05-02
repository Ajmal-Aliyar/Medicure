import { NextFunction, Request, Response } from "express";
import { IWalletServices } from "../services/interfaces/IWalletServices";

export class WalletController {
  private walletServices: IWalletServices;

  constructor(walletServices: IWalletServices) {
    this.walletServices = walletServices;

    this.getWallet = this.getWallet.bind(this);
  }

  async getWallet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      let { _id: clientId, role } = req.client;
      clientId = role === "admin" ? "Company" : clientId;
      const wallet = await this.walletServices.getWallet(clientId);
      res.status(200).json({ walletBalance: wallet });
    } catch (error: unknown) {
      console.error(error);
      next(error);
    }
  }
}

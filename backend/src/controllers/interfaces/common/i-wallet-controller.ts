import { Request, Response } from "express";

export interface IWalletController {
    getWallet(
      req: Request,
      res: Response
    ): Promise<void>
}
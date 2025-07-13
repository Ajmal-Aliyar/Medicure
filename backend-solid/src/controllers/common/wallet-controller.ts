import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IWalletService } from "@/services";
import { successResponse } from "@/utils";
import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants";
import { IWalletController } from "../interfaces";

@injectable()
export class WalletController implements IWalletController {
  constructor(
    @inject(TYPES.WalletService) private readonly WalletService: IWalletService
  ) {}

  getWallet = async (req: Request, res: Response): Promise<void> => {
    const id = req.user.id;
    const wallet = await this.WalletService.getWalletByOwnerId(id);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Wallet fetched successfully.",
      wallet
    );
  };
}

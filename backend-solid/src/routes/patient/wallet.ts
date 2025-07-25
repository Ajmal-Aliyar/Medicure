import { IWalletController } from "@/controllers";
import { getContainer } from "@/di";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";
import { Router } from "express";

export const createWalletRouter = (): Router => {
  const router = Router();
  const container = getContainer();
  const walletController = container.get<IWalletController>(
    TYPES.WalletController
  );

  router.get("/", asyncHandler(walletController.getWallet));

  return router;
};

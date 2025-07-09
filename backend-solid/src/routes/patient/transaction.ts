import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { ITransactionController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";


export const createTransactionRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const transactionController = container.get<ITransactionController>(TYPES.TransactionController);

  router.get('/', asyncHandler(transactionController.getTransactions))

 
  return router;
};

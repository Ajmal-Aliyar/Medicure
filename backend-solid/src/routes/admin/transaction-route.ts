import { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IAdminTransactionController, ITransactionController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";


export const createTransactionRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const transactionController = container.get<ITransactionController>(TYPES.TransactionController);
  const adminTransactionController = container.get<IAdminTransactionController>(TYPES.AdminTransactionController);

  router.get('/', asyncHandler(transactionController.getTransactions))
  router.get('/chart', asyncHandler(adminTransactionController.getTransactionDashboard))

 
  return router;
};

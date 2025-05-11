import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { TransactionRepository } from "../repositories/implementations/transactionRepository";
import { TransactionServices } from "../services/implementations/transactionServices";
import { TransactionController } from "../controllers/transactionController";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

const transactionRepository = new TransactionRepository();
const transactionServices = new TransactionServices(transactionRepository);
const transactionController = new TransactionController(transactionServices);

router.get(
  "/get-transaction",
  tokenMiddleware,
  transactionController.getTransactionById
);
router.get(
  "/get-revenue",
  tokenMiddleware,
  authorizeRoles('admin'),
  transactionController.getTransactionDetails
);

export default router;

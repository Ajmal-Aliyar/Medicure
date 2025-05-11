import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { WithdrawController } from "../controllers/withdrawController";
import { WithdrawRepository } from "../repositories/implementations/withdrawRepository";
import { WithdrawService } from "../services/implementations/withdrawService";
import { WalletRepository } from "../repositories/implementations/walletRepository";
import { TransactionRepository } from "../repositories/implementations/transactionRepository";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

const withdrawRepository = new WithdrawRepository();
const walletRepository = new WalletRepository();
const transactionRepository = new TransactionRepository();
const withdrawService = new WithdrawService(
  withdrawRepository,
  walletRepository,
  transactionRepository
);
const withdrawController = new WithdrawController(withdrawService);

router.post("/", tokenMiddleware, withdrawController.createWithdrawRequest);
router.get(
  "/",
  tokenMiddleware,
  authorizeRoles('admin'),
  withdrawController.getWithdrawRequests
);
router.get(
  "/user",
  tokenMiddleware,
  withdrawController.getWithdrawRequestsByUser
);
router.patch(
  "/approve",
  tokenMiddleware,
  authorizeRoles('admin'),
  withdrawController.approveWithdrawRequest
);
router.patch(
  "/cancel",
  tokenMiddleware,
  withdrawController.cancelWithdrawRequest
);

export default router;

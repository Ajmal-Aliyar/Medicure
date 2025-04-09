import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { WithdrawController } from "../controllers/withdrawController";
import { WithdrawRepository } from "../repositories/implementations/withdrawRepository";
import { WithdrawService } from "../services/implementations/withdrawService";
import { isAdmin } from "../middleware/isAdmin";
import { WalletRepository } from "../repositories/implementations/walletRepository";
import { TransactionRepository } from "../repositories/implementations/transactionRepository";

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
  isAdmin,
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
  isAdmin,
  withdrawController.approveWithdrawRequest
);
router.patch(
  "/cancel",
  tokenMiddleware,
  withdrawController.cancelWithdrawRequest
);

export default router;

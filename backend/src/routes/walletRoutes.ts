import { Router } from "express";
import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { WalletController } from "../controllers/walletController";
import { WalletRepository } from "../repositories/implementations/walletRepository";
import { WalletServices } from "../services/implementations/walletServices";

const router = Router();

const walletRepository = new WalletRepository();
const walletServices = new WalletServices(walletRepository);
const walletController = new WalletController(walletServices);

router.get("/wallet", tokenMiddleware, walletController.getWallet);

export default router;

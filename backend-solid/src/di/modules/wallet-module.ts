
import { Container } from "inversify";
import { TYPES } from "../types";
import { IWalletRepository } from "@/repositories";
import { WalletRepository } from "@/repositories/implementations/wallet-repository";
import { IWalletService, WalletService } from "@/services";
import { IWalletController } from "@/controllers";
import { WalletController } from "@/controllers/common/wallet-controller";

export const bindWalletModule = (container: Container) => { 
    container.bind<IWalletRepository>(TYPES.WalletRepository).to(WalletRepository)
    container.bind<IWalletService>(TYPES.WalletService).to(WalletService)
    container.bind<IWalletController>(TYPES.WalletController).to(WalletController)
}
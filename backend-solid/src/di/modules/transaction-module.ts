
import { Container } from "inversify";
import { TYPES } from "../types";
import { ITransactionRepository, TransactionRepository } from "@/repositories";
import { AdminTransactionService, IAdminTransactionService, ITransactionService, TransactionService } from "@/services";
import { AdminTransactionController, IAdminTransactionController, ITransactionController, TransactionController } from "@/controllers";

export const bindTransactionModule = (container: Container) => { 
    container.bind<ITransactionController>(TYPES.TransactionController).to(TransactionController)
    container.bind<ITransactionService>(TYPES.TransactionService).to(TransactionService)
     container.bind<IAdminTransactionController>(TYPES.AdminTransactionController).to(AdminTransactionController)
    container.bind<IAdminTransactionService>(TYPES.AdminTransactionService).to(AdminTransactionService)
    container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository)
}
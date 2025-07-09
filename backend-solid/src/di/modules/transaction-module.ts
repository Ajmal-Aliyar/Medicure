
import { Container } from "inversify";
import { TYPES } from "../types";
import { ITransactionRepository, TransactionRepository } from "@/repositories";
import { ITransactionService, TransactionService } from "@/services";
import { ITransactionController, TransactionController } from "@/controllers";

export const bindTransactionModule = (container: Container) => { 
    container.bind<ITransactionController>(TYPES.TransactionController).to(TransactionController)
    container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository)
    container.bind<ITransactionService>(TYPES.TransactionService).to(TransactionService)
}
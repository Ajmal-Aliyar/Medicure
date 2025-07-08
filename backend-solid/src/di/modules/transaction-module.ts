
import { Container } from "inversify";
import { TYPES } from "../types";
import { ITransactionRepository, TransactionRepository } from "@/repositories";
import { ITransactionService, TransactionService } from "@/services";

export const bindTransactionModule = (container: Container) => { 

    container.bind<ITransactionRepository>(TYPES.TransactionRepository).to(TransactionRepository)
    container.bind<ITransactionService>(TYPES.TransactionService).to(TransactionService)
}
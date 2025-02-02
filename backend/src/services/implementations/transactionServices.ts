import { ITransactionDocument, ITransactionRepository } from "../../repositories/interfaces/ITransactionRepository";
import { ICreateTransaction, ITransactionServices } from "../interfaces/ITransactionServices";





export class TransactionServices implements ITransactionServices {
    private transactionRepository: ITransactionRepository;

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository
    }

    async createTransaction({ senderId, recieverId, amount, status }: ICreateTransaction): Promise<ITransactionDocument> {
        try {
            if (!senderId || !recieverId || amount <= 0 || !status) {
                throw new Error("Invalid transaction details");
            }
            const response = await this.transactionRepository.createTransaction(senderId, recieverId, amount, status);
            if (!response) {
                throw new Error("Transaction creation failed in the repository");
            }
            return response
        } catch (error) {
            console.error("Error creating transaction:", error);
            throw error(error);
        }
    }
    
}
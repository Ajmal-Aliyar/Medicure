import { NextFunction, Request, Response } from "express";
import { ITransactionServices } from "../services/interfaces/ITransactionServices";



export class TransactionController {
    private transactionServices: ITransactionServices;

    constructor(transactionServices: ITransactionServices) {
        this.transactionServices = transactionServices

        this.createTransaction = this.createTransaction.bind(this)
    }

    async createTransaction(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { senderId, recieverId, amount, status } = req.body;
    

            if (!senderId || !recieverId || typeof amount !== "number" || amount <= 0 || !status) {
                res.status(400).json({ message: "Invalid transaction details provided" });
            }

            await this.transactionServices.createTransaction({ senderId, recieverId, amount, status });
    
            res.status(201).json({ message: "Transaction completed successfully" });
        } catch (error: any) {
            console.error("Error in createTransaction controller:", error);
            next(error);
        }
    }
    

}
import { NextFunction, Request, Response } from "express";
import { ITransactionServices } from "../services/interfaces/ITransactionServices";



export class TransactionController {
    private transactionServices: ITransactionServices;

    constructor(transactionServices: ITransactionServices) {
        this.transactionServices = transactionServices

        this.getTransactionById = this.getTransactionById.bind(this)
    }

    async getTransactionById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id, role } = req.client 
    
            if (!_id) {
                throw new Error("Invalid client data")
            }
    
            const transactions = await this.transactionServices.getTransactionsByUserId(_id,role);
    
            if (!transactions) {
                throw new Error( "Transactions not found")
            }

            res.status(200).json({ transactions });
        } catch (error) {
            console.error(error)
            next(error);
        }
    }
    

}
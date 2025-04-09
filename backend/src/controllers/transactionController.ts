import { NextFunction, Request, Response } from "express";
import { ITransactionServices } from "../services/interfaces/ITransactionServices";

export class TransactionController {
  private transactionServices: ITransactionServices;

  constructor(transactionServices: ITransactionServices) {
    this.transactionServices = transactionServices;

    this.getTransactionById = this.getTransactionById.bind(this);
    this.getTransactionDetails = this.getTransactionDetails.bind(this);
  }

  async getTransactionById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id, role } = req.client;
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;

      if (!_id) {
        throw new Error("Invalid client data");
      }

      const response = await this.transactionServices.getTransactionsByUserId(
        _id,
        role,
        skip,
        limit
      );

      if (!response) {
        throw new Error("Transactions not found");
      }

      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async getTransactionDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.transactionServices.getTransactionDetails();

      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

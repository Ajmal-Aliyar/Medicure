import { NextFunction, Request, Response } from "express";
import { IWithdrawService } from "../services/interfaces/IWithdrawService";

export class WithdrawController {
  private withdrawService: IWithdrawService;

  constructor(withdrawService: IWithdrawService) {
    this.withdrawService = withdrawService;

    this.createWithdrawRequest = this.createWithdrawRequest.bind(this);
    this.getWithdrawRequests = this.getWithdrawRequests.bind(this);
    this.approveWithdrawRequest = this.approveWithdrawRequest.bind(this);
    this.getWithdrawRequestsByUser = this.getWithdrawRequestsByUser.bind(this);
    this.cancelWithdrawRequest = this.cancelWithdrawRequest.bind(this);
  }

  async createWithdrawRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { role } = req.client;
      req.body.role = role;
      const response = await this.withdrawService.createWithdrawRequest(
        req.body
      );
      res.status(201).json({ message: "Bank details submitted successfully" });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getWithdrawRequests(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const status = (req.query.status as string) || "";
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;

      const response = await this.withdrawService.getWithdrawRequests(
        status,
        skip,
        limit
      );
      res.status(200).json(response);
    } catch (error: unknown) {
      next(error);
    }
  }

  async getWithdrawRequestsByUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.client;

      const status = (req.query.status as string) || "";
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;

      const response = await this.withdrawService.getWithdrawRequestsByUser(
        _id,
        status,
        skip,
        limit
      );
      res.status(200).json(response);
    } catch (error: unknown) {
      next(error);
    }
  }

  async approveWithdrawRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.query.id as string;

      const message = await this.withdrawService.approveWithdrawRequest(id);
      res.status(200).json({ message });
    } catch (error: unknown) {
      next(error);
    }
  }

  async cancelWithdrawRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.query.id as string;

      const message = await this.withdrawService.cancelWithdrawRequest(id);
      res.status(200).json({ message });
    } catch (error: unknown) {
      next(error);
    }
  }
}

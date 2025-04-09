import { NextFunction, Request, Response } from "express";
import { IPaymentServices } from "../services/interfaces/IPaymentServices";

export class PaymentController {
  private paymentService: IPaymentServices;

  constructor(paymentService: IPaymentServices) {
    this.paymentService = paymentService;

    this.checkoutSession = this.checkoutSession.bind(this);
    this.webhookHandler = this.webhookHandler.bind(this);
    this.refundPayment = this.refundPayment.bind(this);
    this.approveWithdrawRequest = this.approveWithdrawRequest.bind(this);
    this.addUserBankAccount = this.addUserBankAccount.bind(this);
  }

  async checkoutSession(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        doctorName,
        specialization,
        startTime,
        endTime,
        duration,
        fees,
        patientId,
        doctorId,
        appointmentDate,
        slotId,
      } = req.body;

      const session = await this.paymentService.checkoutSession({
        doctorName,
        specialization,
        startTime,
        endTime,
        duration,
        fees,
        doctorId,
        patientId,
        slotId,
        appointmentDate,
      });
      res.status(200).json({ sessionUrl: session.url });
    } catch (error: unknown) {
      next(error);
    }
  }

  async webhookHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const sig = req.headers["stripe-signature"] as string;
    try {
      await this.paymentService.webhookHandler(req.body, sig);
      res.json({ received: true });
    } catch (error: unknown) {
      next(error);
    }
  }

  async refundPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { transactionId } = req.body;
      const refund = await this.paymentService.processRefund(transactionId);
      res.status(200).json({ success: true, refund });
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
      const transactionId = (req.query.transactionId as string) || "";

      if (!transactionId) {
        res.status(400).json({ error: "Transaction ID is required." });
      }

      const response = await this.paymentService.approveWithdrawal(
        transactionId
      );

      res.status(200).json(response);
    } catch (error: unknown) {
      next(error);
    }
  }

  async addUserBankAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      const response =
        await this.paymentService.createConnectedAccountAndPayout(email);
      res.json(response);
    } catch (error: unknown) {
      next(error);
    }
  }
}

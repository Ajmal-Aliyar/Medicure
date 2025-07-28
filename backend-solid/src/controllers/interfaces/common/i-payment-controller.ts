import { Request, Response } from "express";

export interface IPaymentController {
    checkoutSession (req: Request, res: Response): Promise<void>
    webhookHandler (req: Request, res: Response): Promise<void>
    cancelCheckout (req: Request, res: Response): Promise<void>
    getSessionDetails (req: Request, res: Response): Promise<void>
}
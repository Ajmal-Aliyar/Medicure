import { HTTP_STATUS } from "@/constants";
import { TYPES } from "@/di/types";
import { IPaymentService } from "@/services";
import { successResponse } from "@/utils";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IPaymentController } from "../interfaces";

@injectable()
export class PaymentController implements IPaymentController {
  constructor(
    @inject(TYPES.PaymentService)
    private readonly _paymentService: IPaymentService
  ) {}

  checkoutSession = async (req: Request, res: Response): Promise<void> => {
    const patientId = req.user?.id;
    const slotId = req.body?.slotId;
    const session = await this._paymentService.checkoutSession(
      patientId,
      slotId
    );
    successResponse(res, HTTP_STATUS.OK, "Checkout session successfully.", {
      sessionUrl: session.url,
    });
  };

  webhookHandler = async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string;
    await this._paymentService.webhookHandler(req.body, sig);
    successResponse(res, HTTP_STATUS.OK, "Webhook received successfully.", {
      received: true,
    });
  };

  cancelCheckout = async (req: Request, res: Response): Promise<void> => {
    const patientId = req.user?.id;
    const slotId = req.body?.slotId;
    await this._paymentService.cancelCheckout(slotId, patientId);
    successResponse(res, HTTP_STATUS.OK, "Cancel checkout successfully.");
  };

  getSessionDetails = async (req: Request, res: Response): Promise<void> => {
    const sessionId = String(req.query?.sessionId);
    const sessionDetails = await this._paymentService.getSessionDetails(
      sessionId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Session details fetched successfully.",
      sessionDetails
    );
  };
}

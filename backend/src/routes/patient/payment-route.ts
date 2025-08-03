import express, { Router } from "express";
import { Container } from "inversify";
import { getContainer } from "@/di";
import { IPaymentController } from "@/controllers";
import { TYPES } from "@/di/types";
import { asyncHandler } from "@/utils";

export const createPaymentRoute = (): Router => {
  const router = Router();
  const container: Container = getContainer();
  const paymentController = container.get<IPaymentController>(
    TYPES.PaymentController
  );

  router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
      asyncHandler(paymentController.webhookHandler)
  );
  router.post("/book-slot", asyncHandler(paymentController.checkoutSession));
  router.post("/cancel-checkout", asyncHandler(paymentController.cancelCheckout));
  router.get("/session-details", asyncHandler(paymentController.getSessionDetails));

  return router;
};

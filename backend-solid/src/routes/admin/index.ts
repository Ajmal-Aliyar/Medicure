import { Router } from "express";
import { createAdminDoctorRouter } from "./doctor-route";
import { createAppointmentRouter } from "./appointment-route";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { createAdminSlotRouter } from "./slot-route";
import { createTransactionRoute } from "./transaction-route";
import { createConnectionRequestRoute } from "./connection-request";
import { createConversationRoute } from "./conversation";
import { createMessageRouter } from "./message";
import { createWalletRouter } from "./wallet";

export const createAdminRouter = () => {
  const router = Router();
  router.use(authenticateAccessToken, authorizeRoles("admin"));

  router.use("/doctor", createAdminDoctorRouter());
  router.use("/appointment", createAppointmentRouter());
  router.use("/slot", createAdminSlotRouter());
  router.use("/transaction", createTransactionRoute());
  router.use("/connection/request", createConnectionRequestRoute());
  router.use("/conversation", createConversationRoute());
  router.use("/conversation", createMessageRouter());
  router.use("/wallet", createWalletRouter());
  return router;
};

import { Router } from "express";
import { createProfileRoute } from "./patient-route";
import { createSlotRoute } from "./slot-route";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { createPaymentRoute } from "./payment-route";
import { createAppointmentRoute } from "./appointment";
import { createTransactionRoute } from "./transaction";
import { createFeedbackRoute } from "./feedback";
import { createPrescriptionRouter } from "./prescription";
;


export const createPatientRouter = () => {
    const router = Router();
    router.use(authenticateAccessToken, authorizeRoles("patient"));

    router.use("/profile", createProfileRoute());
    router.use("/slot", createSlotRoute())
    router.use("/payment", createPaymentRoute())
    router.use("/appointment", createAppointmentRoute())
    router.use("/transaction", createTransactionRoute())
    router.use("/feedback", createFeedbackRoute())
    router.use("/prescription", createPrescriptionRouter())

    return router
}


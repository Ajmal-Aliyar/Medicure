import { Router } from "express";
import { createProfileRouter } from "./doctor-route";
import { createDoctorScheduleRouter } from "./schedule-route";
import { createDoctorSlotRouter } from "./slot-route";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { createTransactionRoute } from "./transaction-route";
import { createAppointmentRouter } from "./appointment-route";
import { createFeedbackRouter } from "./feedback-route";
import { createPrescriptionRouter } from "./prescription-route";
import { createMedicalRecordRouter } from "./medical-record";
import { createConnectionRequestRoute } from "./connection-request";
import { createConversationRoute } from "./conversation";


export const createDoctorRouter = () => {
    const router = Router();
    router.use(authenticateAccessToken, authorizeRoles('doctor'))
    router.use("/profile", createProfileRouter());
    router.use("/schedule", createDoctorScheduleRouter());
    router.use("/slot", createDoctorSlotRouter());
    router.use("/appointment", createAppointmentRouter());
    router.use("/transaction", createTransactionRoute());
    router.use("/feedback", createFeedbackRouter());
    router.use("/prescription", createPrescriptionRouter());
    router.use("/medical-record", createMedicalRecordRouter());
    router.use('/connection/request', createConnectionRequestRoute());    
    router.use("/conversation", createConversationRoute());
    
    return router
}


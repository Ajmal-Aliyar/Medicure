import { Router } from "express";
import { createProfileRouter } from "./doctor-route";
import { createDoctorScheduleRouter } from "./schedule-route";
import { createDoctorSlotRouter } from "./slot-route";
import { createAppointmentRoute } from "../patient/appointment";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { createTransactionRoute } from "./transaction-route";


export const createDoctorRouter = () => {
    const router = Router();
    router.use(authenticateAccessToken, authorizeRoles('doctor'))
    router.use("/profile", createProfileRouter());
    router.use("/schedule", createDoctorScheduleRouter());
    router.use("/slot", createDoctorSlotRouter());
    router.use("/appointment", createAppointmentRoute());
    router.use("/transaction", createTransactionRoute());
    return router
}


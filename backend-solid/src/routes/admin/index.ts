import { Router } from "express";
import { createAdminDoctorRouter } from "./doctor-route";
import { createAppointmentRouter } from "./appointment-route";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { createAdminSlotRouter } from "./slot-route";



export const createAdminRouter = () => {
    const router = Router();
      router.use(authenticateAccessToken, authorizeRoles("admin"));
    
    router.use("/doctor", createAdminDoctorRouter());
    router.use("/appointment", createAppointmentRouter());
    router.use("/slot", createAdminSlotRouter());
    return router
}


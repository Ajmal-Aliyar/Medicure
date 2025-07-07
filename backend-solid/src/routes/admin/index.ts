import { Router } from "express";
import { createAdminDoctorRouter } from "./doctor-route";
import { createAppointmentRouter } from "./appointment-route";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";



export const createAdminRouter = () => {
    const router = Router();
      router.use(authenticateAccessToken, authorizeRoles("admin"));
    
    router.use("/doctor", createAdminDoctorRouter());
    router.use("/appointment", createAppointmentRouter());
    return router
}


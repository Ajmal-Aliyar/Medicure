import { Router } from "express";
import { createProfileRouter } from "./doctor-route";
import { createDoctorScheduleRouter } from "./schedule-route";


export const createDoctorRouter = () => {
    const router = Router();
    router.use("/profile", createProfileRouter());
    router.use("/schedule", createDoctorScheduleRouter());
    return router
}


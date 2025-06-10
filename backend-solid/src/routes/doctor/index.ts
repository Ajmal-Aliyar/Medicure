import { Router } from "express";
import { createProfileRouter } from "./doctor-route";
import { createDoctorScheduleRouter } from "./schedule-route";
import { createDoctorSlotRouter } from "./slot-route";


export const createDoctorRouter = () => {
    const router = Router();
    router.use("/profile", createProfileRouter());
    router.use("/schedule", createDoctorScheduleRouter());
    router.use("/slot", createDoctorSlotRouter());
    return router
}


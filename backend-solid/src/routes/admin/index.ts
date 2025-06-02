import { Router } from "express";
import { createDoctorRouter } from "./doctor-route";


export const createAdminRouter = () => {
    const router = Router();
    router.use("/doctor", createDoctorRouter());
    return router
}


import { Router } from "express";
import { createAdminDoctorRouter } from "./doctor-route";


export const createAdminRouter = () => {
    const router = Router();
    router.use("/doctors", createAdminDoctorRouter());
    return router
}


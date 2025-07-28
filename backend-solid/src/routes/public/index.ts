import { Router } from "express";
import { createAuthRouter } from './auth-route'
import { createSpecialiazationRoute } from "./specialization-route";
import { createDoctorRoute } from "./doctor-route";


export const createPublicRouter = () => {
    const router = Router();
    router.use("/auth", createAuthRouter());
    router.use("/specialization", createSpecialiazationRoute());
    router.use("/doctor", createDoctorRoute());
    return router
}



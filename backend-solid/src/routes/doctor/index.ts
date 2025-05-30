import { Router } from "express";
import { createProfileRouter } from "./profile-route";


export const createDoctorRouter = () => {
    const router = Router();
    router.use("/profile", createProfileRouter());
    return router
}


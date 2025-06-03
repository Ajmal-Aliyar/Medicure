import { Router } from "express";
import { createProfileRouter } from "./patient-route";
;


export const createPatientRouter = () => {
    const router = Router();
    router.use("/profile", createProfileRouter());
    return router
}


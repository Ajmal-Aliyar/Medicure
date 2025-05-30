import { Router } from "express";
import { createAuthRouter } from './auth-route'


export const createPublicRouter = () => {
    const router = Router();
    router.use("/auth", createAuthRouter());
    return router
}



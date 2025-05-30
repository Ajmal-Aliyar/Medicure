import { Express } from "express";
import { createPublicRouter } from '@/routes/public'
import { createDoctorRouter } from "@/routes/doctor";

export const registerRoutes = (app: Express) => {
  
  app.use("/api", createPublicRouter());
  app.use("/api/doctor", createDoctorRouter());
};

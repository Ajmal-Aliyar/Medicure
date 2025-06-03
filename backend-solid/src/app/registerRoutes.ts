import { createAdminRouter, createDoctorRouter, createPatientRouter, createPublicRouter } from "@/routes";
import { Express } from "express";


export const registerRoutes = (app: Express) => {
  app.use("/api", createPublicRouter());
  app.use("/api/doctor", createDoctorRouter());
  app.use("/api/admin", createAdminRouter());
  app.use("/api/patient", createPatientRouter());
};

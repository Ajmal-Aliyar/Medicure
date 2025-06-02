import { getContainer } from "@/di";
import { authenticateAccessToken, authorizeRoles } from "@/middlewares";
import { Router } from "express";
import { Container } from "inversify";


export const createDoctorRouter = (): Router => {
  const router = Router();
  const container: Container = getContainer();

//   const AdminController = container.get<>()

  router.use(authenticateAccessToken, authorizeRoles('admin'));


  return router;
};


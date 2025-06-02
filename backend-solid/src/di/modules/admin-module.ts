import { Container } from "inversify";
import { TYPES } from "../types";
import { AdminRepository, IAdminRepository } from "@/repositories";
import { AdminService, IAdminService } from "@/services";
import { AdminController, IAdminController } from "@/controllers";


export const bindAdminModule = async (container: Container) => {
  container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository);
  container.bind<IAdminService>(TYPES.AdminService).to(AdminService);
  container.bind<IAdminController>(TYPES.AdminController).to(AdminController);
};

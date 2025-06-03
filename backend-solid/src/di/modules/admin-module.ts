import { Container } from "inversify";
import { TYPES } from "../types";
import { AdminRepository, IAdminRepository } from "@/repositories";
import { AdminDoctorService, IAdminDoctorService } from "@/services";
import { AdminDoctorController, IAdminDoctorController } from "@/controllers";


export const bindAdminModule = async (container: Container) => {
  container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository);
  container.bind<IAdminDoctorService>(TYPES.AdminDoctorService).to(AdminDoctorService);
  container.bind<IAdminDoctorController>(TYPES.AdminDoctorController).to(AdminDoctorController);
};

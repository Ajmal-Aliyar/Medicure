import { Container } from "inversify";
import { TYPES } from "../types";
import { AdminRepository, IAdminRepository } from "@/repositories";
import {
  AdminDoctorService,
  AdminPatientService,
  IAdminDoctorService,
  IAdminPatientService,
} from "@/services";
import {
  AdminDoctorController,
  AdminPatientController,
  IAdminDoctorController,
  IAdminPatientController,
} from "@/controllers";

export const bindAdminModule = async (container: Container) => {
  container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository);
  container
    .bind<IAdminDoctorService>(TYPES.AdminDoctorService)
    .to(AdminDoctorService);
  container
    .bind<IAdminDoctorController>(TYPES.AdminDoctorController)
    .to(AdminDoctorController);
  container
    .bind<IAdminPatientService>(TYPES.AdminPatientService)
    .to(AdminPatientService);
  container
    .bind<IAdminPatientController>(TYPES.AdminPatientController)
    .to(AdminPatientController);
};

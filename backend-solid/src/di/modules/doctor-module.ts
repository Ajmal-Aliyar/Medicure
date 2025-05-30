import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { DoctorRepository, IDoctorRepository } from "@/repositories";
import { DoctorService, IDoctorService } from "@/services";
import { DoctorController, IDoctorController } from "@/controllers";

export const bindDoctorModule = async (container: Container) => {
  container
    .bind<IDoctorRepository>(TYPES.DoctorRepository)
    .to(DoctorRepository);
  container
    .bind<IDoctorService>(TYPES.DoctorService)
    .to(DoctorService);
  container
    .bind<IDoctorController>(TYPES.DoctorController)
    .to(DoctorController);
};

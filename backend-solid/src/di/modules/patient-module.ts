import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { IPatientRepository, PatientRepository } from "@/repositories";
import { IPatientController, PatientController } from "@/controllers";
import { IPatientService, PatientService } from "@/services";

export const bindPatientModule = async (container: Container) => {
  container
    .bind<IPatientRepository>(TYPES.PatientRepository)
    .to(PatientRepository);
  container.bind<IPatientService>(TYPES.PatientService).to(PatientService);
  container
    .bind<IPatientController>(TYPES.PatientController)
    .to(PatientController);
};

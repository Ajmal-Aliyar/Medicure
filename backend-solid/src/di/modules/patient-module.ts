import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { IPatientRepository, PatientRepository } from "@/repositories";

export const bindPatientModule = async (container: Container) => {
  container
    .bind<IPatientRepository>(TYPES.PatientRepository)
    .to(PatientRepository);
};

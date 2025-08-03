import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { ISpecializationRepository, SpecializationRepository } from "@/repositories";
import { IPatientSpecializationService, PatientSpecializationService } from "@/services";
import { IPatientSpecializationController, PatientSpecializationController } from "@/controllers";

export const bindSpecializationModule = async (container: Container) => {
  container.bind<ISpecializationRepository>(TYPES.SpecializationRepository).to(SpecializationRepository);
  container.bind<IPatientSpecializationService>(TYPES.PatientSpecializationService).to(PatientSpecializationService);
  container.bind<IPatientSpecializationController>(TYPES.PatientSpecializationController).to(PatientSpecializationController);
};

import { Container } from "inversify";
import { TYPES } from "@/di/types";
import { ISpecializationRepository, SpecializationRepository } from "@/repositories";
import { ISpecializationService, SpecializationService } from "@/services";
import { ISpecializationController, SpecializationController } from "@/controllers";

export const bindSpecializationModule = async (container: Container) => {
  container.bind<ISpecializationRepository>(TYPES.SpecializationRepository).to(SpecializationRepository);
  container.bind<ISpecializationService>(TYPES.SpecializationService).to(SpecializationService);
  container.bind<ISpecializationController>(TYPES.SpecializationController).to(SpecializationController);
};

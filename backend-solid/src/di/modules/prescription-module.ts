import { Container } from "inversify";
import { TYPES } from "../types";
import {
  IPrescriptionRepository,
  PrescriptionRepository,
} from "@/repositories";
import {
  DoctorPrescriptionService,
  IDoctorPrescriptionService,
  IPrescriptionService,
  PrescriptionService,
} from "@/services";
import { DoctorPrescriptionController, IDoctorPrescriptionController, IPrescriptionController, PrescriptionController } from "@/controllers";

export const bindPrescriptionModule = async (container: Container) => {
  container
    .bind<IPrescriptionRepository>(TYPES.PrescriptionRepository)
    .to(PrescriptionRepository);

  container
    .bind<IDoctorPrescriptionService>(TYPES.DoctorPrescriptionService)
    .to(DoctorPrescriptionService);

    container
    .bind<IPrescriptionService>(TYPES.PrescriptionService)
    .to(PrescriptionService);

    container
    .bind<IDoctorPrescriptionController>(TYPES.DoctorPrescriptionController)
    .to(DoctorPrescriptionController);

    container
    .bind<IPrescriptionController>(TYPES.PrescriptionController)
    .to(PrescriptionController);
};

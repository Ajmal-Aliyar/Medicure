import { Container } from "inversify";
import { TYPES } from "@/di/types";
import {
  DoctorRepository,
  IDoctorRepository,
} from "@/repositories";
import {
  DoctorService,
  IDoctorService,
  IPatientDoctorService,
  PatientDoctorService,
} from "@/services";
import {
  DoctorController,
  IDoctorController,
  IPatientDoctorController,
  PatientDoctorController,
} from "@/controllers";

export const bindDoctorModule = async (container: Container) => {
  container
    .bind<IDoctorRepository>(TYPES.DoctorRepository)
    .to(DoctorRepository);
  container.bind<IDoctorService>(TYPES.DoctorService).to(DoctorService);
  container
    .bind<IDoctorController>(TYPES.DoctorController)
    .to(DoctorController);

  container
    .bind<IPatientDoctorService>(TYPES.PatientDoctorService)
    .to(PatientDoctorService);
  container
    .bind<IPatientDoctorController>(TYPES.PatientDoctorController)
    .to(PatientDoctorController);
};

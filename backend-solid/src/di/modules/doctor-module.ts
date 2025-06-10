import { Container } from "inversify";
import { TYPES } from "@/di/types";
import {
  DoctorRepository,
  IDoctorRepository,
  IScheduleRepository,
} from "@/repositories";
import {
  DoctorScheduleService,
  DoctorService,
  DoctorSlotService,
  IDoctorScheduleService,
  IDoctorService,
  IDoctorSlotService,
} from "@/services";
import {
  DoctorController,
  DoctorScheduleController,
  DoctorSlotController,
  IDoctorController,
  IDoctorScheduleController,
  IDoctorSlotController,
} from "@/controllers";
import { ScheduleRepository } from "@/repositories";

export const bindDoctorModule = async (container: Container) => {
  container
    .bind<IDoctorRepository>(TYPES.DoctorRepository)
    .to(DoctorRepository);
  container.bind<IDoctorService>(TYPES.DoctorService).to(DoctorService);
  container
    .bind<IDoctorController>(TYPES.DoctorController)
    .to(DoctorController);

  container
    .bind<IScheduleRepository>(TYPES.ScheduleRepository)
    .to(ScheduleRepository);
  container
    .bind<IDoctorScheduleService>(TYPES.DoctorScheduleService)
    .to(DoctorScheduleService);
  container
    .bind<IDoctorScheduleController>(TYPES.DoctorScheduleController)
    .to(DoctorScheduleController);


    container.bind<IDoctorSlotController>(TYPES.DoctorSlotController).to(DoctorSlotController)
    container.bind<IDoctorSlotService>(TYPES.DoctorSlotService).to(DoctorSlotService)
  
};

import { IScheduleRepository, ScheduleRepository } from "@/repositories";
import { Container } from "inversify";
import { TYPES } from "../types";
import { DoctorScheduleService, IDoctorScheduleService, IScheduleService, ScheduleService } from "@/services";
import { DoctorScheduleController, IDoctorScheduleController } from "@/controllers";

export const bindScheduleModule = async (container: Container) => { 
  container
    .bind<IScheduleRepository>(TYPES.ScheduleRepository)
    .to(ScheduleRepository);
  container
    .bind<IDoctorScheduleService>(TYPES.DoctorScheduleService)
    .to(DoctorScheduleService);
  container
    .bind<IDoctorScheduleController>(TYPES.DoctorScheduleController)
    .to(DoctorScheduleController);
  
  container.bind<IScheduleService>(TYPES.ScheduleService).to(ScheduleService)

}
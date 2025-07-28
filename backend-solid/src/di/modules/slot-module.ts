import { DoctorSlotController, IDoctorSlotController, IPatientSlotController, ISlotController, PatientSlotController, SlotController } from "@/controllers";
import { DoctorSlotService, IDoctorSlotService, IPatientSlotService, ISlotService, PatientSlotService, SlotService } from "@/services";
import { Container } from "inversify";
import { TYPES } from "../types";
import { ISlotRepository, SlotRepository } from "@/repositories";

export const bindSlotModule = async (container: Container) => { 
    container.bind<IDoctorSlotController>(TYPES.DoctorSlotController).to(DoctorSlotController)
    container.bind<IDoctorSlotService>(TYPES.DoctorSlotService).to(DoctorSlotService)
    
    container.bind<IPatientSlotController>(TYPES.PatientSlotController).to(PatientSlotController)
    container.bind<IPatientSlotService>(TYPES.PatientSlotService).to(PatientSlotService)

    container.bind<ISlotController>(TYPES.SlotController).to(SlotController)
    container.bind<ISlotService>(TYPES.SlotService).to(SlotService)
    container.bind<ISlotRepository>(TYPES.SlotRepository).to(SlotRepository)
}
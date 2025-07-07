import { DoctorSlotController, IDoctorSlotController, IPatientSlotController, PatientSlotController } from "@/controllers";
import { DoctorSlotService, IDoctorSlotService, IPatientSlotService, PatientSlotService } from "@/services";
import { Container } from "inversify";
import { TYPES } from "../types";

export const bindSlotModule = async (container: Container) => { 
    container.bind<IDoctorSlotController>(TYPES.DoctorSlotController).to(DoctorSlotController)
    container.bind<IDoctorSlotService>(TYPES.DoctorSlotService).to(DoctorSlotService)
    
    container.bind<IPatientSlotController>(TYPES.PatientSlotController).to(PatientSlotController)
    container.bind<IPatientSlotService>(TYPES.PatientSlotService).to(PatientSlotService)
}
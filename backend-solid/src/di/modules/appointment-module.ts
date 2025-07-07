import { Container } from "inversify";
import { TYPES } from "../types";
import { AppointmentRepository, IAppointmentRepository } from "@/repositories";
import { IAppointmentService, IPatientAppointmentService, PatientAppointmentService } from "@/services";
import { IPatientAppointmentController } from "@/controllers";
import { PatientAppointmentController } from "@/controllers/patient/appointment-controller";
import { AppointmentService } from "@/services/common/appointment-service";

export const bindAppointmentModule = async (container: Container) => { 
    container.bind<IAppointmentRepository>(TYPES.AppointmentRepository).to(AppointmentRepository)
    container.bind<IPatientAppointmentController>(TYPES.PatientAppointmentController).to(PatientAppointmentController)
    container.bind<IPatientAppointmentService>(TYPES.PatientAppointmentService).to(PatientAppointmentService)

    container.bind<IAppointmentService>(TYPES.AppointmentService).to(AppointmentService)
}
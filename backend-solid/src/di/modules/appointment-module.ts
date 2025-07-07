import { Container } from "inversify";
import { TYPES } from "../types";
import { AppointmentRepository, IAppointmentRepository } from "@/repositories";
import { AppointmentService, IAppointmentService, IPatientAppointmentService, PatientAppointmentService } from "@/services";
import { AdminAppointmentController, DoctorAppointmentController, IAdminAppointmentController, IDoctorAppointmentController, IPatientAppointmentController, PatientAppointmentController } from "@/controllers";

export const bindAppointmentModule = async (container: Container) => { 
    container.bind<IAppointmentRepository>(TYPES.AppointmentRepository).to(AppointmentRepository)
    container.bind<IPatientAppointmentController>(TYPES.PatientAppointmentController).to(PatientAppointmentController)
    container.bind<IPatientAppointmentService>(TYPES.PatientAppointmentService).to(PatientAppointmentService)
    
    container.bind<IDoctorAppointmentController>(TYPES.DoctorAppointmentController).to(DoctorAppointmentController)
    
    container.bind<IAdminAppointmentController>(TYPES.AdminAppointmentController).to(AdminAppointmentController)

    container.bind<IAppointmentService>(TYPES.AppointmentService).to(AppointmentService)
}
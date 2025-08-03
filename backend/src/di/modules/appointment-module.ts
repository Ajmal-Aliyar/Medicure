import { Container } from "inversify";
import { TYPES } from "../types";
import { AppointmentRepository, IAppointmentRepository } from "@/repositories";
import { AppointmentService, IAppointmentService, IDoctorAppointmentService, IPatientAppointmentService, PatientAppointmentService } from "@/services";
import { AdminAppointmentController, AppointmentController, DoctorAppointmentController, IAdminAppointmentController, IAppointmentController, IDoctorAppointmentController, IPatientAppointmentController, PatientAppointmentController } from "@/controllers";
import { DoctorAppointmentService } from "@/services/doctor/appointment-service";


export const bindAppointmentModule = async (container: Container) => { 
    container.bind<IAppointmentRepository>(TYPES.AppointmentRepository).to(AppointmentRepository)
    container.bind<IPatientAppointmentController>(TYPES.PatientAppointmentController).to(PatientAppointmentController)
    container.bind<IPatientAppointmentService>(TYPES.PatientAppointmentService).to(PatientAppointmentService)
    
    container.bind<IDoctorAppointmentController>(TYPES.DoctorAppointmentController).to(DoctorAppointmentController)
    container.bind<IDoctorAppointmentService>(TYPES.DoctorAppointmentService).to(DoctorAppointmentService)
    
    container.bind<IAdminAppointmentController>(TYPES.AdminAppointmentController).to(AdminAppointmentController)

    container.bind<IAppointmentController>(TYPES.AppointmentController).to(AppointmentController)

    container.bind<IAppointmentService>(TYPES.AppointmentService).to(AppointmentService)
}
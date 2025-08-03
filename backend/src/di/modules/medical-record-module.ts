import { Container } from "inversify";
import { TYPES } from "../types";
import { IMedicalRecordRepository, MedicalRecordRepository } from "@/repositories";
import { DoctorMedicalRecordService, IDoctorMedicalRecordService, IPatientMedicalRecordService, PatientMedicalRecordService } from "@/services";
import { DoctorMedicalRecordController, IDoctorMedicalRecordController, IPatientMedicalRecordController, PatientMedicalRecordController } from "@/controllers";


export const bindMedicalRecordModule = async (container: Container) => { 
  container
    .bind<IMedicalRecordRepository>(TYPES.MedicalRecordRepository)
    .to(MedicalRecordRepository);

    container
    .bind<IDoctorMedicalRecordService>(TYPES.DoctorMedicalRecordService)
    .to(DoctorMedicalRecordService);

    container
    .bind<IPatientMedicalRecordService>(TYPES.PatientMedicalRecordService)
    .to(PatientMedicalRecordService);

    container
    .bind<IPatientMedicalRecordController>(TYPES.PatientMedicalRecordController)
    .to(PatientMedicalRecordController);

     container
    .bind<IDoctorMedicalRecordController>(TYPES.DoctorMedicalRecordController)
    .to(DoctorMedicalRecordController);
  
}
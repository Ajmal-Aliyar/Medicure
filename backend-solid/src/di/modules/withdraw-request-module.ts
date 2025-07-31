
import { Container } from "inversify";
import { TYPES } from "../types";
import { IWithdrawRequestRepository, WithdrawRequestRepository } from "@/repositories";
import { AdminWithdrawRequestService, DoctorWithdrawRequestService, IAdminWithdrawRequestService, IDoctorWithdrawRequestService, IWithdrawRequestService, WithdrawRequestService } from "@/services";
import { AdminWithdrawRequestController, DoctorWithdrawRequestController, IAdminWithdrawRequestController, IDoctorWithdrawRequestController, IWithdrawRequestController, WithdrawRequestController } from "@/controllers";


export const bindWithdrawRequestModule = (container: Container) => { 
    container.bind<IWithdrawRequestRepository>(TYPES.WithdrawRequestRepository).to(WithdrawRequestRepository)
    container.bind<IWithdrawRequestService>(TYPES.WithdrawRequestService).to(WithdrawRequestService)
    container.bind<IDoctorWithdrawRequestService>(TYPES.DoctorWithdrawRequestService).to(DoctorWithdrawRequestService)
    container.bind<IAdminWithdrawRequestService>(TYPES.AdminWithdrawRequestService).to(AdminWithdrawRequestService)
    container.bind<IWithdrawRequestController>(TYPES.WithdrawRequestController).to(WithdrawRequestController)
    container.bind<IDoctorWithdrawRequestController>(TYPES.DoctorWithdrawRequestController).to(DoctorWithdrawRequestController)
    container.bind<IAdminWithdrawRequestController>(TYPES.AdminWithdrawRequestController).to(AdminWithdrawRequestController)
}
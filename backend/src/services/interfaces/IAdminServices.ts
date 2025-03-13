import { IDoctor } from "../../models/doctor/doctorInterface";
import { IPatientDocument } from "../../repositories/interfaces/IPatientRepository";
import { ISlot } from "../../types/ISlotInterface";
import { authorizedUserResponse } from "../implementations/authServices";

export interface IAdminServices {
    signIn(email: string, password: string, role: string): Promise<authorizedUserResponse> 
    getDoctorDetails(_id: string): Promise<IDoctor>
    getApprovedDoctors(skip: number, limit: number, searchQuery: string): Promise<{ data: IDoctor[], hasMore: boolean}> 
    getDoctorApprovalRequests(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean}> 
    getDoctorAppointmentDetails(_id: string): Promise<ISlot[]> 
    approveDoctor (_id: string): Promise<void> 
    rejectDoctor(_id: string): Promise<void>
    getAllPatients(skip: number, limit: number): Promise<{ data: IPatientDocument   [], hasMore: boolean }>
    block (_id: string, role: string): Promise<void>
    unblock (_id: string, role: string): Promise<void>
}
import { IDoctor } from "../../models/doctor/doctorInterface";
import { ISlot } from "../../types/ISlotInterface";
import { authorizedUserResponse } from "../implementations/authServices";

export interface IAdminServices {
    signIn(email: string, password: string, role: string): Promise<authorizedUserResponse> 
    getDoctorDetails(_id: string): Promise<IDoctor>
    getApprovedDoctors(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean}> 
    getDoctorApprovalRequests(skip: number, limit: number): Promise<{ data: IDoctor[], hasMore: boolean}> 
    getDoctorAppointmentDetails(_id: string): Promise<ISlot[]> 
    approveDoctor (_id: string): Promise<void> 
    rejectDoctor(_id: string): Promise<void>
}
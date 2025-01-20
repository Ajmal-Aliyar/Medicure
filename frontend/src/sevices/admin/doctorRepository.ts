
import { IDoctorType } from "../../types/doctor/doctorType";
import { IFetchAllApprovedDoctors, ISlotDetails } from "../../types/doctor/verifyDetailsType"
import { api } from "../../utils/axiosInstance"

export const fetchAllApprovedDoctorsApi = async (skip: number, limit: number): Promise<{data: IFetchAllApprovedDoctors[],hasMore:boolean}> => {
    const response = await api.get<{data: IFetchAllApprovedDoctors[],hasMore:boolean}>(`/api/admin/getApprovedDoctors?skip=${skip}&limit=${limit}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , hasMore: false}; 
    }
    return { data: response.data.data, hasMore: response.data.hasMore };
}

export const fetchAllRequestedDoctorsApi = async (skip: number, limit: number): Promise<{data: IFetchAllApprovedDoctors[],hasMore:boolean}> => {
    const response = await api.get<{data: IFetchAllApprovedDoctors[],hasMore:boolean}>(`/api/admin/getDoctorApprovalRequests?skip=${skip}&limit=${limit}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , hasMore: false}; 
    }
    return { data: response.data.data, hasMore: response.data.hasMore };
}

export const getDoctorDetailsApi = async (_id: string): Promise<{ data: IDoctorType }> => {
    const response = await api.get<{ data: IDoctorType }>(`/api/admin/getDoctorDetails/${_id}`);
    return response.data
}


export const getDoctorAppointmentDetailsApi = async (_id: string): Promise<{ data: ISlotDetails[] }> => {
    const response = await api.get<{ data: ISlotDetails[] }>(`/api/admin/getAppointmentdetails/${_id}`);
    return response.data
}

export const rejectDoctorApi = async (_id: string): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>(`/api/admin/reject-doctor/${_id}`);
    return response.data;
};


export const approveDoctorApi = async (_id: string): Promise<{ message: string }> => {
    const response = await api.get<{ message: string }>(`/api/admin/approve-doctor/${_id}`);
    return response.data
}
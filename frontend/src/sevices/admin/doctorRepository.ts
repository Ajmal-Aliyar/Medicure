
import { IDoctorType } from "../../types/doctor/doctorType";
import { IFetchAllApprovedDoctors, ISlotDetails } from "../../types/doctor/verifyDetailsType"
import { api } from "../../utils/axiosInstance"

export const fetchAllApprovedDoctorsApi = async (skip: number, limit: number, searchQuery: string): Promise<{data: IFetchAllApprovedDoctors[], total: number}> => {
    const response = await api.get<{data: IFetchAllApprovedDoctors[], total: number}>(`/api/admin/getApprovedDoctors?searchQuery=${searchQuery}&skip=${skip}&limit=${limit}`);
    if (!response.data.data || response.data.data.length === 0) {
        return { data: [] , total: 0}; 
    }
    return { data: response.data.data, total: response.data.total };
}

export const fetchAllDoctorsSummaryWithStatusApi = async (status: string, skip: number, limit: number): Promise<{data: IFetchAllApprovedDoctors[], meta: { total: number,
        skip: number,
        limit: number,
        totalPages: number }}> => {
    const response = await api.get<{data: IFetchAllApprovedDoctors[], meta: { total: number,
        skip: number,
        limit: number,
        totalPages: number }}>(`/api/admin/doctors`, { params: { status, skip, limit}});

    return { data: response.data.data, meta: response.data.meta };
}

export const getDoctorDetailsApi = async (doctorId: string): Promise<{ data: IDoctorType }> => {
    const response = await api.get<{ data: IDoctorType }>(`/api/admin/doctors/${doctorId}/approval-details`);
    return response.data
}


export const getDoctorAppointmentDetailsApi = async (_id: string): Promise<{ data: ISlotDetails[] }> => {
    const response = await api.get<{ data: ISlotDetails[] }>(`/api/admin/getAppointmentdetails/${_id}`);
    return response.data
}


export const updateDoctorStatusApi = async (_id: string, reviewStatus: 'approved' | 'rejected'): Promise<{ message: string }> => {
    const response = await api.patch<{ message: string }>(`/api/admin/doctors/${_id}/status`, {reviewStatus});
    return response.data;
};


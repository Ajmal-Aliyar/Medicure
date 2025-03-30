import { IMedicalRecord } from "../../types/record/record";
import { api } from "../../utils/axiosInstance";


export const getMedicalRecords = async (): Promise<any> => {
    const response = await api.get(`/api/record`);
    return response.data;
};

export const getMedicalRecordById = async (recordId: string): Promise<any> => {
    const response = await api.get(`/api/record/${recordId}`);
    return response.data;
};

export const updateMedicalRecordApi = async (
    recordId: string,
    { diagnosis, prescription, allergy, dateOfExamination, isCompleted }: IMedicalRecord
): Promise<{ response: string }> => {
    const response = await api.put<{ response: string }>(`/api/record/${recordId}`, { diagnosis, prescription, allergy, dateOfExamination,isCompleted });
    return response.data;
};

export const deleteMedicalRecord = async (recordId: string): Promise<{ response: string }> => {
    const response = await api.delete<{ response: string }>(`/api/record/${recordId}`);
    return response.data;
};

export interface IPrescription {
    allergy: string;
    diagnosis: string;
    prescription: string;
    createdAt: string;
    doctorDetails: {
        profileImage: string;
        specialization: string
        fullName: string
    }
}

export const fetchUserPrescriptionsApi = async ( skip: number, limit: number ): Promise<{ prescriptions: IPrescription[], total: number }> => {
    try {
        const response = await api.get<{ prescriptions: IPrescription[], total: number }>(`/api/record/prescription`, {
          params: { skip, limit }
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        throw error; 
      }
};

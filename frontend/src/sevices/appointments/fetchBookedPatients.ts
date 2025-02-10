import { api } from "../../utils/axiosInstance"

export interface UserDetailsPartial {
    _id: string;
    fullName: string;
    profileImage: string;
    gender: string;
  }
  
  export const fetchBookedPatients = async (slotId: string): Promise<{userDetails: UserDetailsPartial[]}> => {
    try {
      const response = await api.get<{userDetails: UserDetailsPartial[]}>(`/api/appointment/bookedPatients/${slotId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching booked patients:", error);
      throw error; 
    }
  };
  
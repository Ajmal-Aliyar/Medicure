import { ISlotDetails } from "../../types/doctor/verifyDetailsType";
import { ISlotSlice } from "../../types/slot/fetchSlot";
import { api } from "../../utils/axiosInstance";



export const fetchSlotDetails = async (): Promise<ISlotSlice> => {
    try {
        const { data } = await api.get<ISlotSlice>('/api/slot/get-slot-details');
        return data;
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to fetch slot details');
    }
}

const handleApiError = (error: unknown) => {
    if (error instanceof Error) {
        console.error('API Error:', error);
    } else if (error instanceof Response) {
        console.error('API Response Error:', error.statusText);
    } else {
        console.error('An unexpected error occurred');
    }
}

export const updateSlotsApi = async (slots: ISlotDetails[], fees: number | undefined): Promise<void> => {
    if (!slots || slots.length === 0) {
        throw new Error('No slots provided');
    }
    if (fees === undefined || fees < 0) {
        throw new Error('Invalid fee value');
    }

    try {
        await api.put(`/api/slot/manage-slots`, {
            slots,
            fees,
        });
    } catch (error) {
        handleApiError(error);
        throw new Error('Failed to update slot details');
    }
}

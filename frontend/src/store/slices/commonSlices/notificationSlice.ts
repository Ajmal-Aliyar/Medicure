import { createSlice, PayloadAction } from '@reduxjs/toolkit';

 export interface ConsultingData {
    roomId: string;
    _id: string;
    slotId: string;
}
interface NotificationState {
    error: string | null;
    success: string | null;
    warning: string | null;
    loading: boolean;
    extra: (() => void) | null
    consulting: ConsultingData | null
}



const initialState: NotificationState = {
    error: null,
    success: null,
    warning: null,
    loading: false,
    extra: null,
    consulting: null

};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setSuccess: (state, action: PayloadAction<string>) => {
            state.success = action.payload;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        setWarning: (state, action: PayloadAction<string>) => {
            state.warning = action.payload;
        },
        clearWarning: (state) => {
            state.warning = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setExtra: (state, action: PayloadAction<((...args: any[]) => void) | null>) => {
            state.extra = action.payload;
        },
        setConsultRinging: (state, action: PayloadAction<ConsultingData | null>) => {
            state.consulting = action.payload;
        }
    },
});

export const {
    setError,
    clearError,
    setSuccess,
    clearSuccess,
    setWarning,
    clearWarning,
    setLoading,
    setExtra,
    setConsultRinging
} = notificationSlice.actions;

export default notificationSlice.reducer;

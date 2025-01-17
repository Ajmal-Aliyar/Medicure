import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
    error: string | null;
    success: string | null;
    warning: string | null;
    loading: boolean;
}

const initialState: NotificationState = {
    error: null,
    success: null,
    warning: null,
    loading: false,
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
} = notificationSlice.actions;

export default notificationSlice.reducer;

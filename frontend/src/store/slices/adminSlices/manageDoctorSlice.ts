import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ManageDoctor {
    selectId: string
}

const initialState: ManageDoctor = {
    selectId: ''
};

const manageDoctorSlice = createSlice({
    name: 'manage-doctor',
    initialState,
    reducers: {
        setSelectedId: (state, action: PayloadAction<{ _id: string;}>) => {
            const { _id } = action.payload
            state.selectId = _id
        }
    },
});

export const { setSelectedId} = manageDoctorSlice.actions;

export default manageDoctorSlice.reducer;

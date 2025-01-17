import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFetchSlotResponse, ISlotSlice } from "../../../types/slot/fetchSlot";

const initialState: ISlotSlice = {
    slots: [{
        startTime: '',
        endTime: '',
        slotLimit: '',
        avgConsultTime: '',
        bookedSlot: '',
    }],
    fees: null
};

const slotDetails = createSlice({
    name: 'slot-details',
    initialState,
    reducers: {
        setSlotData: (state, action: PayloadAction<IFetchSlotResponse[]>) => {
            state.slots = action.payload;
        },
        setFees: (state, action: PayloadAction<number | null>) => {
            state.fees = action.payload;
        },
    }
});

export default slotDetails.reducer;
export const { setSlotData, setFees } = slotDetails.actions;

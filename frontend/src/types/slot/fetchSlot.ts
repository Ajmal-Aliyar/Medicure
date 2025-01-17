export interface IFetchSlotResponse {
    startTime: string,
    endTime: string,
    slotLimit: string,
    avgConsultTime: string,
    bookedSlot: string
}

export interface ISlotSlice {
    fees: number | null;
    slots: IFetchSlotResponse[]
}
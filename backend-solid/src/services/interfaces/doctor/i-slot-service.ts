import { CategorizedSlots } from "@/dtos";
import { SlotChartData } from "@/interfaces";
import { ISlot } from "@/models";

export interface IDoctorSlotService {
    createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]>;
    getSlots(doctorId: string, date: string, status?: string, isActive?: boolean): Promise<CategorizedSlots>
    updateSlotStatus(
    doctorId: string,
    slotId: string,
    isActive: boolean
  ): Promise<ISlot>
  getSlotsForDashboard(doctorId: string, startDate: string, endDate: string): Promise<SlotChartData[]>
}

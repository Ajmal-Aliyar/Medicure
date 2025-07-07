import { PublicSlotDetails } from "@/dtos";
import { IPagination } from "@/interfaces";

export interface IPatientSlotService {
  getDoctorSlotsForBooking(
    doctorId: string,
    date: string,
    pagination: IPagination
  ): Promise<{ slots: PublicSlotDetails[]; total: number }>;
}

import { FeedbackDetailsDTO, FeedbackDTO } from "@/dtos";
import { IPagination } from "@/interfaces";

export interface IFeedbackService {
    getFeedbackByAppointmentId( appointmentId: string): Promise<FeedbackDTO | null>;
    getFeedbacksByDoctorId(
         doctorId: string,
          pagination: IPagination
        ): Promise<{ data: FeedbackDetailsDTO[]; total: number }>
}
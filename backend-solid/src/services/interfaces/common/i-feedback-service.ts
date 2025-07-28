import { FeedbackDetails, IPagination } from "@/interfaces";
import { IFeedback } from "@/models";

export interface IFeedbackService {
    getFeedbackByAppointmentId( appointmentId: string): Promise<IFeedback | null>;
    getFeedbacksByDoctorId(
         doctorId: string,
          pagination: IPagination
        ): Promise<{ data: FeedbackDetails[]; total: number }>
}
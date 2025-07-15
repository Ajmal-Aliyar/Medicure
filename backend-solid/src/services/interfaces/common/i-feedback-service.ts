import { IPagination } from "@/interfaces";
import { IFeedback } from "@/models";

export interface IFeedbackService {
    getFeedbackByAppointmentId( appointmentId: string): Promise<IFeedback | null>;
    getFeedbacksByDoctorId(
         doctorId: string,
          pagination: IPagination
        ): Promise<{ data: IFeedback[]; total: number }>
}
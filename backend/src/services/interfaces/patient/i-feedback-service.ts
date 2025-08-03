import { SubmitFeedbackDTO } from "@/dtos";
import { FeedbackDetails, IPagination, IRole } from "@/interfaces";

export interface IPatientFeedbackService {
    submitFeedback(
        appointmentId: string,
        patientId: string,
        data: SubmitFeedbackDTO
      ): Promise<void>

      getFeedbacksByPatientId(
              patientId: string,
              role: IRole,
              pagination: IPagination
            ): Promise<{ feedbacks: FeedbackDetails[]; total: number }>
}
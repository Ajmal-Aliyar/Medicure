import { SubmitFeedbackDTO } from "@/dtos";

export interface IPatientFeedbackService {
    submitFeedback(
        appointmentId: string,
        patientId: string,
        data: SubmitFeedbackDTO
      ): Promise<void>
}
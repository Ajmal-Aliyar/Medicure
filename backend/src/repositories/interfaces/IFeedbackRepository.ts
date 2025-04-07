import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";

export interface IFeedbackRepository {
    createFeedback(feedbackData: ICreateFeedbackInput): Promise<IFeedbackDocument>;
    getFeedbackByUser(userId: string, skip: number, limit: number): Promise<{ feedbacks: IFeedbackDocument[], total: number }>;
    getFeedbackForDoctor(doctorId: string, skip: number, limit: number ): Promise<{ feedbacks: IFeedbackDocument[], total: number }>
}

export interface ICreateFeedbackInput {
    patientId: string;
    appointmentId: string;
    rating: number; 
    comments: string;
    doctorId: string;
}
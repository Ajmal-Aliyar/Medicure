import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import { ICreateFeedbackInput } from "../../repositories/interfaces/IFeedbackRepository";

export interface IFeedbackService {
    createFeedback(feedbackData: ICreateFeedbackInput): Promise<string>;
    getFeedbackByUser( _id: string, skip: number, limit: number ): Promise<{ feedbacks: IFeedbackDocument[], total: number }>
    getFeedbackForDoctor( _id: string, skip: number, limit: number ): Promise<{ feedbacks: IFeedbackDocument[], total: number }>
}
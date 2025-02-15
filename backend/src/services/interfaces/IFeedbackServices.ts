import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import { ICreateFeedbackInput } from "../../repositories/interfaces/IFeedbackRepository";

export interface IFeedbackService {
    createFeedback(feedbackData: ICreateFeedbackInput): Promise<string>;
    getFeedbackByUser( _id: string ): Promise<IFeedbackDocument[]>
}
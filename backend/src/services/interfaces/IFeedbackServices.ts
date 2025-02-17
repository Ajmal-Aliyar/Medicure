import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import { ICreateFeedbackInput } from "../../repositories/interfaces/IFeedbackRepository";

export interface IFeedbackService {
    createFeedback(feedbackData: ICreateFeedbackInput): Promise<string>;
    getFeedbackByUser( _id: string, skip: number, limitNumber: number ): Promise<IFeedbackDocument[]>
    getFeedbackForDoctor( _id: string, skip: number, limitNumber: number ): Promise<IFeedbackDocument[]>
}
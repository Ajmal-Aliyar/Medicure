import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";

export interface IFeedbackRepository {
    createFeedback(feedbackData: ICreateFeedbackInput): Promise<IFeedbackDocument>;
    getFeedbackByUser(_id: string): Promise<IFeedbackDocument[]>;
}

export interface ICreateFeedbackInput {
    patientId: string;
    doctorId: string;
    rating: number; 
    comments: string;
}
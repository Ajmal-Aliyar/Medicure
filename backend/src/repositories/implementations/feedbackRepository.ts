import { FeedbackModel } from "../../models/feedback/feedbackModel";
import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import { ICreateFeedbackInput, IFeedbackRepository } from "../interfaces/IFeedbackRepository";

export class FeedbackRepository implements IFeedbackRepository {
    async createFeedback(feedbackData: ICreateFeedbackInput): Promise<IFeedbackDocument> {
        const feedback = new FeedbackModel(feedbackData);
        return feedback.save();
    }

    async getFeedbackByUser(patientId: string, page: number = 1, limit: number = 10): Promise<IFeedbackDocument[]> {
        const skip = (page - 1) * limit;
    
        return await FeedbackModel.aggregate([
            { $match: { patientId } }, 
            {
                $lookup: {
                    from: "doctors",
                    let: { doctorIdStr: "$doctorId" }, 
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", { $toObjectId: "$$doctorIdStr" }] }
                            }
                        }
                    ],
                    as: "details"
                }
            },
            { $unwind: "$details" }, 
            {
                $project: {
                    _id: 1,
                    rating: 1,
                    comments: 1,
                    doctorId: 1,
                    "details.fullName": 1,
                    "details.specialization": 1,
                    "details.profileImage": 1
                }
            },
            { $skip: skip }, 
            { $limit: limit }
        ]);
    }

    async getFeedbackForDoctor(doctorId: string, page: number = 1, limit: number = 10): Promise<IFeedbackDocument[]> {
        const skip = (page - 1) * limit;
    
        return await FeedbackModel.aggregate([
            { $match: { doctorId } }, 
            {
                $lookup: {
                    from: "patients",
                    let: { patientIdStr: "$patientId" }, 
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", { $toObjectId: "$$patientIdStr" }] }
                            }
                        }
                    ],
                    as: "details"
                }
            },
            { $unwind: "$details" }, 
            {
                $project: {
                    _id: 1,
                    rating: 1,
                    comments: 1,
                    doctorId: 1,
                    "details.fullName": 1,
                    "details.profileImage": 1
                }
            },
            { $skip: skip }, 
            { $limit: limit }
        ]);
    }

}

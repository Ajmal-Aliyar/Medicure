import { FeedbackModel } from "../../models/feedback/feedbackModel";
import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import { ICreateFeedbackInput, IFeedbackRepository } from "../interfaces/IFeedbackRepository";

export class FeedbackRepository implements IFeedbackRepository {
    async createFeedback(feedbackData: ICreateFeedbackInput): Promise<IFeedbackDocument> {
        const feedback = new FeedbackModel(feedbackData);
        return feedback.save();
    }

    async getFeedbackByUser(patientId: string): Promise<IFeedbackDocument[]> {
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
                    as: "doctorDetails"
                }
            },
            { $unwind: "$doctorDetails" }, 
            {
                $project: {
                    _id: 1,
                    rating: 1,
                    comments: 1,
                    doctorId: 1,
                    "doctorDetails.fullName": 1,
                    "doctorDetails.specialization": 1,
                    "doctorDetails.profileImage": 1
                }
            }
        ]);

    }

}

import { FeedbackModel } from "../../models/feedback/feedbackModel";
import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import {
  ICreateFeedbackInput,
  IFeedbackRepository,
} from "../interfaces/IFeedbackRepository";

export class FeedbackRepository implements IFeedbackRepository {
  async createFeedback(
    feedbackData: ICreateFeedbackInput
  ): Promise<IFeedbackDocument> {
    const feedback = new FeedbackModel(feedbackData);
    return feedback.save();
  }

  async getFeedbackByUser(
    patientId: string,
    skip: number,
    limit: number
  ): Promise<{ feedbacks: IFeedbackDocument[]; total: number }> {
    const feedbacks = await FeedbackModel.aggregate([
      { $match: { patientId } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "doctors",
          let: { doctorIdStr: "$doctorId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$doctorIdStr" }] },
              },
            },
          ],
          as: "details",
        },
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
          "details.profileImage": 1,
          createdAt: 1,
        },
      },
    ]);

    const total = await FeedbackModel.countDocuments({ patientId });

    return { feedbacks, total };
  }

  async getFeedbackForDoctor(
    doctorId: string,
    skip: number,
    limit: number
  ): Promise<{ feedbacks: IFeedbackDocument[]; total: number }> {
    const feedbacks = await FeedbackModel.aggregate([
      { $match: { doctorId } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "patients",
          let: { patientIdStr: "$patientId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", { $toObjectId: "$$patientIdStr" }] },
              },
            },
          ],
          as: "details",
        },
      },
      { $unwind: "$details" },
      {
        $project: {
          _id: 1,
          rating: 1,
          comments: 1,
          doctorId: 1,
          "details.fullName": 1,
          "details.profileImage": 1,
          createdAt: 1,
        },
      },
    ]);

    const total = await FeedbackModel.countDocuments({ doctorId });

    return { feedbacks, total };
  }
}

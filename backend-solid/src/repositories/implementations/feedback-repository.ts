import { IFeedback, FeedbackModel } from "@/models";
import { BaseRepository } from "../base";
import { FindAllOptions, IFeedbackRepository } from "../interfaces";
import { PopulatedFeedbackDetails } from "@/interfaces";

export class FeedbackRepository
  extends BaseRepository<IFeedback>
  implements IFeedbackRepository
{
  constructor() {
    super(FeedbackModel);
  }

  async getFeedbackDetailsPopulated({
    filter = {},
    skip = 0,
    limit = 10,
    sort = { createdAt: -1 },
  }: FindAllOptions<IFeedback>): Promise<{
    feedbacks: PopulatedFeedbackDetails[];
    total: number;
  }> {
    const [feedbacks, total] = await Promise.all([
      this.model
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate(
          "doctorId",
          "personal.fullName personal.profileImage personal.dob personal.gender personal.languageSpoken professional.specialization professional.yearsOfExperience rating"
        )
        .populate(
          "patientId",
          "personal.fullName personal.profileImage personal.dob personal.bloodGroup personal.gender personal.mobile"
        )
        .lean<PopulatedFeedbackDetails[]>(),
      this.model.countDocuments(filter),
    ]);

    return { feedbacks, total };
  }
}

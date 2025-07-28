import { IFeedback } from "@/models";
import { IFeedbackService } from "../interfaces"
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IFeedbackRepository } from "@/repositories";
import { FeedbackDetails, IPagination, IRole, } from "@/interfaces";
import { FeedbackMapper } from "@/mappers/feedbackMapper";

@injectable()
export class FeedbackService implements IFeedbackService {
    constructor(@inject(TYPES.FeedbackRepository) private readonly feedbackRepo: IFeedbackRepository) {}

  async getFeedbackByAppointmentId( appointmentId: string): Promise<IFeedback | null> {
    const feedbackList = await this.feedbackRepo.findOne({appointmentId});
    return feedbackList;
  }

  async getFeedbacksByDoctorId(
     doctorId: string,
      pagination: IPagination
    ): Promise<{ data: FeedbackDetails[]; total: number }> {
      const { feedbacks, total } = await this.feedbackRepo.getFeedbackDetailsPopulated({
            filter:  { doctorId },
            sort:  {createdAt: -1},
            ...pagination
          });
      const mappedFeedbacks =
                FeedbackMapper.toFeedbackDetailsByRole(feedbacks, 'doctor');
      return { data: mappedFeedbacks, total };
    }

}

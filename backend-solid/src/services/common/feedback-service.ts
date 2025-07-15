import { IFeedback } from "@/models";
import { IFeedbackService } from "../interfaces"
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IFeedbackRepository } from "@/repositories";
import { IPagination, } from "@/interfaces";

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
    ): Promise<{ data: IFeedback[]; total: number }> {
      const { data, total } = await this.feedbackRepo.findAll({
        filter: { doctorId },
        ...pagination,
      });
      return { data, total };
    }
}

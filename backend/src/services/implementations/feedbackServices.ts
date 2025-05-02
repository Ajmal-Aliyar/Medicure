import { IFeedbackDocument } from "../../models/feedback/feedbackSchema";
import { IDoctorRepository } from "../../repositories/interfaces/IDoctorRepostory";
import {
  ICreateFeedbackInput,
  IFeedbackRepository,
} from "../../repositories/interfaces/IFeedbackRepository";
import { IFeedbackService } from "../interfaces/IFeedbackServices";

export class FeedbackService implements IFeedbackService {
  private feedbackRepository: IFeedbackRepository;
  private doctorRepository: IDoctorRepository;

  constructor(
    feedbackRepository: IFeedbackRepository,
    doctorRepository: IDoctorRepository
  ) {
    this.feedbackRepository = feedbackRepository;
    this.doctorRepository = doctorRepository;
  }

  async createFeedback({
    doctorId,
    appointmentId,
    patientId,
    rating,
    comments,
  }: ICreateFeedbackInput): Promise<string> {
    try {
      const doctorData = await this.doctorRepository.findByID(doctorId);
      if (!doctorData) throw new Error("Doctor does not exist.");

      const feedback = await this.feedbackRepository.createFeedback({
        doctorId,
        appointmentId,
        patientId,
        rating,
        comments,
      });
      if (!feedback) throw new Error("Failed to create feedback.");

      const totalRating =
        doctorData.rating * doctorData.reviewCount + rating * 20;
      const newReviewCount = doctorData.reviewCount + 1;
      const updatedRating = Math.round(
        (totalRating / (newReviewCount * 100)) * 100
      );

      const result = await this.doctorRepository.updateReview(
        doctorId,
        updatedRating,
        newReviewCount
      );
      if (!result || result.modifiedCount <= 0) {
        throw new Error("Failed to update doctor rating.");
      }

      return "feedback added successfully";
    } catch (error) {
      throw new Error(`Error creating feedback: ${error}`);
    }
  }

  async getFeedbackByUser(
    patientId: string,
    skip: number,
    limit: number
  ): Promise<{ feedbacks: IFeedbackDocument[]; total: number }> {
    try {
      return await this.feedbackRepository.getFeedbackByUser(patientId, skip, limit);
    } catch (error: unknown) {
      throw error;
    }
  }

  async getFeedbackForDoctor(
    doctorId: string,
    skip: number,
    limit: number
  ): Promise<{ feedbacks: IFeedbackDocument[]; total: number }> {
    try {
      return await this.feedbackRepository.getFeedbackForDoctor(
        doctorId,
        skip,
        limit
      );
    } catch (error: unknown) {
      throw error;
    }
  }
}

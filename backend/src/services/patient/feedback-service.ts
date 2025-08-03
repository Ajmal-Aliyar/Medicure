import { injectable, inject } from "inversify";
import { TYPES } from "@/di/types";
import { IAppointmentRepository, IFeedbackRepository } from "@/repositories";
import { NotFoundError, BadRequestError } from "@/errors";
import { Types } from "mongoose";
import { IPatientFeedbackService } from "../interfaces";
import { SubmitFeedbackDTO } from "@/dtos";
import { FeedbackDetails, IPagination, IRole } from "@/interfaces";
import { FeedbackMapper } from "@/mappers/feedbackMapper";

@injectable()
export class PatientFeedbackService implements IPatientFeedbackService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly appointmentRepo: IAppointmentRepository,
    @inject(TYPES.FeedbackRepository)
    private readonly feedbackRepo: IFeedbackRepository
  ) {}
  async submitFeedback(
    appointmentId: string,
    patientId: string,
    data: SubmitFeedbackDTO
  ): Promise<void> {
    const appointment = await this.appointmentRepo.findOne({
      _id: appointmentId,
    });

    if (!appointment) throw new NotFoundError("Appointment not found");

    if (appointment.patientId.toString() !== patientId)
      throw new BadRequestError("Unauthorized feedback submission");

    if (appointment.feedbackId)
      throw new BadRequestError("Feedback already submitted");

    const feedback = await this.feedbackRepo.create({
      appointmentId: new Types.ObjectId(appointmentId),
      patientId: new Types.ObjectId(patientId),
      doctorId: appointment.doctorId,
      rating: data.rating,
      comment: data.comment,
    });

    appointment.feedbackId = feedback._id as Types.ObjectId;
    await appointment.save();
  }

  async getFeedbacksByPatientId(
        patientId: string,
        role: IRole,
        { skip = 0, limit = 6 }: IPagination
      ): Promise<{ feedbacks: FeedbackDetails[]; total: number }> {
        const filter = {patientId};
        const { feedbacks, total } =
          await this.feedbackRepo.getFeedbackDetailsPopulated({
            filter,
            skip,
            limit,
            sort: { appointmentDate: 1, startTime: 1 },
          });
        const mappedFeedbacks =
          FeedbackMapper.toFeedbackDetailsByRole(feedbacks, role);
        return { feedbacks: mappedFeedbacks, total };
      }
}

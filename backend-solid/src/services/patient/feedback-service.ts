import { injectable, inject } from "inversify";
import { TYPES } from "@/di/types";
import { IAppointmentRepository, IFeedbackRepository } from "@/repositories";
import { NotFoundError, BadRequestError } from "@/errors";
import { Types } from "mongoose";
import { IPatientFeedbackService } from "../interfaces";
import { SubmitFeedbackDTO } from "@/dtos";
import { IFeedback } from "@/models";
import { IPagination } from "@/interfaces";

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
    pagination: IPagination
  ): Promise<{ data: IFeedback[]; total: number }> {
    const { data, total } = await this.feedbackRepo.findAll({
      filter: { patientId },
      ...pagination,
    });
    return { data, total };
  }
}

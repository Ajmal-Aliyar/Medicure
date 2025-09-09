import { TYPES } from "@/di/types";
import { IAppointmentRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IDoctorAppointmentService } from "../interfaces";
import { NotFoundError, UnauthorizedError } from "@/errors";
@injectable()
export class DoctorAppointmentService implements IDoctorAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}

  async markAppointmentInProgress(
    roomId: string,
    doctorId: string
  ): Promise<void> {
    await this.updateStatusIfAuthorized(roomId, doctorId, "in progress");
  }

  async markAppointmentCompleted(
    roomId: string,
    doctorId: string
  ): Promise<void> {
    console.log(roomId, doctorId);
    
    await this.updateStatusIfAuthorized(roomId, doctorId, "completed");
  }

  private async updateStatusIfAuthorized(
    roomId: string,
    doctorId: string,
    status: "in progress" | "completed"
  ): Promise<void> {
    const appointment = await this._appointmentRepo.findOne({ roomId });
    if (!appointment) throw new NotFoundError("Appointment not found");
    console.log(appointment.doctorId.toString() === doctorId, appointment.doctorId, appointment.doctorId.toString());
    
    if (appointment.doctorId.toString() !== doctorId)
      throw new UnauthorizedError();

    appointment.status = status;
    await appointment.save();
  }
}

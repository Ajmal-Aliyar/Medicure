import { TYPES } from "@/di/types";
import {
  IAppointmentRepository,
  IMedicalRecordRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import { IPagination } from "@/interfaces";
import { IMedicalRecord } from "@/models";
import { IDoctorMedicalRecordService } from "../interfaces";
import { ForbiddenError, NotFoundError } from "@/errors";
import { Types } from "mongoose";

@injectable()
export class DoctorMedicalRecordService implements IDoctorMedicalRecordService {
  constructor(
    @inject(TYPES.MedicalRecordRepository)
    private readonly _medicalRecordRepo: IMedicalRecordRepository,
    @inject(TYPES.AppointmentRepository)
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}

  async getReportsByAppointmentId(
    doctorId: string,
    appointmentId: string,
    pagination: IPagination
  ): Promise<{ data: IMedicalRecord[]; total: number }> {
    const appointment = await this._appointmentRepo.findById(appointmentId);
    if (!appointment) {
      throw new NotFoundError("Appointment not found.");
    }

    const isSameDoctor = appointment.doctorId.toString() === doctorId;

    if (!isSameDoctor) {
      throw new ForbiddenError(
        "You are not authorized to access this patient's records."
      );
    }
    const filter = { patientId: appointment.patientId }

    const { data, total } = await this._medicalRecordRepo.findAll({
      filter,
      ...pagination,
      sort: { uploadedAt: -1 },
    });
    return { data, total };
  }
}

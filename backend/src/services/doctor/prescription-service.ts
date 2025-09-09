import { IPrescription } from "@/models";
import { IDoctorPrescriptionService } from "../interfaces";
import { PrescriptionMapper } from "@/mappers/prescription-mapper";
import { FrontendPrescriptionPayload } from "@/interfaces/common/Prescription";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import {
  IAppointmentRepository,
  IPrescriptionRepository,
} from "@/repositories";
import { Types } from "mongoose";
import { ForbiddenError, NotFoundError } from "@/errors";

@injectable()
export class DoctorPrescriptionService implements IDoctorPrescriptionService {
  constructor(
    @inject(TYPES.PrescriptionRepository)
    private readonly _prescriptionRepo: IPrescriptionRepository,
    @inject(TYPES.AppointmentRepository)
    private readonly _appointmentRepo: IAppointmentRepository
  ) {}
  async createOrUpdatePrescription(
    doctorId: string,
    prescription: FrontendPrescriptionPayload
  ): Promise<IPrescription> {
    if (doctorId !== prescription.doctorId) {
      throw new ForbiddenError(
        "You are not authorized to perform this action."
      );
    }

    const doctorObjectId = new Types.ObjectId(doctorId);
    const appointmentObjectId = new Types.ObjectId(prescription.appointmentId);

    const appointment = await this._appointmentRepo.findOne({
      _id: appointmentObjectId,
      doctorId: doctorObjectId,
    });

    if (!appointment) {
      throw new NotFoundError(
        "Appointment not found or not associated with this doctor."
      );
    }

    const mappedPrescription =
      PrescriptionMapper.mapToPrescriptionData(prescription);

    if (appointment.prescriptionId) {
      return (await this._prescriptionRepo.update(
        appointment.prescriptionId.toString(),
        mappedPrescription
      )) as IPrescription;
    }

    const newPrescription = await this._prescriptionRepo.create(
      mappedPrescription
    );

    await this._appointmentRepo.update(appointment._id.toString(), {
      prescriptionId: newPrescription._id,
    });

    return newPrescription;
  }
}

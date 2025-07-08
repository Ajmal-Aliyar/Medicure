import { TYPES } from "@/di/types";
import { IAppointmentRepository, ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IPatientAppointmentService } from "../interfaces";
import {
  IAppointmentCreateInput,
} from "@/interfaces";
import { Types } from "mongoose";
import { generateRoomId } from "@/utils";
import { BadRequestError, NotFoundError } from "@/errors";
import { format } from "date-fns";
import { IAppointment } from "@/models";

@injectable()
export class PatientAppointmentService implements IPatientAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly appointmentRepo: IAppointmentRepository,
    @inject(TYPES.SlotRepository) private readonly slotRepo: ISlotRepository
  ) {}


  async createAppointment({
    patientId,
    doctorId,
    slotId,
    status,
    transactionId,
  }: IAppointmentCreateInput): Promise<IAppointment> {
    const slotDetails = await this.slotRepo.findById(slotId);
    if (!slotDetails) {
      throw new NotFoundError("Slot does not exist.");
    }

    const existingAppointment = await this.appointmentRepo.findOne({
      slotId: new Types.ObjectId(slotId),
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      throw new BadRequestError("Slot is already booked.");
    }

    const datePart = format(slotDetails.date, "yyyy-MM-dd");
    const appointment = await this.appointmentRepo.create({
      patientId: new Types.ObjectId(patientId),
      doctorId: new Types.ObjectId(doctorId),
      slotId: new Types.ObjectId(slotId),
      status,
      transactionId,
      roomId: generateRoomId(),
      appointmentDate: new Date(`${datePart}T${slotDetails.startTime}`),
      startTime: slotDetails.startTime,
      endTime: slotDetails.endTime,
      appointmentType: slotDetails.type,
    });

    if (!appointment) {
      throw new Error("Failed to create appointment.");
    }

    return appointment
  }
}

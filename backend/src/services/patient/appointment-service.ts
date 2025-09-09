import { TYPES } from "@/di/types";
import { IAppointmentRepository, IPrescriptionRepository, ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IPatientAppointmentService, ISlotService, ITransactionService, IWalletService } from "../interfaces";
import { IAppointmentCreateInput } from "@/interfaces";
import { Types } from "mongoose";
import { generateRoomId } from "@/utils";
import { BadRequestError, NotFoundError } from "@/errors";
import { format } from "date-fns";
import { IAppointment } from "@/models";
import { env } from "@/config";

@injectable()
export class PatientAppointmentService implements IPatientAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly _appointmentRepo: IAppointmentRepository,
    @inject(TYPES.SlotRepository) private readonly _slotRepo: ISlotRepository,
    @inject(TYPES.TransactionService)
    private readonly _transactionService: ITransactionService,
    @inject(TYPES.WalletService)
    private readonly _walletService: IWalletService,
    @inject(TYPES.SlotService)
    private readonly _slotService: ISlotService,
  ) {}

  async bookAppointment({
    doctorId,
    patientId,
    slotId,
    amount,
    paymentIntentId,
  }: {
    doctorId: string;
    patientId: string;
    slotId: string;
    amount: number;
    paymentIntentId: string;
  }): Promise<IAppointment> {
    const appointment = await this.createAppointment({
      doctorId,
      patientId,
      slotId,
      status: "scheduled",
      transactionId: paymentIntentId,
    });
    await this._slotService.bookSlot(slotId, patientId);
    await this._transactionService.bookAppointment({
      doctorId,
      patientId,
      appointmentId: String(appointment._id),
      amount,
      transactionId: paymentIntentId,
    });
    await this._walletService.updateWalletBalance(doctorId, "doctor", amount);
    await this._walletService.updateWalletBalance(env.ADMIN_ID, "admin", amount);
    return appointment;
  }

  private async createAppointment({
    patientId,
    doctorId,
    slotId,
    status,
    transactionId,
  }: IAppointmentCreateInput): Promise<IAppointment> {
    const slotDetails = await this._slotRepo.findById(slotId);
    if (!slotDetails) {
      throw new NotFoundError("Slot does not exist.");
    }

    const existingAppointment = await this._appointmentRepo.findOne({
      slotId: new Types.ObjectId(slotId),
      status: { $ne: "Cancelled" },
    });

    if (existingAppointment) {
      throw new BadRequestError("Slot is already booked.");
    }

    const datePart = format(slotDetails.date, "yyyy-MM-dd");
    const appointment = await this._appointmentRepo.create({
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

    return appointment;
  }
}

import { TYPES } from "@/di/types";
import {
  IAppointmentRepository,
  IPrescriptionRepository,
  ISlotRepository,
  ITransactionRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import {
  IPatientAppointmentService,
  IPaymentService,
  ISlotService,
  ITransactionService,
  IWalletService,
} from "../interfaces";
import { IAppointmentCreateInput } from "@/interfaces";
import { Types } from "mongoose";
import { generateRoomId } from "@/utils";
import { BadRequestError, NotFoundError } from "@/errors";
import { format } from "date-fns";
import { IAppointment } from "@/models";
import { env, stripe } from "@/config";

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
    @inject(TYPES.TransactionRepository)
    private readonly _transactionRepo: ITransactionRepository
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
    await this._walletService.updateWalletBalance(doctorId, "doctor", amount, true);
    await this._walletService.updateWalletBalance(
      env.ADMIN_ID,
      "admin",
      amount, true
    );
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

  async cancelAppointment(patientId: string, appointmentId: string) {
    const now = new Date();
    const appointment = await this._appointmentRepo.findOne({
      _id: appointmentId,
      patientId,
    });
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }
    const appointmentDate = new Date(appointment?.appointmentDate);
    const diffInHours =
      (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffInHours >= 24) {
      const transaction = await this._transactionRepo.findOne({
        transactionId: appointment.transactionId,
      });
      if (!transaction) {
        throw new Error("Transaction not found or not refundable.");
      }
      
      await stripe.refunds.create({
        payment_intent: appointment.transactionId,
        amount: transaction.amount / 2,
      });

      if (true) {
        await this._transactionRepo.create({
          from: transaction.to,
          to: transaction.from,
          doctorId: transaction.doctorId,
          amount: transaction.amount,
          type: "refund",
          status: 'success',
          transactionId: appointment.transactionId,
          appointmentId: transaction.appointmentId,
        });
        await this._walletService.updateWalletBalance(
          String(transaction.to),
          "admin",
          transaction.amount / 2,
          false
        );
        await this._walletService.updateWalletBalance(
          String(transaction.from),
          "doctor",
          transaction.amount / 2,
          false
        );
        await this._appointmentRepo.update(String(transaction.appointmentId), {status: 'cancelled'})
      }
    } else {
      throw new BadRequestError("Sorry, cancellations are not allowed within 24 hours of the appointment.")
    }
  }
}

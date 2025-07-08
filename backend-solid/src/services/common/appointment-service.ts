import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import {
  IAppointmentService,
  IPatientAppointmentService,
  ISlotService,
  ITransactionService,
  IWalletService,
} from "../interfaces";
import { AppointmentCard, IPagination, IRole } from "@/interfaces";
import { AppointmentMapper } from "@/mappers";
import {
  IAppointmentRepository,
} from "@/repositories";
import { Types } from "mongoose";
import { FilterAppointmentQuery } from "@/validators";
import { IAppointment } from "@/models";
import { env } from "@/config";

@injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly appointmentRepo: IAppointmentRepository,

    @inject(TYPES.PatientAppointmentService)
    private readonly patientAppointmentService: IPatientAppointmentService,
    @inject(TYPES.TransactionService)
    private readonly transactionService: ITransactionService,
    @inject(TYPES.WalletService)
    private readonly walletService: IWalletService,
    @inject(TYPES.SlotService)
    private readonly slotService: ISlotService
  ) { }

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
    const appointment = await this.patientAppointmentService.createAppointment({
      doctorId,
      patientId,
      slotId,
      status: "scheduled",
      transactionId: paymentIntentId,
    });
    await this.slotService.bookSlot(slotId, patientId);
    await this.transactionService.bookAppointment({
      doctorId,
      patientId,
      appointmentId: String(appointment._id),
      amount,
    });
    await this.walletService.updateWalletBalance(doctorId, "doctor", amount);
    await this.walletService.updateWalletBalance(env.ADMIN_ID, "admin", amount);
    return appointment;
  }

  async getAppointmentsCardDetails(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery,
    { skip = 0, limit = 6 }: IPagination
  ): Promise<{ appointments: AppointmentCard[]; total: number }> {
    const filter = this.buildFilterByRole(id, role, parsedQuery);
    const { appointments, total } =
      await this.appointmentRepo.getAppointmentsForUser({
        filter,
        skip,
        limit,
        sort: { appointmentDate: 1, startTime: 1 },
      });
    const mappedAppointments =
      AppointmentMapper.toAppointmentsCard(appointments);
    return { appointments: mappedAppointments, total };
  }

  private buildFilterByRole(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery
  ): Record<string, any> {
    const filter: Record<string, any> = {};
    if (role === "patient") filter.patientId = new Types.ObjectId(id);
    else if (role === "doctor") filter.doctorId = new Types.ObjectId(id);
    if (parsedQuery.appointmentType) {
      filter.appointmentType = parsedQuery.appointmentType;
    }
    if (parsedQuery.status) {
      filter.status = parsedQuery.status;
    }
    if (parsedQuery.appointmentDate) {
      const date = new Date(parsedQuery.appointmentDate);
      if (!isNaN(date.getTime())) {
        const nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1);
        filter.appointmentDate = {
          $gte: date,
          $lt: nextDate,
        };
      }
    }
    return filter;
  }
}

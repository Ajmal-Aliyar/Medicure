import { TYPES } from "@/di/types";
import { inject, injectable } from "inversify";
import { IAppointmentService } from "../interfaces";
import {
  AppointmentCard,
  AppointmentDetailsPopulated,
  AppointmentPageDetails,
  IPagination,
  IRole,
} from "@/interfaces";
import { AppointmentMapper } from "@/mappers";
import { IAppointmentRepository, IConversationRepository, IPrescriptionRepository, ITransactionRepository } from "@/repositories";
import { Types } from "mongoose";
import { FilterAppointmentQuery } from "@/validators";
import { NotFoundError, UnauthorizedError } from "@/errors";

@injectable()
export class AppointmentService implements IAppointmentService {
  constructor(
    @inject(TYPES.AppointmentRepository)
    private readonly _appointmentRepo: IAppointmentRepository,
    @inject(TYPES.TransactionRepository)
    private readonly _transactionRepo: ITransactionRepository,
    @inject(TYPES.PrescriptionRepository)
    private readonly _prescriptionRepo: IPrescriptionRepository,
    @inject(TYPES.ConversationRepository) private readonly _conversationRepo: IConversationRepository
  ) {}

  async getAppointmentByRoomId(
    id: string,
    role: IRole,
    roomId: string
  ): Promise<AppointmentDetailsPopulated> {
    const filter = {
      roomId,
      ...(role === "patient"
        ? { patientId: new Types.ObjectId(id) }
        : { doctorId: new Types.ObjectId(id) }),
    };
    const appointment =
      await this._appointmentRepo.getAppointmentDetailsPopulated({
        filter,
      });
    if (!appointment) {
      throw new NotFoundError("Appointment not found");
    }
    return AppointmentMapper.toAppointmentPopulated(appointment);
  }

  async getAppointmentsCardDetails(
    id: string,
    role: IRole,
    parsedQuery: FilterAppointmentQuery,
    { skip = 0, limit = 6 }: IPagination
  ): Promise<{ appointments: AppointmentCard[]; total: number }> {
    const filter = this.buildFilterByRole(id, role, parsedQuery);
    const { appointments, total } =
      await this._appointmentRepo.getAppointmentsForUser({
        filter,
        skip,
        limit,
        sort: { appointmentDate: 1, startTime: 1 },
      });
    const mappedAppointments =
      AppointmentMapper.toAppointmentsCard(appointments);
    return { appointments: mappedAppointments, total };
  }

  async getAppointmentById(
  id: string,
  role: IRole,
  appointmentId: string
): Promise<AppointmentPageDetails> {
  let filter: Record<string, any> = {
    _id: new Types.ObjectId(appointmentId),
  };

  switch (role) {
    case "patient":
      filter.patientId = new Types.ObjectId(id);
      break;
    case "doctor":
      filter.doctorId = new Types.ObjectId(id);
      break;
    case "admin":
      break;
    default:
      throw new UnauthorizedError("Invalid role for accessing appointment");
  }
  
  const appointment = await this._appointmentRepo.getAppointmentDetailsPopulated({ filter });

  if (!appointment) {
    throw new NotFoundError("Appointment not found");
  }

  const transaction = await this._transactionRepo.findOne({
    transactionId: appointment.transactionId,
  });

  if (!transaction) {
    throw new NotFoundError("Transaction not found for this appointment");
  }

  const prescription =
    appointment.status === "completed"
      ? await this._prescriptionRepo.findOne({ appointmentId })
      : null;

  const isConnected = await this._conversationRepo.isConnected(appointment.patientId._id, appointment.doctorId._id)
  return AppointmentMapper.toReturnAppointmentPageDetails(
    appointment,
    transaction,
    prescription,
    isConnected
  );
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

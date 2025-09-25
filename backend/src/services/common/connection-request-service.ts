import { TYPES } from "@/di/types";
import { NotFoundError, BadRequestError } from "@/errors";
import { IConnectionRequest } from "@/models";
import {
  IConnectionRequestRepository,
  IDoctorRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import { Types } from "mongoose";
import { IConnectionRequestService, IConversationService } from "../interfaces";
import {  IPagination, IRole } from "@/interfaces";
import { ConnectionRequestListDetailsDTO } from "@/dtos";
import { ConnectionRequestMapper } from "@/mappers";

@injectable()
export class ConnectionRequestService implements IConnectionRequestService {
  constructor(
    @inject(TYPES.ConnectionRequestRepository)
    private readonly _connectionRequestRepo: IConnectionRequestRepository,

    @inject(TYPES.ConversationService)
    private readonly _conversactionService: IConversationService,

    @inject(TYPES.DoctorRepository)
    private readonly _doctorRepo: IDoctorRepository
  ) {}

  async createRequest(
    patientId: string,
    role: IRole,
    doctorId: string
  ): Promise<void> {
    if (role !== 'patient') throw new BadRequestError('Bad request')
    const doctor = await this._doctorRepo.findById(doctorId);
    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }
    const patientObjectId = new Types.ObjectId(patientId);
    const doctorObjectId = new Types.ObjectId(doctorId);

    const existing = await this._connectionRequestRepo.findOne({
      patientId: patientObjectId,
      doctorId: doctorObjectId,
    });

    if (existing) {
      throw new BadRequestError("Connection request already exists");
    }

    const connectionPayload: Partial<IConnectionRequest> = {
      patientId: patientObjectId,
      doctorId: doctorObjectId,
    };

    await this._connectionRequestRepo.create(connectionPayload);
  }

  async approveRequest(doctorId: string, requestId: string): Promise<void> {
    const doctorObjectId = new Types.ObjectId(doctorId);
    const requestObjectId = new Types.ObjectId(requestId);

    const connection = await this._connectionRequestRepo.findOne({
      _id: requestObjectId,
      doctorId: doctorObjectId,
    });

    if (!connection) {
      throw new NotFoundError("Connection request not found");
    }

    if (connection.status === "accepted") {
      throw new BadRequestError("Request already approved");
    }

    connection.status = "accepted";
    await connection.save();
    this._conversactionService.createConversation([{id: doctorId, role: 'doctor'}, {id: String(connection.patientId), role: 'patient'}], false)

  }

  async getConnectionRequests(
    id: string,
    role: IRole,
    pagination: IPagination
  ): Promise<{ data: ConnectionRequestListDetailsDTO[]; total: number }> {
    const objectId = new Types.ObjectId(id);
    const filter = {
      ...(role === "doctor" ? { doctorId: objectId } : { patientId: objectId }),
    };

    const { requests, total } = await this._connectionRequestRepo.getAllRequests(
      {
        filter,
        ...pagination,
        sort: { createdAt: -1 },
      }
    );

    const mappedRequests = ConnectionRequestMapper.toRequestList(requests);
    return { data: mappedRequests, total };
  }
}

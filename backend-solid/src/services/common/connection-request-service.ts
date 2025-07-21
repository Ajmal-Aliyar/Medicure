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

@injectable()
export class ConnectionRequestService implements IConnectionRequestService {
  constructor(
    @inject(TYPES.ConnectionRequestRepository)
    private readonly connectionRequestRepo: IConnectionRequestRepository,

    @inject(TYPES.ConversationService)
    private readonly conversactionService: IConversationService,

    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository
  ) {}

  async createRequest(
    initiatorId: string,
    role: string,
    doctorId: string
  ): Promise<IConnectionRequest> {
    const doctor = await this.doctorRepo.findById(doctorId);
    if (!doctor) {
      throw new NotFoundError("Doctor not found");
    }

    const initiatorObjectId = new Types.ObjectId(initiatorId);
    const doctorObjectId = new Types.ObjectId(doctorId);

    const existing = await this.connectionRequestRepo.findOne({
      initiatorId: initiatorObjectId,
      doctorId: doctorObjectId,
    });

    if (existing) {
      throw new BadRequestError("Connection request already exists");
    }

    const connectionPayload: Partial<IConnectionRequest> = {
      initiatorId: initiatorObjectId,
      doctorId: doctorObjectId,
      status: role === "admin" ? "accepted" : "pending",
    };

    const request = await this.connectionRequestRepo.create(connectionPayload);
    await this.conversactionService.createConversation(initiatorObjectId, doctorObjectId, false)
    return request
  }

  async approveRequest(doctorId: string, requestId: string): Promise<void> {
    const doctorObjectId = new Types.ObjectId(doctorId);
    const requestObjectId = new Types.ObjectId(requestId);

    const connection = await this.connectionRequestRepo.findOne({
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
  }
}

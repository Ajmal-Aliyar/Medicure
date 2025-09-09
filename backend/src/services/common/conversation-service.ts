import { TYPES } from "@/di/types";
import {
  IAdminRepository,
  IConversationRepository,
  IDoctorRepository,
  IPatientRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import { IConversationService } from "../interfaces";
import { Types } from "mongoose";
import { BadRequestError, NotFoundError } from "@/errors";
import { IConversation } from "@/models";
import { IPagination, IRole } from "@/interfaces";
import { AUTH_MESSAGES } from "@/constants";

@injectable()
export class ConversationService implements IConversationService {
  constructor(
    @inject(TYPES.ConversationRepository)
    private readonly _conversationRepo: IConversationRepository,

    @inject(TYPES.DoctorRepository)
    private readonly _doctorRepo: IDoctorRepository,

    @inject(TYPES.PatientRepository)
    private readonly _patientRepo: IPatientRepository,
    @inject(TYPES.AdminRepository)
    private readonly _adminRepo: IAdminRepository
  ) {}

  async getConversactions(id: string, pagination: IPagination): Promise<{ data: IConversation[], total: number }> {
    const objectId = new Types.ObjectId(id);

    const filter = {
      "members.id": objectId,
    };
    return await this._conversationRepo.findAll({ filter, ...pagination });
  }

  async createConversation(
    participants: { id: string; role: IRole }[],
    isGroup: boolean = false,
    groupName?: string,
    groupImageUrl?: string
  ): Promise<IConversation> {
    const mappedParticipants = await Promise.all(
      participants.map(async (participant) => {
        const repo = this.getRepo(participant.role);
        const user = await repo.findById(participant.id);
        if (!user) throw new NotFoundError("Participant not found.");
        return {
          id: user._id,
          profileImage: user.personal.profileImage,
          fullName: user.personal.fullName,
        };
      })
    );

    if (!isGroup && mappedParticipants.length === 2) {
      const memberIds = mappedParticipants.map((p) => p.id.toString());

      const { data: possibleMatches } = await this._conversationRepo.findAll({
        filter: {
          isGroup: false,
          "members.id": { $all: memberIds },
        },
      });

      const existing = possibleMatches.find(
        (conv) =>
          conv.members.length === 2 &&
          conv.members.every((m) => memberIds.includes(m.id.toString()))
      );

      if (existing) return existing;
    }

    const conversationPayload = {
      isGroup,
      members: mappedParticipants,
      ...(isGroup && {
        name: groupName,
        groupImageUrl,
      }),
    };

    return await this._conversationRepo.create(conversationPayload);
  }

  async updateLastMessage( id: string, message: string, date: Date): Promise<void> {
      await this._conversationRepo.update(id, { lastMessage: {message, date}})
  }

  async isMember(candidateId: string, conversationId: string): Promise<boolean> {
    const chat = await this._conversationRepo.findById(conversationId);
    if (!chat) {
      throw new NotFoundError("Conversation not found.")
    }
    return chat.members.some((candidate) => String(candidate.id) === candidateId);
  }

  private getRepo(
    role: IRole
  ): IPatientRepository | IDoctorRepository | IAdminRepository {
    if (role === "patient") return this._patientRepo;
    if (role === "doctor") return this._doctorRepo;
    if (role === "admin") return this._adminRepo;
    throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  }
}

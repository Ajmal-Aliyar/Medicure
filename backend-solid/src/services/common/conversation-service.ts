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
    private readonly conversationRepo: IConversationRepository,

    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,

    @inject(TYPES.PatientRepository)
    private readonly patientRepo: IPatientRepository,
    @inject(TYPES.AdminRepository)
    private readonly adminRepo: IAdminRepository
  ) {}

  async getConversactions(id: string, pagination: IPagination): Promise<{ data: IConversation[], total: number }> {
    const objectId = new Types.ObjectId(id);

    const filter = {
      "members.id": objectId,
    };
    return await this.conversationRepo.findAll({ filter, ...pagination });
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

      const { data: possibleMatches } = await this.conversationRepo.findAll({
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

    return await this.conversationRepo.create(conversationPayload);
  }

  async updateLastMessage( id: string, message: string, date: Date): Promise<void> {
    console.log(message, date);
    
      await this.conversationRepo.update(id, { lastMessage: {message, date}})
  }

  private getRepo(
    role: IRole
  ): IPatientRepository | IDoctorRepository | IAdminRepository {
    if (role === "patient") return this.patientRepo;
    if (role === "doctor") return this.doctorRepo;
    if (role === "admin") return this.adminRepo;
    throw new BadRequestError(AUTH_MESSAGES.ERROR.INVALID_USER);
  }
}

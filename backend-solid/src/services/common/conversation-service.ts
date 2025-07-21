import { TYPES } from "@/di/types";
import {
  IConversationRepository,
  IDoctorRepository,
} from "@/repositories";
import { inject, injectable } from "inversify";
import { IConversationService } from "../interfaces";
import { Types } from "mongoose";
import { NotFoundError } from "@/errors";
import { IConversation } from "@/models";

@injectable()
export class ConversationService implements IConversationService {
  constructor(
    @inject(TYPES.ConversationRepository)
    private readonly conversationRepo: IConversationRepository,

    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository
  ) {}

  async createConversation(
    initiatorId: Types.ObjectId,
    participantId: Types.ObjectId,
    isGroup: boolean = false,
    groupName?: string,
    groupImageUrl?: string
  ): Promise<IConversation> {
    const initiatorObjectId = new Types.ObjectId(initiatorId);
    const participantObjectId = new Types.ObjectId(participantId);

    const participant = await this.doctorRepo.findOne({ _id: participantId});
    if (!participant) throw new NotFoundError("Doctor not found");

    if (!isGroup) {
      const existing = await this.conversationRepo.findOne({
        isGroup: false,
        members: { $all: [initiatorObjectId, participantObjectId], $size: 2 },
      });

      if (existing) return existing;
    }

    const conversationPayload = {
      isGroup,
      members: [initiatorObjectId, participantObjectId],
      ...(isGroup && {
        name: groupName,
        groupImageUrl,
      }),
    };

    const newConversation = await this.conversationRepo.create(conversationPayload);
    return newConversation;
  }
}

import { TYPES } from "@/di/types";
import { ISlot } from "@/models";
import { ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IDoctorSlotService } from "../interfaces";
import { IPagination } from "@/interfaces";

@injectable()
export class DoctorSlotService implements IDoctorSlotService {
  constructor(
    @inject(TYPES.SlotRepository)
    private slotRepo: ISlotRepository
  ) {}

  async getAllSlotsByDoctor(doctorId: string, pagination: IPagination) {
    const { skip, limit } = pagination
    return this.slotRepo.findAll({ skip, limit } )
  }

  async getSlotsByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]> {
    return this.slotRepo.findByDoctorAndDate(doctorId, date);
  }

  async createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]> {
    return this.slotRepo.bulkCreate(slots as ISlot[]);
  }
}
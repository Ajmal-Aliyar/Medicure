import { TYPES } from "@/di/types";
import { ISlot } from "@/models";
import { ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IDoctorSlotService } from "../interfaces";
import { SlotMapper } from "@/mappers";
import { CategorizedSlots } from "@/dtos";

@injectable()
export class DoctorSlotService implements IDoctorSlotService {
  constructor(
    @inject(TYPES.SlotRepository)
    private slotRepo: ISlotRepository
  ) {}

  async createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]> {
    return this.slotRepo.bulkCreate(slots as ISlot[]);
  }

  async getSlots(
    doctorId: string,
    date: string,
    status?: string,
    isActive?: boolean
  ): Promise<CategorizedSlots> {
    const data = await this.slotRepo.findByDoctorAndDate(doctorId, date, isActive, status);
    return SlotMapper.toGetSlotByDoctorAndDate(doctorId, data)
  }
}

import { TYPES } from "@/di/types";
import { ISlot } from "@/models";
import { ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { ISlotService } from "../interfaces";
import { IPagination } from "@/interfaces";
import { Types } from "mongoose";

@injectable()
export class SlotService implements ISlotService {
  constructor(
    @inject(TYPES.SlotRepository) private readonly slotRepo: ISlotRepository
  ) {}

  async createBulkSlots(slots: Partial<ISlot>[]): Promise<ISlot[]> {
    return this.slotRepo.bulkCreate(slots);
  }

  async getSlotsByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<ISlot[]> {
    const { data } = await this.slotRepo.findAll({
      filter: {
        doctorId: new Types.ObjectId(doctorId),
        date,
      },
      limit: Infinity,
    });

    return data;
  }

  async getNewSlotsForDate(
  doctorId: string,
  date: string,
  generatedSlots: ISlot[]
): Promise<ISlot[]> {
  const existingSlots = await this.getSlotsByDoctorAndDate(String(doctorId), date);

  const existingSlotKeys = new Set(
    existingSlots.map(slot => `${slot.startTime}-${slot.endTime}`)
  );

  const newSlots = generatedSlots.filter(
    slot => !existingSlotKeys.has(`${slot.startTime}-${slot.endTime}`)
  );

  return newSlots;
}


  // async getSlotsByDate(
  //   date: Date,
  //   pagination: IPagination
  // ): Promise<{
  //   data: ISlot[];
  //   total: number;
  // }> {
  //   return this.slotRepo.findAll({ filter: { date }, ...pagination });
  // }

  // async createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]> {
  //   return this.slotRepo.bulkCreate(slots as ISlot[]);
  // }
}

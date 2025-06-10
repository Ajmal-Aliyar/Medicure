import { injectable } from "inversify";
import { FilterQuery, Types } from "mongoose";
import { BaseRepository } from "../base";
import { ISlot, SlotModel } from "@/models";
import { ISlotRepository } from "../interfaces";

@injectable()
export class SlotRepository
  extends BaseRepository<ISlot>
  implements ISlotRepository
{
  constructor() {
    super(SlotModel);
  }

  async findByDoctorAndDate(
    doctorId: string,
    date: string,
    isActive?: boolean,
    status?: string
  ): Promise<ISlot[]> {
    const query: FilterQuery<ISlot> = {
      doctorId: new Types.ObjectId(doctorId),
      date,
    };
    if (isActive !== undefined) {
      query.isActive = isActive;
    }
    if (status !== undefined) {
      query.status = status;
    }
    return this.model.find(query);
  }

  async findAvailableSlotsByDoctor(doctorId: string): Promise<ISlot[]> {
    return this.model.find({
      doctorId: new Types.ObjectId(doctorId)
    });
  }

  async bulkCreate(slots: ISlot[]): Promise<ISlot[]> {
    return this.model.insertMany(slots, { ordered: false });
  }
}

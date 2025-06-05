import { injectable } from "inversify";
import { Types } from "mongoose";
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

  async findByDoctorAndDate(doctorId: string, date: Date): Promise<ISlot[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return this.model.find({
      doctorId: new Types.ObjectId(doctorId),
      startTime: { $gte: start, $lte: end },
    });
  }

  async findAvailableSlotsByDoctor(doctorId: string): Promise<ISlot[]> {
    return this.model.find({
      doctorId: new Types.ObjectId(doctorId),
      status: "available",
    });
  }

  async bulkCreate(slots: ISlot[]): Promise<ISlot[]> {
    return this.model.insertMany(slots, { ordered: false });
  }
}

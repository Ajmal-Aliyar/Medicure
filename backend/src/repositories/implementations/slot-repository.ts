import { injectable } from "inversify";
import { FilterQuery, Types } from "mongoose";
import { BaseRepository } from "../base";
import { ISlot, SlotModel } from "@/models";
import { ISlotRepository } from "../interfaces";
import { SlotChartData } from "@/interfaces";

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
      doctorId: new Types.ObjectId(doctorId),
    });
  }

  async bulkCreate(slots: ISlot[]): Promise<ISlot[]> {
    return this.model.insertMany(slots, { ordered: false });
  }

  async updateByDoctorAndSlotId(
    doctorId: string,
    slotId: string,
    isActive: boolean
  ): Promise<ISlot | null> {
    return this.model.findOneAndUpdate(
      { _id: slotId, doctorId },
      { isActive },
      { new: true }
    );
  }

  async getSlotStatsByDateRange(doctorId: string, start: string, end: string): Promise<SlotChartData[]> {
    const startDate = new Date(start);
  const endDate = new Date(end);
  const result = await this.model.aggregate([
    {
      $match: {
        doctorId: new Types.ObjectId(doctorId),
        date: {
          $gte: startDate,
          $lte: endDate
        }
      }
    },
    {
      $group: {
        _id: "$date",
        totalSlots: { $sum: 1 },
        bookedSlots: {
          $sum: {
            $cond: [{ $eq: ["$bookingDetails.isBooked", true] }, 1, 0]
          }
        }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);

  return result.map(({ _id, totalSlots, bookedSlots }) => ({
    date: new Date(_id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    totalSlots,
    bookedSlots
  }));
}

}

import { ISlot } from "../../types/ISlotInterface";
import { ISlotRepository } from "../interfaces/ISlotRepository";
import { ISlotSchema } from "../../models/slot/slotInterface";
import { SlotModel } from "../../models/slot/slotModel";
import { UpdateResult } from "mongoose";

export class SlotRepository implements ISlotRepository {
  async getAllSlotsId(doctorId: string): Promise<string[]> {
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

      const slots = await SlotModel.find({
        doctorId,
        createdAt: { $gte: twentyFourHoursAgo },
      })
        .select("_id")
        .lean();

      return slots.map((slot) => slot._id.toString());
    } catch (error) {
      console.error("Error fetching slot IDs:", error);
      throw new Error("Unable to fetch slot IDs");
    }
  }

  async getAllSlots(doctorId: string): Promise<ISlotSchema[]> {
    try {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      const slots = await SlotModel.find({
        doctorId,
        createdAt: { $gte: twentyFourHoursAgo },
      });
      return slots;
    } catch (error) {
      console.error("Error fetching slots:", error);
      throw new Error("Unable to fetch slots");
    }
  }

  async deleteSlot(_id: string): Promise<void> {
    try {
      const result = await SlotModel.deleteOne({ _id });
      if (result.deletedCount === 0) {
        throw new Error("Slot not found or already deleted");
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      throw new Error("Unable to delete slot");
    }
  }

  async getById(_id: string): Promise<ISlotSchema> {
    return await SlotModel.findById(_id);
  }
  async incBooked(_id: string): Promise<UpdateResult> {
    return await SlotModel.updateOne({ _id }, { $inc: { bookedSlot: 1 } });
  }

  async createSlot(slotData: ISlot): Promise<void> {
    try {
      const slot = new SlotModel({ ...slotData });
      await slot.save();
    } catch (error) {
      console.error("Error creating slot:", error);
      throw new Error("Unable to create slot");
    }
  }

  async consultingCompleted(_id: string): Promise<UpdateResult> {
    return await SlotModel.updateOne({ _id }, { $inc: { consulted: 1 } });
  }
}

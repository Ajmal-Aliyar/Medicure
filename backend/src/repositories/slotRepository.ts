import mongoose from "mongoose";
import { ISlot } from "../interfaces/slotInterface";
import { SlotModel } from "../models/slotsModel";
import {ISlotSchema} from "../models/slotsModel"

export class SlotRepository {

    async createSlot({ doctorId, startTime, endTime, slotLimit, avgConsultTime }: ISlot): Promise<ISlotSchema> {
        try {
            console.log(avgConsultTime,'avg')
            const slot = new SlotModel({ doctorId, startTime, endTime, slotLimit, avgConsultTime });
            return await slot.save();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSlot(_id: mongoose.Types.ObjectId): Promise<ISlotSchema | null> {
        try {
            const slot = await SlotModel.findById(_id)
            if (!slot) {
                throw new Error("Slot not found");
            }
            return slot;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllSlots (doctorId: string): Promise<ISlotSchema[]> {
        return await SlotModel.find({ doctorId })
    }

    async getAllSlotsId (doctorId: string): Promise<mongoose.Types.ObjectId[]> {
        return await SlotModel.find({ doctorId }).select('_id');
    }

    async updateSlot(_id: mongoose.Types.ObjectId, { startTime, endTime, slotLimit, avgConsultTime }: ISlot): Promise<void> {
        try {
            await SlotModel.updateOne(
                { _id }, 
                { $set: { startTime, endTime, slotLimit, avgConsultTime } }
            );
        } catch (error) {
            throw new Error(`Error updating slot: ${error.message}`);
        }
    }
    
    async bookSlot(_id: string): Promise<{ modifiedCount: number }> {
        try {
            const slot = await SlotModel.findById(_id);
            if (slot && slot.slotLimit > slot.bookedSlot) {
                return SlotModel.updateOne({ _id }, { $inc: { bookedSlot: 1 } });
            }
            throw new Error("No available slots to book");
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteSlot(_id: mongoose.Types.ObjectId): Promise<{ deletedCount: number }> {
        try {
            const slot = await SlotModel.findById(_id);
            if (!slot) {
                throw new Error("Slot not found, cannot delete");
            }
            return SlotModel.deleteOne({ _id });
        } catch (error) {
            throw new Error(error);
        }
    }
}

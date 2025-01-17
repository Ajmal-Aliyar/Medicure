import { ISlot } from "../interfaces/slot/slot.Interface";
import { ISlotRepository } from "../interfaces/slot/slot.repository.interface";
import { ISlotSchema } from "../models/slot/slot.interface";
import { SlotModel } from "../models/slot/slot.model";

export class SlotRepository implements ISlotRepository {

    async getAllSlotsId(doctorId: string): Promise<string[]> {
        try {
            const slots = await SlotModel.find({ doctorId }).select('_id').lean();
            return slots.map(slot => slot._id.toString());
        } catch (error) {
            console.error("Error fetching slot IDs:", error);
            throw new Error("Unable to fetch slot IDs");
        }
    }

    async getAllSlots(doctorId: string): Promise<ISlotSchema[]> {
        try {
            console.log(doctorId)
            const slots = await SlotModel.find({ doctorId })
            console.log(slots,'sdds')
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

    async createSlot(slotData: ISlot): Promise<void> {
        try {
            const slot = new SlotModel({ ...slotData });
            await slot.save();
        } catch (error) {
            console.error("Error creating slot:", error);
            throw new Error("Unable to create slot");
        }
    }
}

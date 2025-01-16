import { SlotRepository } from "../repositories/slotRepository";
import { ISlot } from "../interfaces/slotInterface";
import { ISlotSchema } from "../models/slotsModel";

const slotRepository = new SlotRepository()

export class SlotService {

    async manageSlots(doctorId: string, slots: ISlot[]): Promise<void> {
        try {

            const existingSlots = await slotRepository.getAllSlotsId(doctorId);
            const existingSlotIds = new Set(existingSlots)
            const newSlotIds = new Set(slots.map(slot => slot._id));
            const slotsToDelete = existingSlots.filter(_id => !newSlotIds.has(_id));

            for (const _id of slotsToDelete) {
                await slotRepository.deleteSlot(_id);
            }

            for (const slot of slots) {
                console.log(slot, 'sl')
                const { _id, startTime, endTime, slotLimit, avgConsultTime } = slot;
                console.log()
                if (existingSlotIds.has(_id)) {
                    await slotRepository.updateSlot(_id, { startTime, endTime, slotLimit, avgConsultTime });
                } else {
                    await slotRepository.createSlot({ doctorId, startTime, endTime, slotLimit, avgConsultTime });
                }
            }
        } catch (error) {
            throw new Error(`Error managing slots: ${error.message}`);
        }
    }

    async getSlots(doctorId: string): Promise<ISlotSchema[]> {
        try {
            return await slotRepository.getAllSlots(doctorId)
        } catch (error) {
            throw new Error(`Error fetching slots: ${error.message}`);
        }
    }


}
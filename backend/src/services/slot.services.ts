import { IDoctorRepository } from "../interfaces/doctor/doctor.Interface";
import { ISlot } from "../interfaces/slot/slot.Interface";
import { ISlotRepository } from "../interfaces/slot/slot.repository.interface";
import { ISlotService } from "../interfaces/slot/slot.service.interface";
import { ISlotSchema } from "../models/slot/slot.interface";


export class SlotService implements ISlotService {
    private slotRepository: ISlotRepository;
    private doctorRepository: IDoctorRepository;

    constructor(slotRepository: ISlotRepository, doctorRepository: IDoctorRepository) {
        this.slotRepository = slotRepository;
        this.doctorRepository = doctorRepository
    }

    async getSlots(doctorId: string): Promise<{ slots: ISlotSchema[]; fees: number }> {
        try {
            console.log('Fetching slots and fee for doctor:', doctorId);
            const [slots, fees] = await Promise.all([
                this.slotRepository.getAllSlots(doctorId),
                this.doctorRepository.getFees(doctorId)
            ]);
            return { slots, fees };
        } catch (error: any) {
            throw new Error(`Error fetching slots: ${error.message || error}`);
        }
    }
    
    async manageSlots(doctorId: string, slots: ISlot[], fees: number): Promise<void> {
        try {
            await this.doctorRepository.updateFees(doctorId, fees);
            const existingSlotIds = new Set(await this.slotRepository.getAllSlotsId(doctorId));
            const newSlotIds = new Set(slots.map(slot => slot._id).filter(Boolean)); 
            const slotsToDelete = [...existingSlotIds].filter(_id => !newSlotIds.has(_id));
            if (slotsToDelete.length) await this.deleteSlots(slotsToDelete);
            await this.updateOrCreateSlots(slots, existingSlotIds, doctorId);
    
        } catch (error: any) {
            console.error(`Error managing slots: ${error.message}`);
            throw new Error(`Error managing slots: ${error.message}`);
        }
    }
    
    private async deleteSlots(slotIds: string[]): Promise<void> {
        await Promise.all(slotIds.map(_id => this.slotRepository.deleteSlot(_id)));
    }
    
    private async updateOrCreateSlots(slots: ISlot[], existingSlotIds: Set<string>, doctorId: string): Promise<void> {
        for (const slot of slots) {
            const { _id, startTime, endTime, slotLimit, avgConsultTime } = slot;

            if (_id && existingSlotIds.has(_id)) {
                console.log("update id",_id)
            } else {
                console.log({ doctorId, startTime, endTime, slotLimit, avgConsultTime })
                await this.slotRepository.createSlot({ doctorId, startTime, endTime, slotLimit, avgConsultTime });
            }
        }
    }
    
}

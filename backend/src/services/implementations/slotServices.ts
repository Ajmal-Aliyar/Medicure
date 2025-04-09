import { ISlot } from "../../types/ISlotInterface";
import { ISlotRepository } from "../../repositories/interfaces/ISlotRepository";
import { ISlotService } from "../interfaces/ISlotServices";
import { ISlotSchema } from "../../models/slot/slotInterface";
import { IDoctorRepository } from "../../repositories/interfaces/IDoctorRepostory";
import { UpdateResult } from "mongoose";

export class SlotService implements ISlotService {
  private slotRepository: ISlotRepository;
  private doctorRepository: IDoctorRepository;

  constructor(
    slotRepository: ISlotRepository,
    doctorRepository: IDoctorRepository
  ) {
    this.slotRepository = slotRepository;
    this.doctorRepository = doctorRepository;
  }

  async getSlots(
    doctorId: string
  ): Promise<{ slots: ISlotSchema[]; fees: number }> {
    try {
      const [slots, fees] = await Promise.all([
        this.slotRepository.getAllSlots(doctorId),
        this.doctorRepository.getFees(doctorId),
      ]);
      return { slots, fees };
    } catch (error: unknown) {
      throw new Error(`Error fetching slots: ${error || error}`);
    }
  }

  async manageSlots(
    doctorId: string,
    slots: ISlot[],
    fees: number
  ): Promise<void> {
    try {
      await this.doctorRepository.updateFees(doctorId, fees);
      const existingSlotIds = new Set(
        await this.slotRepository.getAllSlotsId(doctorId)
      );
      const newSlotIds = new Set(slots.map((slot) => slot._id).filter(Boolean));
      const slotsToDelete = [...existingSlotIds].filter(
        (_id) => !newSlotIds.has(_id)
      );
      if (slotsToDelete.length) await this.deleteSlots(slotsToDelete);
      await this.updateOrCreateSlots(slots, existingSlotIds, doctorId);
    } catch (error: unknown) {
      console.error(`Error managing slots: ${error}`);
      throw new Error(`Error managing slots: ${error}`);
    }
  }

  async fetchDoctorSlotDetails(
    doctorId: string
  ): Promise<{ slots: ISlotSchema[] }> {
    try {
      const slots = await this.slotRepository.getAllSlots(doctorId);
      return { slots };
    } catch (error: unknown) {
      throw new Error(`Error fetching slots: ${error || error}`);
    }
  }

  async isSlotLimitExceed(slotId: string): Promise<boolean> {
    try {
      const slotDetails = await this.slotRepository.getById(slotId);

      if (!slotDetails) {
        throw new Error("Couldn't find the specified slot.");
      }

      return slotDetails.bookedSlot < slotDetails.slotLimit;
    } catch (error) {
      console.error("Error checking slot limit:", error);
      throw error;
    }
  }

  async incBooked(slotId: string): Promise<UpdateResult> {
    try {
      const updateSlot = await this.slotRepository.incBooked(slotId);
      if (updateSlot.modifiedCount === 0) {
        throw new Error(
          "Failed to increment booked slot. Slot not found or already updated."
        );
      }
      return updateSlot;
    } catch (error) {
      console.error("Error incrementing booked slot:", error);
      throw error;
    }
  }

  private async deleteSlots(slotIds: string[]): Promise<void> {
    await Promise.all(
      slotIds.map((_id) => this.slotRepository.deleteSlot(_id))
    );
  }

  private async updateOrCreateSlots(
    slots: ISlot[],
    existingSlotIds: Set<string>,
    doctorId: string
  ): Promise<void> {
    for (const slot of slots) {
      const { _id, startTime, endTime, slotLimit, avgConsultTime } = slot;

      if (_id && existingSlotIds.has(_id)) {
        throw new Error("Slot already exists");
      } else {
        await this.slotRepository.createSlot({
          doctorId,
          startTime,
          endTime,
          slotLimit,
          avgConsultTime,
        });
      }
    }
  }
}

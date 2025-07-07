import { TYPES } from "@/di/types";
import { ISlot } from "@/models";
import { ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { ISlotService } from "../interfaces";
import { Types } from "mongoose";
import { BadRequestError } from "@/errors";

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
    date: Date
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
    date: Date,
    generatedSlots: ISlot[]
  ): Promise<ISlot[]> {
    const existingSlots = await this.getSlotsByDoctorAndDate(
      String(doctorId),
      date
    );

    const existingSlotKeys = new Set(
      existingSlots.map((slot) => `${slot.startTime}-${slot.endTime}`)
    );

    const newSlots = generatedSlots.filter(
      (slot) => !existingSlotKeys.has(`${slot.startTime}-${slot.endTime}`)
    );

    return newSlots;
  }

  async releaseSlot(slotId: string, patientId: string): Promise<boolean> {
    const slot = await this.slotRepo.findById(slotId);

    if (!slot) return false;

    const reservedPatientId = slot.bookingDetails?.patientId?.toString();
    if (slot.status !== "reserved" || reservedPatientId !== patientId) {
      return false;
    }
    await this.slotRepo.update(slotId, {
      status: "available",
      bookingDetails: {
        isBooked: false,
        patientId: undefined,
        bookedAt: undefined,
      },
    });

    return true;
  }

  async validateSlotAvailability(
    slotId: string,
    patientId: string
  ): Promise<ISlot> {
    const slot = await this.slotRepo.findById(slotId);
    if (!slot) {
      throw new BadRequestError("Slot not found.");
    }
    if (slot.status !== "available") {
      throw new BadRequestError("Slot is not available.");
    }
    const updated = await this.slotRepo.update(slotId, {
      status: "reserved",
      bookingDetails: {
        isBooked: false,
        patientId: new Types.ObjectId(patientId),
      },
    });
    if (!updated) {
      throw new Error("Failed to reserve the slot. Try again.");
    }
    return slot;
  }

  async slotBooked(slotId: string, patientId: string): Promise<void> {
    const bookingDetails = {
      isBooked: true,
      patientId: new Types.ObjectId(patientId),
      bookedAt: new Date(),
    };
    await this.slotRepo.update(slotId, {
      status: "booked",
      bookingDetails,
    });
  }
}

import { TYPES } from "@/di/types";
import { ISlot } from "@/models";
import { ISlotRepository } from "@/repositories";
import { inject, injectable } from "inversify";
import { IDoctorSlotService } from "../interfaces";
import { SlotMapper } from "@/mappers";
import { CategorizedSlots } from "@/dtos";
import { NotFoundError } from "@/errors";
import { SlotChartData } from "@/interfaces";

@injectable()
export class DoctorSlotService implements IDoctorSlotService {
  constructor(
    @inject(TYPES.SlotRepository)
    private _slotRepo: ISlotRepository
  ) {}

  async createSlots(slots: Partial<ISlot>[]): Promise<ISlot[]> {
    return this._slotRepo.bulkCreate(slots as ISlot[]);
  }

  async getSlots(
    doctorId: string,
    date: string,
    status?: string,
    isActive?: boolean
  ): Promise<CategorizedSlots> {
    const data = await this._slotRepo.findByDoctorAndDate(
      doctorId,
      date,
      isActive,
      status
    );
    return SlotMapper.toGetSlotByDoctorAndDate(doctorId, data);
  }

  async updateSlotStatus(
    doctorId: string,
    slotId: string,
    isActive: boolean
  ): Promise<ISlot> {
    const updatedSlot = await this._slotRepo.updateByDoctorAndSlotId(
      doctorId,
      slotId,
      isActive
    );
    if (!updatedSlot) {
      throw new NotFoundError(
        `Slot with ID ${slotId} not found or update failed`
      );
    }
    return updatedSlot;
  }

  async getSlotsForDashboard(doctorId: string, startDate: string, endDate: string): Promise<SlotChartData[]> {
    return await this._slotRepo.getSlotStatsByDateRange(doctorId, startDate, endDate)
  }
}

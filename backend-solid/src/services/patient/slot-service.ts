import { inject, injectable } from "inversify";
import { IPatientSlotService } from "../interfaces";
import { TYPES } from "@/di/types";
import { ISlotRepository } from "@/repositories";
import { SlotMapper } from "@/mappers";
import { PublicSlotDetails } from "@/dtos";
import { IPagination } from "@/interfaces";
import { Types } from "mongoose";
import { ensureTodayOrFuture } from "@/utils";

@injectable()
export class PatientSlotService implements IPatientSlotService {
    constructor(@inject(TYPES.SlotRepository) private readonly slotRepo: ISlotRepository) {}

    async getDoctorSlotsForBooking(doctorId: string, date: string, pagination: IPagination): Promise<{ slots: PublicSlotDetails[], total: number; }> {
       ensureTodayOrFuture(date);
        const { data, total } = await this.slotRepo.findAll({filter: {doctorId : new Types.ObjectId(doctorId), isActive: true, date}, sort: { createdAt: 1 }, ...pagination})
        const slots = SlotMapper.toPublicSlotDetails(data) 
        return { slots, total }
    } 

}
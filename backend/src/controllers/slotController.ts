import { ISlotController } from "../types/slot/slot.controller.interface";
import { NextFunction, Request, Response } from "express";
import { ISlotService } from "../services/interfaces/ISlotServices";

export class SlotController implements ISlotController {
  private slotService: ISlotService;

  constructor(slotService: ISlotService) {
    this.slotService = slotService;

    this.getSlots = this.getSlots.bind(this);
    this.manageSlots = this.manageSlots.bind(this);
    this.doctorSlotDetails = this.doctorSlotDetails.bind(this);
  }

  async getSlots(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { _id } = req.client;
      const slots = await this.slotService.getSlots(_id);
      res.status(200).json(slots);
    } catch (error) {
      next(error);
    }
  }

  async manageSlots(req: Request, res: Response): Promise<void> {
    try {
      const { slots, fees } = req.body;
      const { _id } = req.client;
      await this.slotService.manageSlots(_id, slots, fees);
      res.status(200).json({ message: "Slots managed successfully" });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  async doctorSlotDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { doctorId } = req.params;
      const slots = await this.slotService.fetchDoctorSlotDetails(doctorId);
      res.status(200).json(slots);
    } catch (error) {
      next(error);
    }
  }
}

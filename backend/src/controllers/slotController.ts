import { Request, Response } from "express";
import { ISlot } from "../interfaces/slotInterface";
import { SlotService } from "../services/slotServices";
import { DoctorService } from "../services/doctorServices";

const slotService = new SlotService()
const doctorService = new DoctorService()

export class SlotController {

    async manageSlots(req: Request, res: Response): Promise<void> {

        const { slots, fees }: { slots: ISlot[], fees: number } = req.body;
        const { _id } = req.client;

        try {
            if (fees) await doctorService.updateFees({ _id, fees })
            await slotService.manageSlots(_id, slots);
            console.log('Slots created successfully!')
            res.status(201).json({ message: 'Slots created successfully!' });
        } catch (error) {
            console.error('Error occurred while creating slots:', error);
            res.status(400).json({ error: error instanceof Error ? error.message : error });
        }
    }

    async getSlots(req: Request, res:Response): Promise<void> {
        const { _id }: {_id:string} = req.client
        try {
            const fees = await doctorService.getFees(_id)
            const slots =  await slotService.getSlots(_id)
           res.status(200).json({slots,fees})
        } catch(error: any) {
            console.error('Error occurred while fetching slots:', error);
            res.status(400).json({ error: error instanceof Error ? error.message : error });
        }
    }
}

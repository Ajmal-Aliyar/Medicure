import { Request, Response } from "express";


export interface ISlotController {
getSlots (
    req: Request,
    res: Response
  ): Promise<void> 
}
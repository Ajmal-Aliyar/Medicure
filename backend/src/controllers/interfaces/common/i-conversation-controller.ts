import { Request, Response } from "express";

export interface IConversationController {
    getConversactions(req: Request, res: Response): Promise<void>
}
import { Request, Response } from "express";

export interface IMessageController {
    getMessages(req: Request, res: Response): Promise<void>
}
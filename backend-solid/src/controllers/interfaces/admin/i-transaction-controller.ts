import { Request, Response } from "express";

export interface IAdminTransactionController {
 getTransactionDashboard(
    req: Request,
    res: Response
  ): Promise<void>;
}

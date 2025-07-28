import { inject, injectable } from "inversify";
import { IPrescriptionController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IPrescriptionService } from "@/services";
import { Request, Response } from "express";
import { successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class PrescriptionController
  implements IPrescriptionController
{
  constructor(
    @inject(TYPES.PrescriptionService)
    private readonly prescriptionService: IPrescriptionService
  ) {}

  getPrescription = async (req: Request, res: Response): Promise<void> => {
    const { id, role } = req.user;
    const { prescriptionId } = req.params
    const prescription =
      await this.prescriptionService.getPrescription( id, role, prescriptionId);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Prescription details fetched succesfully.",
      prescription
    );
  };

  viewPrescription = async (req: Request, res: Response): Promise<void> => {
    const { id, role } = req.user;
    const { prescriptionId } = req.params
    const prescription =
      await this.prescriptionService.viewPrescriptionForDownload( id, role, prescriptionId);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Prescription details fetched succesfully.",
      prescription
    );
  };
}

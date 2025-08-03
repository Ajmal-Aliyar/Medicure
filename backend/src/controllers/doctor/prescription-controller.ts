import { inject, injectable } from "inversify";
import { IDoctorPrescriptionController } from "../interfaces";
import { TYPES } from "@/di/types";
import { IDoctorPrescriptionService } from "@/services";
import { Request, Response } from "express";
import { successResponse } from "@/utils";
import { HTTP_STATUS } from "@/constants";

@injectable()
export class DoctorPrescriptionController
  implements IDoctorPrescriptionController
{
  constructor(
    @inject(TYPES.DoctorPrescriptionService)
    private readonly prescriptionService: IDoctorPrescriptionService
  ) {}

  createPrescription = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const data = req.body;
    const prescription =
      await this.prescriptionService.createOrUpdatePrescription(id, data);
    successResponse(
      res,
      HTTP_STATUS.CREATED,
      "Prescription created succesfully.",
      prescription
    );
  };

  updatePrescription = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user;
    const data = req.body;
    const prescription =
      await this.prescriptionService.createOrUpdatePrescription(id, data);
    successResponse(
      res,
      HTTP_STATUS.OK,
      "Prescription updated succesfully.",
      prescription
    );
  };
}

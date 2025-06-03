import { ADMIN_MESSAGES, HTTP_STATUS } from "@/constants";
import { TYPES } from "@/di/types";
import { IAdminDoctorService } from "@/services";
import {
  buildPaginationMeta,
  getPaginationParams,
  successResponse,
} from "@/utils";
import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { IAdminDoctorController } from "../interfaces";

@injectable()
export class AdminDoctorController implements IAdminDoctorController {
  constructor(
    @inject(TYPES.AdminDoctorService)
    private readonly adminDoctorService: IAdminDoctorService
  ) {}

  getDoctorsByReviewStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const status = String(req.query.status)
    const { skip, limit } = getPaginationParams(req);

    const { total, doctors } =
      await this.adminDoctorService.getDoctorsByReviewStatus( status, {
        skip,
        limit,
      });
    const meta = buildPaginationMeta(total, skip, limit);
    successResponse(
      res,
      HTTP_STATUS.OK,
      ADMIN_MESSAGES.SUCCESS.DOCTOR_DETAILS_FETCHED,
      doctors,
      meta
    );
  };

  getDoctorApprovalDetails = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const doctorId = req.params.doctorId as string;
    const doctor = await this.adminDoctorService.getDoctorApprovalDetails(
      doctorId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      ADMIN_MESSAGES.SUCCESS.DOCTOR_DETAILS_FETCHED,
      doctor
    );
  };

   updateDoctorStatus = async(req: Request, res: Response): Promise<void> => {
    const { doctorId } = req.params;
    const { reviewStatus, reviewComment } = req.body;
    await this.adminDoctorService.updateDoctorStatus(doctorId, reviewStatus, reviewComment);
    successResponse(res, HTTP_STATUS.OK, ADMIN_MESSAGES.SUCCESS.STATUS_UPDATED);
  }

  blockDoctor = async(req: Request, res: Response): Promise<void> => {
    const { doctorId } = req.params;
    const { reason } = req.body;
    await this.adminDoctorService.blockDoctor(doctorId, reason);
    successResponse(res, HTTP_STATUS.OK, ADMIN_MESSAGES.SUCCESS.BlOCKED_DOCTOR);
  }

  unblockDoctor = async(req: Request, res: Response): Promise<void> => {
    const { doctorId } = req.params;
    await this.adminDoctorService.unblockDoctor(doctorId);
    successResponse(res, HTTP_STATUS.OK, ADMIN_MESSAGES.SUCCESS.UNBlOCKED_DOCTOR);
  }
}

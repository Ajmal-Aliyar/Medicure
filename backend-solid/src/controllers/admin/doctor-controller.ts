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
import { filterDoctorQuerySchema } from "@/validators";

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
    const pagination = getPaginationParams(req);

    const { total, doctors } =
      await this.adminDoctorService.getDoctorsByReviewStatus( status, pagination);
    const meta = buildPaginationMeta(total, pagination.limit);
    successResponse(
      res,
      HTTP_STATUS.OK,
      ADMIN_MESSAGES.SUCCESS.DOCTORS_DETAILS_FETCHED,
      doctors,
      meta
    );
  };

   getDoctorsSummary = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const pagination = getPaginationParams(req);
    const parsedQuery = filterDoctorQuerySchema.parse(req.query);
    const { total, doctors } =
      await this.adminDoctorService.getFilteredDoctor( parsedQuery, pagination);
    const meta = buildPaginationMeta(total, pagination.limit);
    successResponse(
      res,
      HTTP_STATUS.OK,
      ADMIN_MESSAGES.SUCCESS.DOCTORS_DETAILS_FETCHED,
      doctors,
      meta
    );
  };

  getDoctorProfile = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const doctorId = req.params.doctorId as string;
    const doctor = await this.adminDoctorService.getDoctorProfile(
      doctorId
    );
    successResponse(
      res,
      HTTP_STATUS.OK,
      ADMIN_MESSAGES.SUCCESS.DOCTORS_DETAILS_FETCHED,
      doctor
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
      ADMIN_MESSAGES.SUCCESS.DOCTORS_DETAILS_FETCHED,
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

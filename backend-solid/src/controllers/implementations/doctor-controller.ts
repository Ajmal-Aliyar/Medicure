import { inject, injectable } from "inversify";
import { IDoctorController } from "@/controllers";
import { TYPES } from "@/di/types";
import { IDoctorService } from "@/services";
import { NextFunction, Request, Response } from "express";
import { successResponse } from "@/utils";
import { GLOBAL_MESSAGES, HTTP_STATUS } from "@/constants";

@injectable()
export class DoctorController implements IDoctorController {
  constructor(
    @inject(TYPES.DoctorService) private readonly doctorService: IDoctorService
  ) {}

  async updateProfileImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.user?.id as string;
      const { profileImage } = req.body;

      await this.doctorService.updateProfileImg(id, profileImage);

      successResponse(
        res,
        HTTP_STATUS.OK,
        GLOBAL_MESSAGES.SUCCESS.PROFILE_IMAGE_UPDATED
      );
    } catch (error) {
      next(error);
    }
  }
}

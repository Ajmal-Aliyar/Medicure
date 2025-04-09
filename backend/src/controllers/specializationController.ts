import { NextFunction, Request, Response } from "express";
import { ISpecializationServices } from "../services/interfaces/ISpecializationServices";

export class SpecializationController {
  private specializationServices: ISpecializationServices;

  constructor(specializationServices: ISpecializationServices) {
    this.specializationServices = specializationServices;

    this.createSpecialization = this.createSpecialization.bind(this);
    this.fetchAllSpecialization = this.fetchAllSpecialization.bind(this);
    this.fetchByName = this.fetchByName.bind(this);
  }

  async createSpecialization(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { image, name, description } = req.body;
      if (!image || !name || !description) {
        res
          .status(400)
          .json({
            success: false,
            message: "All fields (image, name, description) are required.",
          });
        return;
      }

      const response = await this.specializationServices.createSpecialization({
        image,
        name,
        description,
      });

      res.status(201).json({
        success: true,
        message: response,
      });
    } catch (error) {
      console.error("Error while creating specialization:", error);
      next(error);
    }
  }

  async fetchAllSpecialization(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const specializations =
        await this.specializationServices.fetchAllSpecialization();
      res.status(200).json({ specializations });
    } catch (error: unknown) {
      next(error);
    }
  }

  async fetchByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { name } = req.params;
    try {
      const specialization = await this.specializationServices.fetchByName(
        name
      );
      res.status(200).json({ specialization });
    } catch (error: unknown) {
      next(error);
    }
  }
}

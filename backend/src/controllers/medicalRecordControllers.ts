import { NextFunction, Request, Response } from "express";
import { IMedicalRecordServices } from "../services/interfaces/IMedicalRecordServices";
import { IMedicalRecord } from "../models/medicalRecord/medicalRecordInterface";

export class MedicalRecordController {
  private medicalRecordService: IMedicalRecordServices;

  constructor(medicalRecordService: IMedicalRecordServices) {
    this.medicalRecordService = medicalRecordService;

    this.getRecordById = this.getRecordById.bind(this);
    this.getAllRecords = this.getAllRecords.bind(this);
    this.updateRecord = this.updateRecord.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.getUserRecordById = this.getUserRecordById.bind(this);
  }

  async getUserRecordById(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.client;
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;

      const response = await this.medicalRecordService.getUserRecordById(
        _id,
        skip,
        limit
      );
      res.status(200).json(response);
    } catch (error: unknown) {
      next(error);
    }
  }

  async getRecordById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const skip = parseInt(req.query.skip as string) || 0;
      const limit = parseInt(req.query.limit as string) || 5;

      const record = await this.medicalRecordService.getRecordById(
        id,
        skip,
        limit
      );

      if (!record) {
        res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }
      res.status(200).json({ success: true, record });
    } catch (error: unknown) {
      next(error);
    }
  }

  async getAllRecords(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const records = await this.medicalRecordService.getAllRecords();
      res.status(200).json({ success: true, records });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updateRecord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const data: Partial<IMedicalRecord> = req.body;
      const updatedRecord = await this.medicalRecordService.updateRecord(
        id,
        data
      );

      if (!updatedRecord) {
        res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }
      res.status(200).json({ success: true, record: updatedRecord });
    } catch (error: unknown) {
      next(error);
    }
  }

  async deleteRecord(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.medicalRecordService.deleteRecord(id);

      if (!deleted) {
        res
          .status(404)
          .json({ success: false, message: "Medical record not found" });
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Medical record deleted successfully",
        });
    } catch (error: unknown) {
      next(error);
    }
  }
}

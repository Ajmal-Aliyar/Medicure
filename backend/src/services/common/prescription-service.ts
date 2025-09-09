import { IPrescription } from "@/models";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import { IPrescriptionRepository } from "@/repositories";
import { Types } from "mongoose";
import { ForbiddenError, NotFoundError } from "@/errors";
import { IPrescriptionService } from "../interfaces";
import { PrescriptionMapper } from "@/mappers/prescription-mapper";
import { ViewPrescription } from "@/interfaces/common/Prescription";

@injectable()
export class PrescriptionService implements IPrescriptionService {
  constructor(
    @inject(TYPES.PrescriptionRepository)
    private readonly _prescriptionRepo: IPrescriptionRepository
  ) {}

  async getPrescription(
    id: string,
    role: string,
    prescriptionId: string
  ): Promise<IPrescription> {
    const filter = this.generateFilterQuery(id, role, prescriptionId)

    const prescription = await this._prescriptionRepo.findOne(filter);

    if (!prescription) {
      throw new NotFoundError("Prescription not found with provided details.");
    }

    return prescription;
  }

  async viewPrescriptionForDownload(
    id: string,
    role: string,
    prescriptionId: string
  ): Promise<ViewPrescription> {
    const filter = this.generateFilterQuery(id, role, prescriptionId)

    const prescription = await this._prescriptionRepo.getDetailsByIdForDownload(filter);
     if (!prescription) {
      throw new NotFoundError("Prescription not found with provided details.");
    }

    const mappedPrescription = PrescriptionMapper.mapToViewPrescription(prescription)
    return mappedPrescription
  }

  generateFilterQuery(id: string, role: string, prescriptionId: string): {
      _id: Types.ObjectId;
      doctorId?: Types.ObjectId;
      patientId?: Types.ObjectId;
    } {
    const filter: {
      _id: Types.ObjectId;
      doctorId?: Types.ObjectId;
      patientId?: Types.ObjectId;
    } = {
      _id: new Types.ObjectId(prescriptionId),
    };

    if (role === "doctor") {
      filter.doctorId = new Types.ObjectId(id);
    } else if (role === "patient") {
      filter.patientId = new Types.ObjectId(id);
    } else {
      throw new ForbiddenError("Unauthorized role.");
    }

    return filter
  }
}

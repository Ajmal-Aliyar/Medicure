import { IPrescription } from "@/models";
import { inject, injectable } from "inversify";
import { TYPES } from "@/di/types";
import {
  IPrescriptionRepository,
} from "@/repositories";
import { Types } from "mongoose";
import { ForbiddenError, NotFoundError } from "@/errors";
import { IPrescriptionService } from "../interfaces";

@injectable()
export class PrescriptionService implements IPrescriptionService {
  constructor(
    @inject(TYPES.PrescriptionRepository)
    private readonly prescriptionRepo: IPrescriptionRepository
  ) {}

  async getPrescription(
    id: string,
    role: string,
    prescriptionId: string
  ): Promise<IPrescription> {
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

    const prescription = await this.prescriptionRepo.findOne(filter);

    if (!prescription) {
      throw new NotFoundError("Prescription not found with provided details.");
    }

    return prescription;
  }
}

import { PrescriptionModel } from "@/models";
import type { IPrescription } from "@/models";
import { BaseRepository } from "../base";
import { IPrescriptionRepository } from "../interfaces";
import { PrescriptionFullDetails } from "@/interfaces/common/Prescription";
import { FilterQuery } from "mongoose";

export class PrescriptionRepository extends BaseRepository<IPrescription> implements IPrescriptionRepository {
  constructor() {
    super(PrescriptionModel);
  }

  async getDetailsByIdForDownload(filter: FilterQuery<IPrescription>): Promise<PrescriptionFullDetails | null> {
  const result = await this.model
    .findOne(filter)
    .populate({
      path: "doctorId",
      select: {
        "personal.fullName": 1,
        "personal.email": 1,
        "personal.mobile": 1,
        "personal.gender": 1,
        "personal.profileImage": 1,
        "professional.registrationNumber": 1,
        "professional.specialization": 1,
        "professional.headline": 1,
        "professional.yearsOfExperience": 1,
        "location": 1,
      },
    })
    .populate({
      path: "patientId",
      select: {
        "personal.fullName": 1,
        "personal.gender": 1,
        "personal.dob": 1,
        "personal.mobile": 1,
        "personal.email": 1,
        "personal.languageSpoken": 1,
        "personal.profileImage": 1,
        "contact.address": 1,
      },
    })
    .populate({
      path: "appointmentId",
      select: {
        appointmentDate: 1,
        appointmentTime: 1,
        mode: 1,
        status: 1,
      },
    })
    .lean()
    .exec();

  return result as PrescriptionFullDetails | null;
}
}

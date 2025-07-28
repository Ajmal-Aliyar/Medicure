import { IPrescription } from "@/models";
import { BaseRepository } from "../base";
import { PrescriptionFullDetails } from "@/interfaces/common/Prescription";
import { FilterQuery } from "mongoose";

export interface IPrescriptionRepository extends BaseRepository<IPrescription> {
    getDetailsByIdForDownload(filter: FilterQuery<IPrescription>): Promise<PrescriptionFullDetails | null>
}
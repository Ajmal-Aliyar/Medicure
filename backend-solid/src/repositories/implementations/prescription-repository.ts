import { IPrescription, PrescriptionModel } from "@/models";
import { BaseRepository } from "../base";
import { IPrescriptionRepository } from "../interfaces";

export class PrescriptionRepository extends BaseRepository<IPrescription> implements IPrescriptionRepository {
    constructor() {
        super(PrescriptionModel)
    }
}
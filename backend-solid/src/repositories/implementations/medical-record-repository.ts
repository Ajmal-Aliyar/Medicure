import { MedicalRecord } from "@/models";
import { BaseRepository } from "../base";
import { IMedicalRecordRepository } from "../interfaces";
import { IMedicalRecord } from "@/models";

export class MedicalRecordRepository
  extends BaseRepository<IMedicalRecord>
  implements IMedicalRecordRepository
{
  constructor() {
    super(MedicalRecord);
  }

  
}

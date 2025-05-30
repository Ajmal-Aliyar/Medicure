import { inject, injectable } from "inversify";
import { IDoctorService } from "../interfaces/i-doctor-service";
import { TYPES } from "@/di/types";
import { IDoctorRepository } from "@/repositories";
import { IMediaService } from "@/interfaces";

@injectable()
export class DoctorService implements IDoctorService {
  constructor(
    @inject(TYPES.DoctorRepository)
    private readonly doctorRepo: IDoctorRepository,
    @inject(TYPES.MediaService)
    private readonly MediaService: IMediaService
  ) {}

  async updateProfileImg(doctorId: string, imageUrl: string): Promise<void> {
    const existingDoctor = await this.doctorRepo.findById(doctorId);

    if (existingDoctor?.personal?.profileImage) {
      const deleteId = this.MediaService.extractPublicId(
        existingDoctor.personal?.profileImage
      );
      await this.MediaService.delete([deleteId]);
    }

    await this.doctorRepo.updateImage(doctorId, imageUrl);
  }
}

import { BadRequestError, NotFoundError } from "@/errors";
import { IDoctorRepository } from "@/repositories";
import { CLIENT_MESSAGES } from "@/constants";
import { IReviewStatus } from "@/interfaces";
import { IDoctor } from "@/models";

export const ensureDoctorExists = async (
  doctorId: string | null,
  doctorRepo: IDoctorRepository
): Promise<IDoctor> => {
  if (!doctorId) {
    throw new BadRequestError(CLIENT_MESSAGES.VALIDATION.ID_NOT_FOUND);
  }
  const doctor = await doctorRepo.findById(doctorId);
  if (!doctor) {
    throw new NotFoundError(CLIENT_MESSAGES.VALIDATION.USER_NOT_FOUND);
  }
  return doctor;
};


const validStatuses = ["applied", "approved", "rejected", "pending"] as const;
export const getValidDoctorReviewStatus = (
  status: string
): IReviewStatus => {
  if (!validStatuses.includes(status as any)) {
    throw new BadRequestError(`Invalid status: ${status}`);
  }
  return status as IReviewStatus;
};

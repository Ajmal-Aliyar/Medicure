import { CLIENT_MESSAGES } from "@/constants";
import { BadRequestError, NotFoundError } from "@/errors";
import { IPatient } from "@/models";
import { IPatientRepository } from "@/repositories";

export const ensurePatientExists = async (
  patientId: string | null,
  patientRepo: IPatientRepository
): Promise<IPatient> => {
  if (!patientId) {
    throw new BadRequestError(CLIENT_MESSAGES.VALIDATION.ID_NOT_FOUND);
  }
  const patient = await patientRepo.findById(patientId);
  if (!patient) {
    throw new NotFoundError(CLIENT_MESSAGES.VALIDATION.USER_NOT_FOUND);
  }
  return patient;
};
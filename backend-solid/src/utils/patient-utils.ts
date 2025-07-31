import { CLIENT_MESSAGES } from "@/constants";
import { BadRequestError, NotFoundError } from "@/errors";
import { IPatient } from "@/models";
import { IPatientRepository } from "@/repositories";
import { GetPatientOptions } from "@/interfaces";
import { FilterPatientQuery } from "@/validators";
import { FilterQuery } from "mongoose";

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



export function mapFilterQueryToPatientOptions(query: FilterPatientQuery): GetPatientOptions {
  const {
    query: searchQuery,
    accountStatus,
    sortField,
    sortOrder,
    createdAt
  } = query;

  const filters: GetPatientOptions["filters"] = {
    ...(searchQuery && { searchQuery }),
    ...(accountStatus && { accountStatus }),
    ...(createdAt && isValidDate(createdAt) && { createdAt }),
  };

  return {
    filters,
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
  };
}


export function transformPatientOptionsToMongoFilter(
  options: GetPatientOptions
): FilterQuery<IPatient> {
  const mongoFilter: FilterQuery<IPatient> = {};
  const { filters } = options;

  if (filters.searchQuery) {
    const regex = new RegExp(filters.searchQuery, "i");
    mongoFilter.$or = [
      { "personal.fullName": regex },
      { "personal.email": regex },
      { "personal.mobile": regex },
    ];
  }
  if (filters.accountStatus) {
    mongoFilter["status.isBlocked"] = filters.accountStatus === "blocked";
  }
  if (filters.createdAt && isValidDate(filters.createdAt)) {
    mongoFilter.createdAt = {
      $gte: new Date(filters.createdAt),
    };
  }

  return mongoFilter;
}


function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}
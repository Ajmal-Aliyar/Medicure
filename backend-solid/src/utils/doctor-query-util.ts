import { GetDoctorOptions } from "@/interfaces";
import { FilterDoctorQuery } from "@/validators";


export function mapFilterQueryToDoctorOptions(query: FilterDoctorQuery, isAdmin: boolean): GetDoctorOptions {
  const {
    query: searchQuery,
    language,
    profileStatus,
    accountStatus,
    specialization,
    experienceMin,
    experienceMax,
    ratingMin,
    ratingMax,
    sortField,
    sortOrder,
    createdAt
  } = query;

  const filters: GetDoctorOptions["filters"] = {
    ...(searchQuery && { searchQuery }),
    ...(language && { language: language.split(",").map((lang) => lang.trim()) }),
    ...(isAdmin && profileStatus && { profileStatus }),
    ...(specialization && { specialization }),
    ...(isAdmin && accountStatus && { accountStatus }),
    ...(experienceMin && !isNaN(Number(experienceMin)) && { experienceMin: Number(experienceMin) }),
    ...(experienceMax && !isNaN(Number(experienceMax)) && { experienceMax: Number(experienceMax) }),
    ...(ratingMin && !isNaN(Number(ratingMin)) && { ratingMin: Number(ratingMin) }),
    ...(ratingMax && !isNaN(Number(ratingMax)) && { ratingMax: Number(ratingMax) }),
    ...(createdAt && isValidDate(createdAt) && { createdAt }),
  };

  return {
    filters,
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
  };
}

function isValidDate(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}
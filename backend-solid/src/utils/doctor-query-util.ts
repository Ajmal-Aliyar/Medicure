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
  };

  return {
    filters,
    ...(sortField && { sortField }),
    ...(sortOrder && { sortOrder }),
  };
}

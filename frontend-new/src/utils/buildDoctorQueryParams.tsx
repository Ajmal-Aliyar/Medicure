import { formatDateToYMD } from "./formatDate";

interface BuildDoctorQueryParamsOptions {
  searchQuery?: string;
  language?: string[];
  specialization?: string | null;
  profileStatus?: string;
  accountStatus?: string;
  experienceRange?: { min?: string; max?: string };
  ratingRange?: { min?: string; max?: string };
  sortOption?: { field: string; order: "asc" | "desc" };
  createdAt?: Date
  page: number;
}

export function buildDoctorQueryParams(options: BuildDoctorQueryParamsOptions): URLSearchParams {
  const {
    searchQuery,
    language,
    specialization,
    profileStatus,
    accountStatus,
    experienceRange,
    ratingRange,
    sortOption,
    page,
    createdAt,
  } = options;
  
  const queryParams = new URLSearchParams();

  if (searchQuery) queryParams.append("query", searchQuery);
  if (language?.length) queryParams.append("language", language.join(","));
  if (specialization) queryParams.append("specialization", specialization.toLocaleLowerCase());
  if (profileStatus) queryParams.append("profileStatus", profileStatus);
  if (accountStatus) queryParams.append("accountStatus", accountStatus);
  if (experienceRange?.min) queryParams.append("experienceMin", experienceRange.min);
  if (experienceRange?.max) queryParams.append("experienceMax", experienceRange.max);
  if (ratingRange?.min) queryParams.append("ratingMin", ratingRange.min);
  if (ratingRange?.max) queryParams.append("ratingMax", ratingRange.max);
  if (sortOption) {
    queryParams.append("sortField", sortOption.field);
    queryParams.append("sortOrder", sortOption.order);
  }
  if(createdAt) queryParams.append("createdAt", formatDateToYMD(createdAt));

  queryParams.append("page", page.toString());

  return queryParams;
}

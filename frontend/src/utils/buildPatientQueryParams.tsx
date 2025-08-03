import { formatDateToYMD } from "./formatDate";

interface BuildPatientQueryParamsOptions {
  searchQuery?: string;
  accountStatus?: string;
  ratingRange?: { min?: string; max?: string };
  sortOption?: { field: string; order: "asc" | "desc" };
  createdAt?: Date
  page: number;
}

export function buildPatientQueryParams(options: BuildPatientQueryParamsOptions): URLSearchParams {
  const {
    searchQuery,
    ratingRange,
    sortOption,
    page,
    createdAt,
  } = options;
  
  const queryParams = new URLSearchParams();

  if (searchQuery) queryParams.append("query", searchQuery);
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

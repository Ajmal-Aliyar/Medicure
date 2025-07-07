export interface GetDoctorOptions {
  filters: {
    searchQuery?: string;
    language?: string[];
    specialization?: string;
    profileStatus?: string;
    accountStatus?: string;
    experienceMin?: number;
    experienceMax?: number;
    ratingMin?: number;
    ratingMax?: number;
  };
  sortField?: string;
  sortOrder?: "asc" | "desc";
}
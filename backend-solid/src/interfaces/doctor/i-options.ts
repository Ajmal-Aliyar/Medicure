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
    createdAt?: string;
  };
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface GetPatientOptions {
  filters: {
    searchQuery?: string;
    accountStatus?: string;
    createdAt?: string;
  };
  sortField?: string;
  sortOrder?: "asc" | "desc";
}
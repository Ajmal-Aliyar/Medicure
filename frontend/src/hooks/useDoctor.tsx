import { useEffect, useState } from "react";
import type { SortOption } from "@/components/ui/SortSelectGroup";
import { buildDoctorQueryParams } from "@/utils/buildDoctorQueryParams";
import type { FilterDoctorSummary } from "@/types/doctor";
import type { MetaType } from "@/types/common";
import { publicDoctorService } from "@/services/api/public/doctor";
import { useRole } from "./useRole";
import { adminDoctorService } from "@/services/api/admin/doctor";

interface Filters {
  searchQuery?: string;
  language?: string[];
  specialization?: string;
  profileStatus?: string;
  accountStatus?: string;
  experienceRange?: { min: string; max: string };
  ratingRange?: { min: string; max: string };
  sortOption?: SortOption | null;
  createdAt?: Date;
  page: number;
}

export const useDoctors = (filters: Filters) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ doctors: FilterDoctorSummary[], meta: MetaType} | null>(null);
  const [error, setError] = useState<unknown|null>(null);
  const role = useRole()
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = buildDoctorQueryParams({
          searchQuery: filters.searchQuery,
          language: filters.language,
          specialization: filters.specialization ?? undefined,
          profileStatus: filters.profileStatus,
          accountStatus: filters.accountStatus,
          experienceRange: filters.experienceRange,
          ratingRange: filters.ratingRange,
          sortOption: filters.sortOption ?? undefined,
          page: filters.page,
          createdAt: filters.createdAt
        });

        const {data, meta} = role === 'admin' ? await adminDoctorService.getDoctors(queryParams) : await publicDoctorService.getDoctors(queryParams) ;
        setData({ doctors: data, meta});
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [filters]);

  if (loading) {
    return { data: null, loading, error: null}
  }

  return { data, loading, error };
};

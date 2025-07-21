import { useMemo, useState } from "react";
import { Pagination } from "@/components/ui/Pagination";
import type { SortOption } from "@/components/ui/SortSelectGroup";
import { useDebounce, useDoctors } from "@/hooks";
import Loader from "@/components/ui/Loader";
import type { FilterDoctorSummary } from "@/types/doctor";
import { DoctorCard } from "@/components/domain/Cards";
import { FilterHeader } from "./FilterHeader";
import { DoctorFilter } from "./DoctorFilter";
import { DoctorSort } from "./DoctorSort";

interface Props {
    doctorId: string | null;
    setDoctorId: (id: string | null) => void
}


export const DoctorListPannel = ({ doctorId, setDoctorId }: Props) => {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [language, setLanguage] = useState<string[]>([]);
    const [profileStatus, setProfileStatus] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [sortOption, setSortOption] = useState<SortOption | null>(null);
    const [experienceRange, setExperienceRange] = useState({ min: "", max: "" });
    const [ratingRange, setRatingRange] = useState({ min: "", max: "" });
    const [specialization, setSpecialization] = useState<string | null>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    const filters = useMemo(() => ({
        searchQuery: debouncedSearchQuery,
        language,
        specialization,
        profileStatus,
        accountStatus,
        experienceRange,
        ratingRange,
        sortOption,
        page,
    }), [
        debouncedSearchQuery,
        language,
        specialization,
        profileStatus,
        accountStatus,
        experienceRange.min,
        experienceRange.max,
        ratingRange.min,
        ratingRange.max,
        sortOption?.field,
        sortOption?.order,
        page,
    ]);


    const { data, loading } = useDoctors(filters);
    return (
        <div className="w-full lg:w-[50%]  relative flex flex-col overflow-y-auto">
            <div className=" p-2 bg-surface shadow-md rounded-md sticky top-0 z-10">
                <FilterHeader
                    query={searchQuery}
                    onChangeQuery={setSearchQuery}
                />
                <DoctorFilter
                    language={language}
                    setLanguage={setLanguage}
                    specialization={specialization}
                    setSpecialization={setSpecialization}
                    profileStatus={profileStatus}
                    setProfileStatus={setProfileStatus}
                    accountStatus={accountStatus}
                    setAccountStatus={setAccountStatus}
                    experienceRange={experienceRange}
                    setExperienceRange={setExperienceRange}
                    ratingRange={ratingRange}
                    setRatingRange={setRatingRange}
                />

                <DoctorSort
                    value={sortOption}
                    onChange={setSortOption}
                />
                {data && <Pagination
                    currentPage={data?.meta?.page}
                    totalPages={data?.meta?.totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />}
            </div>

            {loading && <div className="flex w-full justify-center py-3 my-3"><Loader /></div>}
            {data && data.doctors.length === 0 && <div className="flex w-full justify-center py-3 my-3 text-muted-dark">No doctors found !</div>}

            <div className="w-full mt-3 flex flex-col gap-3 px-1">
                {data && data.doctors.map((doctor: FilterDoctorSummary, idx: number) => (
                    <DoctorCard key={doctor.id || idx} doctor={doctor} showMeta onView={setDoctorId} className={`${doctorId === doctor.id ? "outline-primary-light outline-2" : ""}`} />
                ))}
            </div>

        </div>
    )
}


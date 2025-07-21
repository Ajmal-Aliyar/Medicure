import { DoctorFilter, DoctorSort } from "@/pages/admin/Doctors/components"
import { useMemo, useState } from "react";
import InputWithIcon from "@/components/ui/InputWithIcon";
import { Loader, Search } from "lucide-react";
import type { SortOption } from "@/components/ui/SortSelectGroup";
import { useDebounce, useDoctors } from "@/hooks";
import type { FilterDoctorSummary } from "@/types/doctor";
import { DoctorCard } from "@/components/domain/Cards";
import { Pagination } from "@/components/ui/Pagination";
import { useNavigate } from "react-router-dom";

const FilterDoctor = () => {
    const [page, setPage] = useState(1);
    const [doctorId, setDoctorId] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState("");
    const [language, setLanguage] = useState<string[]>([]);
    const [profileStatus, setProfileStatus] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [experienceRange, setExperienceRange] = useState({ min: "", max: "" });
    const [ratingRange, setRatingRange] = useState({ min: "", max: "" });
    const [sortOption, setSortOption] = useState<SortOption | null>(null);

    const navigate = useNavigate()


    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const filters = useMemo(() => ({
        searchQuery: debouncedSearchQuery,
        language,
        profileStatus,
        accountStatus,
        experienceRange,
        ratingRange,
        sortOption,
        page,
    }), [
        debouncedSearchQuery,
        language,
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

    const onView = (doctorId: string) => {
        setDoctorId(doctorId)
        navigate(`/book-slots/${doctorId}`)
    }

    return (
        <>
            <div className="w-full relative flex justify-between items-center mt-14 gap-2">
                <p className="text-xl text-secondary font-medium whitespace-nowrap pr-20">Top Specialist</p>

                <div className="relative min-w-[43rem] h-9">
                    <div className="absolute left-0 top-0 px-2 rounded-md gap-3 bg-white shadow-md max-w-[25rem] z-10">
                        <DoctorFilter
                            language={language}
                            setLanguage={setLanguage}
                            profileStatus={profileStatus}
                            setProfileStatus={setProfileStatus}
                            accountStatus={accountStatus}
                            setAccountStatus={setAccountStatus}
                            experienceRange={experienceRange}
                            setExperienceRange={setExperienceRange}
                            ratingRange={ratingRange}
                            setRatingRange={setRatingRange}
                        />
                    </div>

                    <div className="absolute right-0 top-0 px-2 rounded-md gap-3 bg-white shadow-md max-w-[20rem] z-10">
                        <DoctorSort
                            value={sortOption}
                            onChange={setSortOption}
                        />
                    </div>

                </div>
                <InputWithIcon
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search Doctor..."
                    icon={<Search className="w-4 h-4" />}
                    className="max-w- w-full h-fit z-10 text-primary border-0 shadow-md bg-white"
                />
            </div>


            {loading && <div className="flex w-full justify-center py-3 my-3"><Loader /></div>}
            {data && data.doctors.length === 0 && <div className="flex w-full justify-center py-3 my-3 text-muted-dark">No doctors found !</div>}

            <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
                {data && data.doctors.map((doctor: FilterDoctorSummary, idx: number) => (
                    <DoctorCard
                        key={doctor.id || idx}
                        doctor={doctor}
                        onView={onView}
                        className={`${doctorId === doctor.id ? "outline-primary-light outline-2 " : ""} bg-white h-fit`} />
                ))}
            </div>

            {data && <Pagination
                className="mb-40"
                currentPage={data?.meta?.page}
                totalPages={data?.meta?.totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />}
        </>
    )
}

export default FilterDoctor
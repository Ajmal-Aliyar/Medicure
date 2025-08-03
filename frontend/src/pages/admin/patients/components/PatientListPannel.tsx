import { useEffect, useMemo, useState } from "react";
import { PatientCard } from "@/components/domain/Cards/PatientCard";
import type { PatientCardDetails } from "@/types/card";
import { FilterHeader } from "./FilterHeader";
import { Pagination } from "@/components/ui/Pagination";
import { adminPatientService } from "@/services/api/admin/patient";
import { useDebounce } from "@/hooks";
import { buildPatientQueryParams } from "@/utils/buildPatientQueryParams";

interface Props {
    patientID: string | null;
    setPatientID: (id: string | null) => void
}


export const PatientListPannel = ({ patientID, setPatientID }: Props) => {
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const [patients, setPatients] = useState<PatientCardDetails[]>([])
    const [searchQuery, setSearchQuery] = useState("");
    // const [language, setLanguage] = useState<string[]>([]);
    // const [profileStatus, setProfileStatus] = useState("");
    // const [accountStatus, setAccountStatus] = useState("");
    // const [sortOption, setSortOption] = useState<SortOption | null>(null);
    // const [experienceRange, setExperienceRange] = useState({ min: "", max: "" });
    // const [ratingRange, setRatingRange] = useState({ min: "", max: "" });
    // const [specialization, setSpecialization] = useState<string | null>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 1000);
    const filters = useMemo(() => ({
            searchQuery: debouncedSearchQuery,
            page,
        }), [
            debouncedSearchQuery,
            page,
        ]);
    
    
    useEffect(() => {
        const fetchPatients = async() => {
            const filteredQuery = buildPatientQueryParams(filters)
            const {data, meta} = await adminPatientService.getPatients(filteredQuery)
            setPatients(data)
            setPage(meta.page)
            setTotalPage(meta.totalPages)
        }
        fetchPatients()
    }, [filters])
    return (
        <div className="w-full lg:w-[50%]  relative flex flex-col overflow-y-auto">
            <div className=" p-2 bg-surface shadow-md rounded-md sticky top-0 z-10">
                 <FilterHeader
                    query={searchQuery}
                    onChangeQuery={setSearchQuery}
                />
               {/* <DoctorFilter
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
                /> */}

                {/* <DoctorSort
                    value={sortOption}
                    onChange={setSortOption}
                /> */}

                 <Pagination
                    currentPage={page}
                    totalPages={totalPage}
                    onPageChange={setPage}
                />
            </div>

            {/* {loading && <div className="flex w-full justify-center py-3 my-3"><Loader /></div>} */}
            {/* {data && data.doctors.length === 0 && <div className="flex w-full justify-center py-3 my-3 text-muted-dark">No doctors found !</div>} */}

            <div className="w-full mt-3 flex flex-col gap-3 px-1">
                {patients && patients.map((patient: PatientCardDetails, idx: number) => (
                    <PatientCard patient={patient} key={patient.id || idx} className={`${patientID === patient.id ? "outline-primary-light outline-2" : ""} rounded-md shadow`} 
                    onView={() => setPatientID(patient.id)} showMeta={true} />
                ))}
            </div>

        </div>
    )
}


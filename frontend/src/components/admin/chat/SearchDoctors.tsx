import { useState, useEffect, useCallback, FC } from "react";
import { fetchAllApprovedDoctorsApi } from "../../../sevices/admin/doctorRepository";
import { Plus, X } from "lucide-react";
import { IFetchAllApprovedDoctors } from "../../../types/doctor/verifyDetailsType";


interface SearchDoctorsProps {
    candidates: IFetchAllApprovedDoctors[];
    setCandidates: React.Dispatch<React.SetStateAction<IFetchAllApprovedDoctors[]>>;
}
const SearchDoctors:FC<SearchDoctorsProps> = ({ candidates, setCandidates}) => {
    const [query, setQuery] = useState<string>("");
    const [searchDoctors, setSearchDoctors] = useState<IFetchAllApprovedDoctors[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!query.trim()) {
            setSearchDoctors([]);
            return;
        }

        const fetchDoctors = async () => {
            setLoading(true);
            try {
                const response = await fetchAllApprovedDoctorsApi(0, 0, query);
                setSearchDoctors(response.data || []);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setSearchDoctors([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchDoctors, 300);
        return () => clearTimeout(debounceTimeout);
    }, [query]);

    const addDoctor = useCallback((doctor: IFetchAllApprovedDoctors) => {
        setCandidates((prev: IFetchAllApprovedDoctors[]) => (prev.some((d) => d._id === doctor._id) ? prev : [...prev, doctor]));
    }, []);

    // Remove doctor from selected list
    const removeDoctor = useCallback((doctorId: string) => {
        setCandidates((prev: IFetchAllApprovedDoctors[]) => prev.filter((d) => d._id !== doctorId));
    }, []);

    return (
        <div className="max-w-md mx-auto">
            <input
                type="text"
                placeholder="Search doctors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none"
            />

            {/* Scrollable List */}
            <div className="h-[300px] overflow-y-auto mt-3 space-y-3">
                {/* Selected Candidates */}
                {candidates.map((doctor: IFetchAllApprovedDoctors) => (
                    <div key={doctor.id} className="flex items-center gap-4 p-3 transition hover:bg-gray-50">
                        <img src={doctor.profileImage} className="w-12 h-12 rounded-full" alt="Doctor" />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{doctor.fullName}</p>
                            <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        </div>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition"
                            onClick={() => removeDoctor(doctor._id)}
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {/* Loading State */}
                {loading && <p className="text-gray-500 text-sm">Loading...</p>}

                {/* Search Results */}
                {!loading && searchDoctors.length > 0 && (
                    searchDoctors.map((doctor) => (
                        <div key={doctor._id} className="flex items-center gap-4 p-3 transition hover:bg-gray-50">
                            <img src={doctor.profileImage} className="w-12 h-12 rounded-full" alt="Doctor" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{doctor.fullName}</p>
                                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                            </div>
                            {!candidates.some((d:IFetchAllApprovedDoctors) => d._id === doctor._id) && (
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition"
                                    onClick={() => addDoctor(doctor)}
                                >
                                    <Plus size={16} />
                                </button>
                            )}
                        </div>
                    ))
                )}

                {!loading && query && searchDoctors.length === 0 && (
                    <p className="text-gray-500 text-sm">No doctors found</p>
                )}
            </div>
        </div>
    );
};

export default SearchDoctors;

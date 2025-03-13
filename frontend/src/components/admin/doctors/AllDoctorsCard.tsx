import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchAllApprovedDoctorsApi } from "../../../sevices/admin/doctorRepository";
import { useDispatch } from "react-redux";
import { setError } from "../../../store/slices/commonSlices/notificationSlice";
import { IFetchAllApprovedDoctors } from "../../../types/doctor/verifyDetailsType";
import { setSelectedId } from "../../../store/slices/adminSlices/manageDoctorSlice";

interface AllDoctorsCardProps {
    setOpenPage: Dispatch<SetStateAction<string>>;
}

const AllDoctorsCard: React.FC<AllDoctorsCardProps> = ({ setOpenPage }) => {
    const [doctors, setDoctors] = useState<IFetchAllApprovedDoctors[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const limit = 5;

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await fetchAllApprovedDoctorsApi(skip, limit, searchTerm);
                console.log(response)
                setShowMore(response.hasMore);
                setDoctors(response.data);
            } catch (error: any) {
                dispatch(setError(error.message));
            }
        };

        getDoctors();
    }, [skip, limit, searchTerm, dispatch]);

    const handleDoctorSelect = (_id: string) => {
        dispatch(setSelectedId({ _id }));
        setOpenPage("selectedDoctor");
    };

    const loadMore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    return (
        <div className='bg-[#fafafa] shadow-md rounded-md text-[#16423cc1]'>
            <div className="border-b-2 border-[#C4DAD2] flex justify-between p-2 relative">
                <p className='font-semibold p-2'>All Doctors</p>
                <input
                    className="px-4 max-w-[300px] border-2 w-full rounded-full outline-none pr-12 peer placeholder:text-[#C4DAD2] border-[#C4DAD2]"
                    placeholder="Search here"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className={`text-[25px] text-[#C4DAD2] absolute right-6 top-1/2 -translate-y-1/2 `}
                />
            </div>
            <div className="h-[516px] p-2 overflow-y-auto">
                {doctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        className="border flex p-2 rounded-md items-center relative mb-2 hover:border-[#3ab8a7a8] hover:border-2 border-[#C4DAD2] active:scale-95 duration-300"
                        onClick={() => handleDoctorSelect(doctor._id)}
                    >
                        <div className="w-14 h-14 bg-blue-200 rounded-full">
                            <img
                                src={doctor.profileImage}
                                alt={doctor.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                        </div>
                        <div className="ml-2">
                            <p className="font-semibold text-lg">{doctor.fullName}</p>
                            <p className="font-semibold text-sm text-[#6A9C89]">
                                {doctor.specialization}
                            </p>
                            <p className="text-xs text-neutral-500">
                                {doctor.rating} ({doctor.reviewCount} Reviews)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {showMore && (
                <button
                    onClick={loadMore}
                    className="p-1 flex justify-end w-full font-semibold px-3 text-neutral-400"
                >
                    Show More
                </button>
            )}
        </div>
    );
};

export default AllDoctorsCard;

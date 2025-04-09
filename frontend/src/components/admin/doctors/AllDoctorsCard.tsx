import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchAllApprovedDoctorsApi } from "../../../sevices/admin/doctorRepository";
import { useDispatch } from "react-redux";
import { setError } from "../../../store/slices/commonSlices/notificationSlice";
import { IFetchAllApprovedDoctors } from "../../../types/doctor/verifyDetailsType";
import { setSelectedId } from "../../../store/slices/adminSlices/manageDoctorSlice";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AllDoctorsCardProps {
    setOpenPage: Dispatch<SetStateAction<string>>;
}

const AllDoctorsCard: React.FC<AllDoctorsCardProps> = ({ setOpenPage }) => {
    const [doctors, setDoctors] = useState<IFetchAllApprovedDoctors[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const limit = 3;

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await fetchAllApprovedDoctorsApi(skip, limit, searchTerm);
                console.log(response)
                setTotal(response.total)
                setDoctors(response.data);
            } catch (error: unknown) {
                dispatch(setError(error));
            }
        };

        getDoctors();
    }, [skip, limit, searchTerm, dispatch]);

    const handleNext = () => {
        if (skip + limit < total) {
            setSkip(skip + limit);
        }
    };

    const handlePrev = () => {
        if (skip - limit >= 0) {
            setSkip(skip - limit);
        }
    };

    const handleDoctorSelect = (_id: string) => {
        dispatch(setSelectedId({ _id }));
        setOpenPage("selectedDoctor");
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
            <div className="h-[475px] p-2  overflow-y-auto">
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
            <div className=" text-white flex justify-center gap-1 py-2">
                <button onClick={handlePrev} disabled={skip === 0} className="px-2 py-1 bg-[#a0c0b4] h-fit rounded"
                    style={{ backgroundColor: '#a0c0b4' }}><ChevronLeft size={20} /></button>
                <div className=' max-w-[300px] gap-1 overflow-x-auto flex'>
                    {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setSkip(index * limit)}
                            className={`px-3  rounded `}
                            style={{ backgroundColor: skip / limit === index ? '#6A9C89' : '#C4DAD2', }}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                <button onClick={handleNext} disabled={skip + limit >= total} className="px-2 py-1 h-fit rounded"
                    style={{ backgroundColor: '#a0c0b4' }}><ChevronRight size={20} /></button>
            </div>
        </div>
    );
};

export default AllDoctorsCard;

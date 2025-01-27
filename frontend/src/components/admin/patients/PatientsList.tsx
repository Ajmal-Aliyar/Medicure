import { useEffect, useState } from "react";
import { IPatientProfile } from "../../../types/patient/profileType";
import { useDispatch } from "react-redux";
import { blockRole, fetchAllPatientsApi, unblockRole } from "../../../sevices/admin/patientRepository";
import { clearWarning, setError, setExtra, setSuccess, setWarning } from "../../../store/slices/commonSlices/notificationSlice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function PatientsList() {
    const [patients, setPatients] = useState<IPatientProfile[]>([]);
    const [showMore, setShowMore] = useState<boolean>(false)
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const limit = 5;

    useEffect(() => {
        const getDoctors = async () => {
            try {
                const response = await fetchAllPatientsApi(skip, limit);
                console.log(response)
                setShowMore(response.hasMore)
                setPatients((prevPatients) => [...prevPatients, ...response.data]);
            } catch (error: any) {
                dispatch(setError(error.message));
            }
        };

        getDoctors();

    }, [skip, limit, dispatch]);

    const handleAction = async (_id: string, isBlocked: boolean) => {
        const confirmFunction = async () => {
            try {
                const action = isBlocked ? unblockRole : blockRole;
                const response = await action(_id, 'patient');
    
                if (response?.message) {
                    dispatch(setSuccess(response.message));
                    window.location.reload()
                }
            } catch (error: any) {
                console.error("Error in handleAction:", error);
                const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
                dispatch(setError(errorMessage));
            } finally {
                dispatch(clearWarning());
            }
        };
    
        dispatch(setWarning(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this patient?`));
        dispatch(setExtra(confirmFunction));
    };
    
    const loadMore = () => {
        setSkip(prevSkip => prevSkip + limit);
    };


    return (
        <div className="w-full p-3 flex flex-col gap-2">
            <div className="grid grid-cols-12 bg-[#16423C] text-[#E9EFEC] h-14 py-2 rounded-md text-lg font-medium relative overflow-hidden shadow-md">
                <div className="w-2 bg-white h-full rounded-full ml-2"></div>
                
                <div className="col-span-2 flex items-center justify-center">Full name</div>
                <div className="col-span-3 flex items-center justify-center">Email</div>
                <div className="col-span-2 flex items-center justify-center">Phone</div>
                <div className="flex items-center justify-center">Consults</div>
                <div className="flex items-center justify-center">Reviews</div>
                <div className="col-span-2 flex items-center justify-center">Action</div>
            </div>
            <div className="flex flex-col gap-2 w-full h-[500px] overflow-y-auto">
    {patients.map((patient) => (
        <div
            className=" grid grid-cols-12 bg-[#fafafa] py-2 rounded-md shadow-md gap-4 hover:bg-white duration-300 text-lg"
            key={patient?._id || Math.random()}
        >
            <div className="flex items-center justify-center w-full">
                <img
                    src={patient?.profileImage || 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1737173758/sk7hria3ngkaujeywrjy.png'}
                    className="w-12 h-12 rounded-full"
                    alt={`${patient?.fullName || 'Patient'}'s profile`}
                />
            </div>
            <div className="col-span-2 flex items-center justify-center text-sm font-medium">
                {patient?.fullName || 'N/A'}
            </div>
            <div className="col-span-3 flex items-center justify-center text-sm font-medium">
                {patient?.email || 'N/A'}
            </div>
            <div className="col-span-2 flex items-center justify-center text-sm font-medium">
                {patient?.phone || 'N/A'}
            </div>
            <div className="flex items-center justify-center text-sm font-medium">
                {patient?.medicalHistory?.length || '0'}
            </div>
            <div className="flex items-center justify-center text-sm font-medium">0</div>
            <div className="col-span-2 flex items-center justify-center text-sm font-medium">
                <button
                    className="relative group border-none bg-transparent p-0 outline-none cursor-pointer uppercase text-base"
                    onClick={() => handleAction(patient?._id, patient?.isBlocked)}
                    aria-label={patient?.isBlocked ? "Unblock Patient" : "Block Patient"}
                >
                    <span
                        className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform transition ${
                            !patient.isBlocked ? "translate-y-1 duration-[250ms] group-active:translate-y-px" : "translate-y-px duration-[600ms]"
                        }`}
                    ></span>
                    <span
                        className={`absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l ${
                            !patient.isBlocked
                                ? "from-[hsl(127,33%,16%)] via-[hsl(130,33%,32%)] to-[hsl(140,33%,16%)]"
                                : "from-[hsl(0,33%,16%)] via-[hsl(3,33%,32%)] to-[hsl(0,33%,16%)]"
                        }`}
                    ></span>
                    <div
                        className={`relative flex items-center justify-between px-2 text-lg text-white rounded-md transform bg-gradient-to-r gap-3 transition ${
                            !patient.isBlocked ? "bg-green-700 duration-[600ms] -translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5" : "bg-red-700 duration-[250ms] -translate-y-0.5"
                        } brightness-100`}
                    >
                        <span className="select-none text-xs p-1">{!patient.isBlocked ? "Active" : "Blocked"}</span>
                    </div>
                </button>
            </div>
        </div>
    ))}
</div>




            {showMore && <button onClick={loadMore} className="p-1 flex justify-end w-full font-semibold px-3 text-neutral-400">Show More</button>}

        </div>
    )
}

export default PatientsList

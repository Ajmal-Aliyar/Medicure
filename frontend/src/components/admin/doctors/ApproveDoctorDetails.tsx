import { Dispatch, SetStateAction, useState } from "react"
import Animation from "./Animation";
import SelectedDoctorDetails from "./SelectedDoctorDetails";
import IdentityDetails from "./IdentityDetails";
import RegistrationDetails from "./RegistrationDetails";
import AppointmentDetails from "./AppointmentDetails";
import { useDispatch, useSelector } from "react-redux";
import { clearWarning, setError, setExtra, setSuccess, setWarning } from "../../../store/slices/commonSlices/notificationSlice";
import { approveDoctorApi, rejectDoctorApi } from "../../../sevices/admin/doctorRepository";
import { RootState } from "../../../store/store";

interface ApproveDoctorDetailsApi {
    setOpenPage: Dispatch<SetStateAction<string>>;
}

const ApproveDoctorDetails:React.FC<ApproveDoctorDetailsApi> = ({setOpenPage}) => {
    const doctorId = useSelector((state: RootState) => state.manageDoctor)
    const [currentPage, setCurrentPage] = useState(0);
    const dispatch = useDispatch()

    const handleReject = () => {
        const _id = doctorId.selectId
        const rejectFunction = async () => {
            try {
                const response = await rejectDoctorApi(_id)
                if (response?.message) {
                    dispatch(setSuccess(response.message));
                    setOpenPage('AllDoctors')
                }
            } catch (error: unknown) {
                const errorMessage =  'Something went wrong. Please try again later.';
                dispatch(setError(errorMessage));
            } finally {
                dispatch(clearWarning())
            }
        }
        dispatch(setWarning(`Are you sure you wish to decline this doctor's request for approval?`))
        dispatch(setExtra(rejectFunction))
    }

    const handleConfirm = () => {
        const _id = doctorId.selectId
        const confirmFunction = async () => {
            try {
                const response = await approveDoctorApi(_id)
                if (response?.message) {
                    dispatch(setSuccess(response.message));
                    setOpenPage('AllDoctors')
                }
            } catch (error: unknown) {
                console.log(error);
                const errorMessage =  'Something went wrong. Please try again later.';
                dispatch(setError(errorMessage));
            } finally {
                dispatch(clearWarning())
            }
        }
        dispatch(setWarning(`Are you sure you wish to approve this doctor's request approval?`))
        dispatch(setExtra(confirmFunction))
    }

    return (
        <div className="card w-[50%]  bg-[#fafafa] shadow-md rounded-md text-[#16423cc1] absolute -right-1/2 flex flex-1 flex-col ">
            <div className=" border-b-2 border-[#C4DAD2] flex justify-between p-2 relative">

                <p className='font-semibold p-2'>
                    {currentPage === 0 && 'Profile Details'}
                    {currentPage === 1 && 'Identity Details'}
                    {currentPage === 2 && 'Registration Details'}
                    {currentPage === 3 && 'Appointment Details'}
                </p>
            </div>
            <div className="w-full h-[574px] flex flex-col items-center justify-between overflow-y-auto">
                <div className={`w-full flex items-center justify-center p-2`}>
                    {currentPage === 0 && <SelectedDoctorDetails />}
                    {currentPage === 1 && <IdentityDetails />}
                    {currentPage === 2 && <RegistrationDetails />}
                    {currentPage === 3 && <AppointmentDetails />}
                </div>

            </div>
                <div className="mt-4 flex justify-between w-full p-2 border-t-2">
                    <div className="flex items-center space-x-2 ">
                        {[1, 2, 3, 4].map((_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 rounded-md ${index === currentPage ? "bg-[#6A9C89] text-white" : "bg-[#C4DAD2] text-gray-700"
                                    }`}
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <button className="px-2 py-1 bg-red-700 w-[100px] opacity-85 rounded-sm active:scale-95 text-neutral-100" onClick={handleReject}>reject</button>
                        <button className="px-2 py-1 bg-green-700 w-[100px] opacity-85 rounded-sm active:scale-95 text-neutral-100" onClick={handleConfirm}>approve</button>
                    </div>
                </div>
            <Animation />
        </div>
    )
}

export default ApproveDoctorDetails

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getDoctorDetailsApi } from '../../../sevices/admin/doctorRepository';
import { IDoctorType } from '../../../types/doctor/doctorType';
import { clearWarning, setError, setExtra, setSuccess, setWarning } from '../../../store/slices/commonSlices/notificationSlice';
import { blockRole, unblockRole } from '../../../sevices/admin/patientRepository';



const SelectedDoctorDetails: React.FC = () => {
    const doctorId = useSelector((state: RootState) => state.manageDoctor)
    const [doctor, setDoctor] = useState<Partial<IDoctorType>>({})
    const dispatch = useDispatch()

    useEffect(() => {
        const getDoctorData = async () => {
            const response = await getDoctorDetailsApi(doctorId.selectId)
            const details: IDoctorType = response.data
            setDoctor(details)
        }
        getDoctorData()
    }, [doctorId])



    const handleAction = async (_id: string, isBlocked: boolean) => {
        const confirmFunction = async () => {
            try {
                const action = isBlocked ? unblockRole : blockRole;
                const response = await action(_id, 'doctor');

                if (response?.message) {
                    dispatch(setSuccess(response.message));
                    setDoctor(prev => ({ ...prev, isBlocked: !isBlocked }));
                }
            } catch (error: unknown) {
                console.error("Error in handleAction:", error);
                const errorMessage = 'Something went wrong. Please try again later.';
                dispatch(setError(errorMessage));
            } finally {
                dispatch(clearWarning());
            }
        };

        dispatch(setWarning(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this patient?`));
        dispatch(setExtra(confirmFunction));
    };
    return (

        <div className="grid grid-cols-12 gap-2 w-full p-6 bg-[#fafafa] text-[#16423cc1]">

            <div className="col-span-12 flex justify-center gap-2">
                <div className="w-full max-w-[200px] aspect-square rounded-lg overflow-hidden shadow-lg">
                    <img src={doctor.profileImage} alt="Doctor Profile" className="w-full h-full object-cover" />
                </div>


                <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border w-full ">
                    <div className='border-b flex justify-between items-center'>
                        <h2 className="text-lg font-sans mb-4  pb-2">Professional Details</h2>
                        <button
                            className="relative group border-none bg-transparent p-0 outline-none cursor-pointer uppercase text-base"
                            onClick={() => handleAction(doctor._id as string, doctor?.isBlocked as boolean)}
                            aria-label={doctor?.isBlocked ? "Unblock doctor" : "Block doctor"}
                        >
                            <span
                                className={`absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform transition ${!doctor.isBlocked ? "translate-y-1 duration-[250ms] group-active:translate-y-px" : "translate-y-px duration-[600ms]"
                                    }`}
                            ></span>
                            <span
                                className={`absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l ${!doctor.isBlocked
                                        ? "from-[hsl(127,33%,16%)] via-[hsl(130,33%,32%)] to-[hsl(140,33%,16%)]"
                                        : "from-[hsl(0,33%,16%)] via-[hsl(3,33%,32%)] to-[hsl(0,33%,16%)]"
                                    }`}
                            ></span>
                            <div
                                className={`relative flex items-center justify-between px-2 text-lg text-white rounded-md transform bg-gradient-to-r gap-3 transition ${!doctor.isBlocked ? "bg-green-700 duration-[600ms] -translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5" : "bg-red-700 duration-[250ms] -translate-y-0.5"
                                    } brightness-100`}
                            >
                                <span className="select-none text-xs p-1">{!doctor.isBlocked ? "Active" : "Blocked"}</span>
                            </div>
                        </button>

                    </div>
                    <div className="grid grid-cols-4 gap-y-2 text-gray-600  text-sm">
                        <p className="font-medium">Full Name</p>
                        <p className="col-span-3 font-sans">: {doctor.fullName}</p>
                        <p className="font-medium">Email</p>
                        <p className="col-span-3 font-sans ">: {doctor.email}</p>
                        <p className="font-medium">Phone</p>
                        <p className="col-span-3 font-sans">: {doctor.phone}</p>
                        <p className="font-medium">Language</p>
                        <p className="col-span-3 font-sans">: {doctor.languageSpoken}</p>
                    </div>
                </div>

            </div>
            <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border">
                <h2 className="text-lg font-sans mb-4 border-b pb-2">Profile Details</h2>
                <div className="grid grid-cols-4 gap-y-2 text-gray-600 text-sm">
                    <p className="font-medium">Headline</p>
                    <p className="col-span-3 font-sans">: {doctor.headline}</p>
                    <p className="font-medium">Category</p>
                    <p className="col-span-3 font-sans">: {doctor.specialization}</p>
                    <p className="font-medium">Fees</p>
                    <p className="col-span-3 font-sans">: {doctor.fees} rs</p>
                </div>
            </div>



            <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border">
                <h3 className="text-lg font-sans mb-4 border-b pb-2   ">Address</h3>
                <div className="grid grid-cols-4 gap-y-3 mt-2 text-gray-600 text-sm">
                    <p className="font-medium">Line</p>
                    <p className="col-span-3">: {doctor.address?.addressLine}</p>
                    <p className="font-medium">Street</p>
                    <p className="col-span-3">: {doctor.address?.streetAddress}</p>
                    <p className="font-medium">City</p>
                    <p className="col-span-3">: {doctor.address?.city}</p>
                    <p className="font-medium">State</p>
                    <p className="col-span-3">: {doctor.address?.state}</p>
                    <p className="font-medium">Country</p>
                    <p className="col-span-3">: {doctor.address?.country}</p>
                    <p className="font-medium">Pincode</p>
                    <p className="col-span-3">: {doctor.address?.pincode}</p>
                </div>
            </div>

            <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border">
                <h2 className="text-lg font-sans mb-4 border-b pb-2">About</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.about}</p>
            </div>
        </div>


    )
}

export default SelectedDoctorDetails

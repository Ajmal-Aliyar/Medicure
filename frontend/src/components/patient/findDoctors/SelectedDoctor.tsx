import React, { useEffect, useState } from 'react'
import { IDoctorSotDetails, IFetchTopDoctors } from '../../../types/patient/findDoctors'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { fetchSlotDetailsApi } from '../../../sevices/patient/findDoctors'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { clearWarning, setError, setExtra, setLoading, setWarning } from '../../../store/slices/commonSlices/notificationSlice'
import { createCheckoutSessionApi } from '../../../sevices/payment/payment'
import { convertTimeStringToDate, convertTo12HourFormat } from '../../../utils/timeStructure'
import { fetchAppointmentDetailsApi } from '../../../sevices/appointments/fetchAppointments'
import { useNavigate } from 'react-router-dom'

interface SelectedDoctorProps {
    doctor: IFetchTopDoctors
}

const SelectedDoctor: React.FC<SelectedDoctorProps> = ({ doctor }) => {
    const [slots, setSlots] = useState<IDoctorSotDetails[]>([])
    const [selectedSlot, setSelectedSlot] = useState<IDoctorSotDetails | null>(null)
    const navigate = useNavigate()

    const user = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSlotDetails = async () => {
            const { slots } = await fetchSlotDetailsApi(doctor._id)
            console.log(slots)
            setSlots(slots)
        }

        setSelectedSlot(null)
        fetchSlotDetails()
    }, [doctor])

    const doesAppointmentExist = async () => {
        try {
            if (!user._id) return navigate('/auth')
            const data = await fetchAppointmentDetailsApi('pending', 0, Infinity);

            const hasScheduledAppointment = data.appointments.some(item => item.status === 'Scheduled');

            if (hasScheduledAppointment) {
                dispatch(setWarning('You already have a pending appointment. Are you sure you want to take another one?'));
                dispatch(setExtra(handleAppointment));
            } else {
                handleAppointment()
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(setError(error.message));
            } else {
                dispatch(setError('An unknown error occurred'));
            }
        }
    };

    const handleAppointment = async () => {
        try {
            dispatch(setLoading(true));
            dispatch(clearWarning())
            if (user.role === 'user' && user.isAuthenticated && selectedSlot) {
                const response = await createCheckoutSessionApi({
                    doctorName: doctor.fullName,
                    specialization: doctor.specialization,
                    startTime: convertTo12HourFormat(selectedSlot.startTime),
                    endTime: convertTo12HourFormat(selectedSlot.endTime),
                    duration: selectedSlot.avgConsultTime,
                    fees: doctor.fees,
                    doctorId: doctor._id,
                    patientId: user._id,
                    slotId: selectedSlot._id || '',
                    appointmentDate: ''
                });

                const { sessionUrl } = response;

                if (sessionUrl) {
                    window.location.href = sessionUrl;
                } else {
                    dispatch(setError('Unable to process payment. Please try again.'));
                }
            } else {
                dispatch(setError('You need to log in to book an appointment.'));
            }
        } catch (error: any) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useGSAP(() => {
        gsap.from('.xcard', {
            x: 200,
            opacity: 0,
            duration: 1,
        })
    })
    return (
        <div className='xcard p-2 bg-[#f8fbfb] rounded-md shadow-md h-full relative flex flex-col'>
            <div
                className={`
                        duration-300 p-2 rounded-md relative mb-2 w-full`}
            >

                <div className='flex flex-wrap gap-2 md:gap-4 '>
                    <div className='max-w-[150px] '>
                        <img src={doctor.profileImage} className='rounded-full' alt="" />
                    </div>
                    <div className='grid grid-cols-3 gap-x-4 text-sm font-medium '>
                        <p className='col-span-3 font-bold text-[#0c0b3eb5] text-xl'>{doctor.fullName}</p>
                        <p className='col-span-3 text-md font-medium text-[#51aff6ce]'>{doctor.specialization}</p>
                        <p>Language</p>
                        <p className='col-span-2 flex'>{`: ${doctor.languageSpoken}`}</p>
                        <p>Experience</p>
                        <p className='col-span-2'>{`: ${doctor.yearsOfExperience} year`}</p>
                        <p>Rating</p>
                        <p className='col-span-2'>{`: ${doctor.rating}% (${doctor.reviewCount} reviews)`}</p>
                    </div>
                </div>
            </div>
            <div className='w-full mt-5'>
                <p className='text-[#0c0b3eb5] font-semibold'>Available Slots</p>
                <div className='flex flex-wrap gap-4 mt-3'>
                    {slots.map((slot, index) => (

                        <div
                            key={index}
                            className={`p-4 bg-white border border-gray-300 rounded-lg min-w-[200px]   relative
        ${selectedSlot && selectedSlot._id === slot._id ? 'outline outline-[#51aff6ce]' : ''} 
        ${((slot.slotLimit <= slot.bookedSlot) || (convertTimeStringToDate(slot.endTime).getTime() < Date.now() + (10 * 60 * 1000))) ? 'pointer-events-none ' : 'shadow-md'}`}
                            onClick={() => (slot.slotLimit > slot.bookedSlot && convertTimeStringToDate(slot.endTime).getTime() > Date.now() + (10 * 60 * 1000)) && setSelectedSlot(slot)}
                        >
                            <div className={`w-full h-full absolute bg-[#36363642]  left-0 top-0 rounded-md  justify-center items-center text-red-700 font-semibold backdrop-blur-sm
                                ${((slot.slotLimit <= slot.bookedSlot) || (convertTimeStringToDate(slot.endTime).getTime() < Date.now() + (10 * 60 * 1000))) ? 'pointer-events-none flex' : 'hidden'}`}><p className='bg-white px-1'>not available</p></div>
                            <div className='mb-2 flex gap-2'>
                                <p className='font-semibold text-[#0c0b3eb5]'>Start Time:</p>
                                <p>{convertTo12HourFormat(slot.startTime)}</p>
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <p className='font-semibold text-[#0c0b3eb5]'>End Time:</p>
                                <p>{convertTo12HourFormat(slot.endTime)}</p>
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <p className='font-semibold text-[#0c0b3eb5]'>Duration:</p>
                                <p>{slot.avgConsultTime} min</p>
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <p className='font-semibold text-[#0c0b3eb5]'>Slot Limit:</p>
                                <p>{slot.slotLimit}</p>
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <p className='font-semibold text-[#0c0b3eb5]'>Booked Slots:</p>
                                <p>{slot.bookedSlot}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            {selectedSlot && (
                <div className='h-full flex flex-wrap justify-between items-end pt-4'>
                    <p className='text-gray-700 mt-4 max-w-[500px]'>
                        <span className='font-semibold text-[#0c0b3eb5]'>* You have selected the slot between </span>
                        <span className='font-semibold '>
                            {convertTo12HourFormat(selectedSlot.startTime)} and {convertTo12HourFormat(selectedSlot.endTime)}.
                        </span>
                        <span className='font-semibold text-[#0c0b3eb5]'>
                            {' '}The consultation duration is {selectedSlot.avgConsultTime} minutes.
                        </span>
                    </p>

                    <div className='px-2 bg-[#51aff6ce]  text-white rounded-md font-semibold text-sm py-1 cursor-pointer active:scale-95 ' onClick={doesAppointmentExist}>take appointment</div>
                </div>
            )}


        </div>
    )
}

export default SelectedDoctor

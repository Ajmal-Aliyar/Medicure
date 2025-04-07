import { FC, useEffect, useState } from "react"
import { IFetchAppointmentResponse } from "../../../../types/appointment/fetchAppointments"
import { convertTo12HourFormat } from "../../../../utils/timeStructure"
import FeedbackModal from "./FeedbackModal";
import { fetchAppointmentDetailsApi } from "../../../../sevices/appointments/fetchAppointments";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppointmentsListProps {
    page: string;
}
const AppointmentsList: FC<AppointmentsListProps> = ({ page }) => {
    const [feedback, setFeedback] = useState<{ appointmentId: string, doctorId: string, open: boolean}>({appointmentId: '', doctorId: '', open: false})
    const [skip, setSkip] = useState<number>(0);
    const [limit] = useState<number>(5);
    const [total, setTotal] = useState<number>(0);
    const navigate = useNavigate()



    const [totalAppointments, setTotalAppointments] = useState<IFetchAppointmentResponse[] | null>(null)

    useEffect(() => {
        const fetchUserAppointmentDetails = async () => {
            const data = await fetchAppointmentDetailsApi(page, skip, limit)
            console.log(data);
            
            setTotalAppointments(data.appointments)
            setTotal(data.total)
        }

        fetchUserAppointmentDetails()
    }, [page, skip])

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

    return (
        <>
            <div className="h-[440px] overflow-hidden p-1">
                {totalAppointments && totalAppointments.map((appointment) => (
                    <div key={appointment._id} className="max-w-[600px] mb-2 outline outline-gray-200 p-2 rounded-md flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <img src={appointment.doctorDetails.profileImage} className="w-16 rounded-full overflow-hidden" alt="" />
                            <div>
                                <p className="text-md text-[#2f3c62d8] font-medium ">{appointment.doctorDetails.fullName}</p>
                                <p className="text-md text-[#51aff6] font-medium ">{appointment.doctorDetails.specialization}</p>
                            </div>
                        </div>

                        <div className={`flex items-center gap-1 outline h-fit px-2 rounded-md outline-[#51aff6] relative ${page === 'pending' && 'mt-3'}`}>
                            {page === 'pending' && <p className="absolute -top-6 left-[50%] -translate-x-[50%] text-[#51aff6]">Today</p>}
                            <p className="text-sm text-gray-400 font-semibold">{convertTo12HourFormat(appointment.slotDetails.startTime)}</p>
                            <p className="text-gray-400">-</p>
                            <p className="text-sm text-gray-400 font-semibold">{convertTo12HourFormat(appointment.slotDetails.endTime)}</p>
                        </div>
                        {  page === 'history' ?
                           !appointment?.feedbackDetails ? <div className="text-center text-sm text-blue-300 opacity-80 hover:opacity-100 hover:text-blue-400 duration-300 active:scale-95 px-3 font-semibold cursor-pointer underline"
                                onClick={() => setFeedback({ appointmentId: appointment._id, doctorId: appointment.doctorId, open: true})}>
                                feedback
                            </div> : <div className="text-center text-sm text-blue-300 opacity-80 hover:opacity-100 hover:text-blue-400 duration-300 active:scale-95 px-3 font-semibold cursor-pointer underline"
                            onClick={() => navigate('/drive/feedbacks')}>
                                view
                            </div> :
                            <div className="text-center text-sm text-red-400 px-3 font-semibold" >
                                waiting...
                            </div>
                        }

                    </div>
                ))}
                {totalAppointments && totalAppointments.length <= 0 && <p className="text-sm text-gray-400">No appointments !</p>}
                {feedback.open && <FeedbackModal feedback={feedback} setFeedback={setFeedback} />}
            </div>
            <div className="flex justify-center mt-4 gap-1 text-white">
                <button onClick={handlePrev} disabled={skip === 0} className="px-2 py-1 bg-[#51aff666] rounded"><ChevronLeft /></button>
                {Array.from({ length: Math.ceil(total / limit) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setSkip(index * limit)}
                        className={`px-3 py-1 rounded ${skip / limit === index ? 'bg-[#51aff6ce] text-white' : 'bg-[#51aff630]'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button onClick={handleNext} disabled={skip + limit >= total} className="px-2 py-1 bg-[#51aff666] rounded"><ChevronRight /></button>
            </div>

        </>
    )
}

export default AppointmentsList

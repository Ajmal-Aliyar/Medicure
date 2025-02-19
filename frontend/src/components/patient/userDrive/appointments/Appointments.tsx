import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setError, setSuccess } from "../../../../store/slices/commonSlices/notificationSlice";
import { useEffect, useState } from "react";
import { fetchAppointmentDetailsApi } from "../../../../sevices/appointments/fetchAppointments";
import { IFetchAppointmentResponse } from "../../../../types/appointment/fetchAppointments";
import { convertTo12HourFormat } from "../../../../utils/timeStructure";
import { connectWithSocketIOServer } from "../../../../utils/wss";
import { setRoomId } from "../../../../store/slices/commonSlices/videoConsultSlice";
import FeedbackModal from "./FeedbackModal";


const Appointments = () => {
    const [pendingAppointments, setPendingAppointments] = useState<IFetchAppointmentResponse[]>([])
    const [historyAppointments, setHistoryAppointments] = useState<IFetchAppointmentResponse[]>([])
    const [feedback, setFeedback] = useState<string>('')
    const location = useLocation();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const session = queryParams.get('session_id')

    const dispatch = useDispatch()

    if (session) {
        setTimeout(() => {
            dispatch(setSuccess('Booked appointment successfully.'))
        }, 500)
    }


    useEffect(() => {
        const fetchUserAppointmentDetails = async () => {
            try {
                const data = await fetchAppointmentDetailsApi()
                const pending: IFetchAppointmentResponse[] = []
                const history: IFetchAppointmentResponse[] = []
                console.log(data)

                for (let appointment of data.userAppointmentsList) {
                    if (appointment.status === 'scheduled') {
                        pending.push(appointment)
                    } else {
                        history.push(appointment)
                    }
                }
                pending.sort((a, b) => {
                    const timeA = a.slotDetails.startTime.split(":").map(Number)
                    const timeB = b.slotDetails.startTime.split(":").map(Number)
                    return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1])
                })

                setPendingAppointments(pending)
                setHistoryAppointments(history)
                
            } catch (error: any) {
                dispatch(setError(error.message))
            }
        }

        fetchUserAppointmentDetails()
        connectWithSocketIOServer()
    }, [])



    const createRoomHandler = (roomId: string, appointmentId: string, slotId: string) => {
        dispatch(setRoomId(roomId))

        navigate(`/consult/meeting/${roomId}?appointment=${appointmentId}&slot=${slotId}`)
    }


    return (
        <div className="p-2 w-full flex flex-col gap-4 h-[560px] overflow-auto">
            {feedback && <FeedbackModal _id={feedback} setFeedback={setFeedback}/>}
            <div className="pr-2">
                <div className="">
                    <p className="text-lg text-[#2f3c62d8] font-medium mb-2">Pending</p>
                    {pendingAppointments.map((appointment) => (
                        <div key={appointment._id} className="max-w-[600px] mb-2 bg-[#51aff62d] p-2 rounded-md flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <img src={appointment.doctorDetails.profileImage} className="w-20 rounded-full overflow-hidden" alt="" />
                                <div>
                                    <p className="text-md text-[#2f3c62d8] font-medium ">{appointment.doctorDetails.fullName}</p>
                                    <p className="text-md text-[#51aff6] font-medium ">{appointment.doctorDetails.specialization}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 outline h-fit px-2 rounded-md outline-[#51aff6] relative">
                                <p className="absolute -top-6 left-[50%] -translate-x-[50%] text-[#51aff6]">Today</p>
                                <p className="text-sm text-gray-400 font-semibold">{convertTo12HourFormat(appointment.slotDetails.startTime)}</p>
                                <p className="text-[#51aff6]">-</p>
                                <p className="text-sm text-gray-400 font-semibold">{convertTo12HourFormat(appointment.slotDetails.endTime)}</p>
                            </div>
                            <div className="text-center text-sm text-red-400 px-3 font-semibold" onClick={() => createRoomHandler(appointment.roomId, appointment._id, appointment.slotId)}>
                                waiting...
                            </div>
                        </div>
                    ))}
                    {pendingAppointments.length <= 0 && <p className="text-sm text-gray-400">No pending appointments !</p>}
                </div>

                <div className="">
                    <p className="text-lg text-[#2f3c62d8] font-medium mb-2">History</p>
                    {historyAppointments.map((appointment) => (
                        <div key={appointment._id} className="max-w-[600px] mb-2 bg-gray-200 p-2 rounded-md flex justify-between items-center">
                            <div className="flex gap-4 items-center">
                                <img src={appointment.doctorDetails.profileImage} className="w-20 rounded-full overflow-hidden" alt="" />
                                <div>
                                    <p className="text-md text-[#2f3c62d8] font-medium ">{appointment.doctorDetails.fullName}</p>
                                    <p className="text-md text-[#51aff6] font-medium ">{appointment.doctorDetails.specialization}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 outline h-fit px-2 rounded-md outline-[#7879795f] relative">
                                <p className="text-sm text-gray-400 font-semibold">{convertTo12HourFormat(appointment.slotDetails.startTime)}</p>
                                <p className="text-[#787979ad]">-</p>
                                <p className="text-sm text-gray-400 font-semibold">{convertTo12HourFormat(appointment.slotDetails.endTime)}</p>
                            </div>
                            <div className="text-center text-sm text-blue-300 opacity-80 hover:opacity-100 hover:text-blue-400 duration-300 active:scale-95 px-3 font-semibold cursor-pointer underline"
                            onClick={() => setFeedback(appointment.doctorId)}>
                                give feedback
                            </div>
                        </div>
                    ))}
                    {historyAppointments.length <= 0 && <p className="text-sm text-gray-400">No appointments yet !</p>}
                </div>
            </div>
        </div>

    )
}

export default Appointments

import type { IAppointmentCard } from "@/types/appointment";
import type { IRole } from "@/types/auth";
import { formatDateToYMD, formatTimeTo12Hour, isToday } from "@/utils/formatDate";
import MiniUserCard from "./MiniUserCard";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setConsultationData } from "@/slices/consultationSlice";
import { setAppointment, setFeedback, setPrescription } from "@/slices/globalSlice";
import { SquareArrowOutUpRight } from "lucide-react";

interface AppointmentCardProps {
    appointment: IAppointmentCard;
    role: IRole;
    className?: string;
    isDashboard?: boolean;
}


const AppointmentCard = ({
    appointment,
    role,
    className = "",
    isDashboard = false
}: AppointmentCardProps) => {
    const showBothUsers = role === "admin";

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleJoinMeeting = () => {
        if (appointment.status === "scheduled") {
            dispatch(setConsultationData({
                doctorId: appointment.doctor.id,
                patientId: appointment.patient.id,
                roomId: appointment.roomId,
                appointmentId: appointment.id
            }))
            navigate(`/consultation/${appointment.roomId}`);
        }
    };

    return (
        <div
            key={appointment.id}
            className={`max-w-2xl w-full p-4 border border-gray-200 flex flex-col gap-3 md:flex-row md:justify-between md:items-center relative ${className}`}
        >

            <SquareArrowOutUpRight
                className="absolute right-0 top-0 p-1 cursor-pointer text-secondary"
                onClick={() => dispatch(setAppointment(appointment.id))} />
            {!isDashboard && <div className="flex flex-col gap-2">
                {role !== "doctor" &&
                    <MiniUserCard showBothUsers={showBothUsers} type={appointment.appointmentType} user={appointment.doctor} role='doctor' />}

                {role !== "patient" &&
                    <MiniUserCard showBothUsers={showBothUsers} type={appointment.appointmentType} user={appointment.patient} role="patient" />}
            </div>}
            <div className={`flex flex-col items-start text-sm text-gray-600 md:items-center p-2 rounded-md ${appointment.appointmentType === "emergency" ? "bg-red-400/30" : "bg-primary-light/30"}`}>
                <p className="text-sm text-gray-500 font-medium">
                    {formatDateToYMD(appointment.appointmentDate)}
                </p>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-md mt-1 ${appointment.appointmentType === "emergency" ? "bg-red-100" : "bg-blue-50"}`}>
                    <p className="text-sm font-medium text-gray-700">
                        {formatTimeTo12Hour(appointment.startTime)}
                    </p>
                    <span className="text-gray-400">-</span>
                    <p className="text-sm font-medium text-gray-700">
                        {formatTimeTo12Hour(appointment.endTime)}
                    </p>
                </div>
                {showBothUsers && <p className="text-xs text-gray-400 mt-1">
                    Type: <span className="capitalize">{appointment.appointmentType}</span>
                </p>}
                {appointment.status === "scheduled" &&
                    <p className={`text-xs  mt-1 ${appointment.appointmentType === "emergency" ? "text-red-500/80" : "text-primary-dark"}`}>{isToday(appointment.appointmentDate.toString()) ? "Scheduled for Today" : `Scheduled for ${formatDateToYMD(appointment.appointmentDate).split('-')[2]}`}</p>}

            </div>

            <div className="flex flex-col items-center gap-2">
                <span
                    className={`w-full text-xs px-3 py-1 rounded-full font-semibold capitalize ${appointment.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : appointment.status === "cancelled"
                            ? "bg-red-100 text-red-600"
                            : appointment.status === "scheduled"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                >
                    {appointment.status}
                </span>
                {role === 'doctor' && appointment.status === "scheduled" && isToday(appointment.appointmentDate.toString()) && <Button className="px-3 mt-1" onClick={handleJoinMeeting}>Join</Button>}

                {appointment.status === "completed" && (
                    <>

                        {(appointment.feedbackId || role === "patient") && <Button
                            variant={ appointment.feedbackId ? "primary" : "outline"}
                            onClick={() => dispatch(setFeedback({ appointmentId: appointment.id, feedbackId: appointment.feedbackId }))}
                            className={`w-full px-1`}
                        >
                            Feedback
                        </Button>}
                         {(appointment.prescriptionId || role === "doctor") && <Button
                            variant={ appointment.prescriptionId ? "primary" : "outline"}
                            onClick={() => {
                                dispatch(setConsultationData({ appointmentId: appointment.id, doctorId: appointment.doctor.id, patientId: appointment.patient.id, roomId: appointment.roomId}))
                                dispatch(setPrescription({ prescriptionId: appointment.prescriptionId, isOpen: true }))
                            }}
                            className=" px-2"
                        >
                            Prescription
                        </Button>}
                    </>
                )}


            </div>
        </div>
    );
};

export default AppointmentCard;

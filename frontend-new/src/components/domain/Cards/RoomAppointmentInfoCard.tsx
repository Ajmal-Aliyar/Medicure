import { setAppointment } from "@/slices/globalSlice";
import type { AppointmentDetailsPopulated } from "@/types/appointment";
import { formatDateToLong, formatTimeTo12Hour } from "@/utils/formatDate";
import { ClipboardCopy, Calendar, Clock, LinkIcon, Receipt, SquareArrowOutUpRight } from "lucide-react";
import { useDispatch } from "react-redux";



const RoomAppointmentInfoCard = ({ appointment }: {appointment: AppointmentDetailsPopulated}) => {
  const {
    roomId,
    appointmentType,
    transactionId,
    createdAt,
    startTime,
    endTime,
    appointmentDate,
  } = appointment;
    const dispatch = useDispatch()

  return (
    <div className="bg-surface shadow-md border border-gray-200 rounded-lg p-4 max-w-xl w-full flex flex-col gap-4 relative">

            <SquareArrowOutUpRight 
            className="absolute right-0 top-0 p-1 cursor-pointer text-secondary"
            onClick={() => dispatch(setAppointment(appointment.id))} />
      <div className="flex flex-col items-center justify-between">
        <h3 className="text-lg font-semibold text-secondary capitalize">
          {appointmentType} 
        </h3>
        <span className="text-xs text-muted">
          Booked on {formatDateToLong(createdAt.toString())}
        </span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Calendar size={16} className="text-primary" />
        <span>{formatDateToLong(appointmentDate)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock size={16} className="text-primary" />
        <span>{formatTimeTo12Hour(startTime)} - {formatTimeTo12Hour(endTime)}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Receipt size={16} className="text-primary" />
        <span className="truncate">Transaction ID: {transactionId}</span>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <LinkIcon size={16} className="text-primary" />
        <span className="truncate">Room ID: {roomId}</span>
        <button
          onClick={() => navigator.clipboard.writeText(roomId)}
          className="ml-2 text-blue-500 hover:underline text-xs"
        >
          <ClipboardCopy size={14} />
        </button>
      </div>
    </div>
  );
};

export default RoomAppointmentInfoCard;

import { useEffect, useState } from "react";
import { CalendarCheck, Clock, CheckCircle, ChevronLeft, ChevronRight, Hourglass, XCircle, Undo2 } from "lucide-react";
import { fetchAllAppointmentDetailsApi } from "../../sevices/appointments/fetchAppointments";
import { IFetchAllAppointmentResponse } from "../../types/appointment/fetchAppointments";
import { useDispatch } from "react-redux";
import { setError, setLoading } from "../../store/slices/commonSlices/notificationSlice";
import { refundApi } from "../../sevices/payment/payment";


const isExpired = (createdAt: string) => {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 2);
    return new Date(createdAt) < twentyFourHoursAgo;
};

const Appointments = () => {
    const [appointments, setAppointments] = useState<IFetchAllAppointmentResponse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const appointmentsPerPage = 5;
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                dispatch(setLoading(true))
                const response = await fetchAllAppointmentDetailsApi();
                if (response) {
                    setAppointments(response.userAppointmentsList);
                } else {
                    setError("No appointments found.");
                }
            } catch (err) {
                setError("Failed to load appointments.");
            } finally {
                dispatch(setLoading(false))
            }
        };
        fetchAppointments();
    }, []);

    const indexOfLastAppointment = currentPage * appointmentsPerPage;
    const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const nextPage = () => {
        if (indexOfLastAppointment < appointments.length) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const refundHandler = async (transactionId: string) => {
        try {
            const {message} = await refundApi(transactionId)
            console.log(message)
        } catch (error: any) {
            dispatch(setError(error.message))
        }
    }

   
    return (
        <div className="w-full mx-auto  p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <CalendarCheck className="w-6 h-6 text-green-700" />
                Appointments
            </h2>

            
                <div className="flex flex-col justify-between flex-1">
                    <div className="mt-4 space-y-2">
                        {currentAppointments.length > 0 ? (
                            currentAppointments.map((appointment) => (
                                <div
                                    key={appointment._id}
                                    className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm border border-gray-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={appointment.doctorDetails?.profileImage || "/default-doctor.png"}
                                            alt="Doctor"
                                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                        />

                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">
                                                Dr. {appointment.doctorDetails?.fullName || "Unknown"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {appointment.doctorDetails?.specialization || "Specialization not available"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center text-gray-600">
                                        <Clock className="w-5 h-5 text-blue-500 mb-1" />
                                        <p className="text-sm">{new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                                        <p className="text-sm">
                                            {appointment.slotDetails?.startTime} - {appointment.slotDetails?.endTime}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <img
                                            src={appointment.patientDetails?.profileImage || "/default-patient.png"}
                                            alt="Patient"
                                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                                        />

                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {appointment.patientDetails?.fullName || "Unknown"}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Contact: {appointment.patientDetails?.phone || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 ">
                                        {appointment.status === "Scheduled" && isExpired(appointment.createdAt) && 
                                        <span className="flex items-center text-green-800 cursor-pointer active:scale-95"
                                        onClick={() => refundHandler(appointment.transactionId) }><Undo2 size={15} />refund</span>}
                                        {appointment.status === "Completed" ? (
                                            <CheckCircle className="w-6 h-5 text-green-500" />
                                        ) : isExpired(appointment.createdAt) ? (
                                            <XCircle className="w-6 h-5 text-gray-500" />
                                        ) : (
                                            <Hourglass className="w-6 h-5 text-orange-400" />
                                        )}
                                        <span
                                            className={`text-sm font-semibold ${appointment.status === "Completed"
                                                ? "text-green-600"
                                                : isExpired(appointment.createdAt)
                                                    ? "text-gray-500"
                                                    : "text-orange-400"
                                                }`}
                                        >
                                            {appointment.status === "Scheduled" && isExpired(appointment.createdAt)
                                                ? "Expired"
                                                : appointment.status}
                                        </span>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center mt-4">No appointments available.</p>
                        )}
                    </div>
                    <div>
                        {appointments.length > appointmentsPerPage && (
                            <div className="flex justify-center items-center mt-6 gap-2">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-1 py-2 text-white rounded-lg flex items-center gap-2`}
                                >
                                    <ChevronLeft strokeWidth={3} className="w-5 h-5 text-[#16423C]" />
                                </button>

                                {Array.from({ length: Math.ceil(appointments.length / appointmentsPerPage) }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded-md ${i + 1 === currentPage ? "bg-[#6A9C89] text-white" : "bg-[#C4DAD2] text-gray-700"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>

                                ))}
                                <button
                                    onClick={nextPage}
                                    disabled={indexOfLastAppointment >= appointments.length}
                                    className={`px-1 py-2 text-white rounded-lg flex items-center gap-2`}
                                >
                                    <ChevronRight strokeWidth={3} className="w-5 h-5 text-[#16423C]" />
                                </button>
                            </div>
                        )}

                    </div>
                </div>


        </div>
    )
}
export default Appointments;

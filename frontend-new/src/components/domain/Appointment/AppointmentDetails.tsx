import { adminAppointmentService } from "@/services/api/admin/appointment";
import { doctorAppointmentService } from "@/services/api/doctor/appointment";
import { patientAppointmentService } from "@/services/api/patient/appointment";
import { setAppointment } from "@/slices/globalSlice";
import type { AppointmentPageDetails, IAppointmentService } from "@/types/appointment";
import type { IRole } from "@/types/auth";
import { formatTimeTo12Hour, parseToMD } from "@/utils/formatDate";
import { statusColor } from "@/utils/statusColor";
import { BellRing, ClipboardPlus, Clock8, CreditCard, FileChartColumn, IndianRupee, Link, Mail, MessageSquare, SquareActivity, Stethoscope, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DoctorCard } from "../Cards";
import { PatientCard } from "../Cards/PatientCard";
import { Button } from "@/components/ui/Button";
import type { RootState } from "@/app/store";
import { setConsultationData } from "@/slices/consultationSlice";
import { useNavigate } from "react-router-dom";
import { patientConnectionRequestService } from "@/services/api/patient/connection-request";

interface Props {
    appointmentId: string;
}
const AppointmentDetails = ({ appointmentId }: Props) => {
    const { user } = useSelector((state: RootState) => state.auth)
    const showBothUsers = user?.role === "admin";
    const [appointmentDetails, setAppointmentDetails] = useState<AppointmentPageDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        if (!appointmentId) return;
        const fetchAppointment = async () => {
            try {
                setLoading(true);
                const services: Record<IRole, IAppointmentService> = {
                    patient: patientAppointmentService,
                    doctor: doctorAppointmentService,
                    admin: adminAppointmentService,
                };
                if (!services[user?.role as IRole]) {
                    throw new Error("Invalid role");
                }
                const appointmentDetails = await services[user?.role as IRole].getAppointmentPageDetailsById(appointmentId);
                setAppointmentDetails(appointmentDetails);
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        };
        fetchAppointment();
    }, [appointmentId]);



    const handleJoinMeeting = (appointment: AppointmentPageDetails) => {
        if (appointment.status === "scheduled") {
            dispatch(setConsultationData({
                doctorId: appointment.doctor.id,
                patientId: appointment.patient.id,
                roomId: appointment.roomId,
                appointmentId: appointment.id
            }))
            navigate(`/consultation/${appointment.roomId}`);
        }
        dispatch(setAppointment(null))
    };

    const sendConnectionRequest = async (doctorId: string) => {
        await patientConnectionRequestService.request(doctorId)
    }
    return (
        <div className="w-screen h-screen fixed top-0 right-0 bg-black/50 flex lg:p-4 z-40">
            <div className="max-w-2xl ml-auto bg-surface shadow rounded-md flex flex-col lg:min-w-6xl relative">
                <div className="cursor-pointer text-secondary absolute top-2 -left-10 bg-surface rounded-full " onClick={() => dispatch(setAppointment(null))}>
                    <X size={30} strokeWidth={4} className="p-2" />
                </div>
                {appointmentDetails && <div className="grid grid-cols-3 w-full h-full">
                    <div className="col-span-2 border-r border-border h-full">
                        <h2 className="text-xl font-normal text-secondary p-5 border-b border-border">Appointment Details</h2>
                        <div className="grid grid-cols-2 border-border overflow-y-auto">
                            <div className="p-7 border-b border-border flex gap-3 border-r">
                                <FileChartColumn className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary pl-2"> STATUS</p>
                                    <p className={` mt-1 rounded-full px-3 py-1  text-${statusColor(appointmentDetails.status)}-700 bg-${statusColor(appointmentDetails.status)}-100`}>
                                        {appointmentDetails.status}
                                    </p>
                                </div>
                            </div>
                            <div className="p-7 border-b border-border flex gap-3">
                                <Mail className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">MAIL</p>
                                    <p className={`text-muted-dark`}>
                                        Medicure.condact@gmail.com
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 p-7 border-b border-border flex gap-3">
                                <Clock8 className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">DATE & TIME</p>
                                    <p className={`text-muted-dark`}>
                                        {parseToMD(appointmentDetails.appointmentDate)}, {formatTimeTo12Hour(appointmentDetails.startTime)} - {formatTimeTo12Hour(appointmentDetails.endTime)}
                                    </p>
                                </div>
                                {!showBothUsers && <Button className="px-3 mt-1" onClick={() => handleJoinMeeting(appointmentDetails)}>Join</Button>}
                            </div>
                            <div className="col-span-1 p-7 border-b border-r border-border flex gap-3">
                                <Stethoscope className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">SPECIALIZATION</p>
                                    <p className={`text-muted-dark`}>
                                        {appointmentDetails.doctor.specialization}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 p-7 border-b border-border flex gap-3">
                                <SquareActivity className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">TYPE</p>
                                    <p className={`text-muted-dark`}>
                                        {appointmentDetails.appointmentType}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 p-7 border-b border-r border-border flex gap-3">
                                <CreditCard className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">TRANSACTION ID</p>
                                    <p className={`text-muted-dark`}>
                                        {appointmentDetails.transaction.transactionId}
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-1 p-7 border-b border-border flex gap-3">
                                <IndianRupee className="text-secondary" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">COST</p>
                                    <p className={`text-muted-dark`}>
                                        {appointmentDetails.transaction.amount}rs
                                    </p>
                                </div>
                            </div>
                            <div className="col-span-2 p-7 border-b border-border flex gap-3">
                                <ClipboardPlus className="text-secondary mt-1" />
                                <div>
                                    <p className="text-xs font-semibold flex items-center text-secondary">
                                        PRESCRIPTION
                                    </p>

                                    {appointmentDetails.status !== "completed" ? (
                                        <p className="text-muted-dark">
                                            Consultation is not completed yet. Prescription will be uploaded after the consultation.
                                        </p>
                                    ) : appointmentDetails.prescription ? (
                                        <div className="mt-2">
                                            <p className="text-sm text-muted-dark">Prescription Number: <span className="font-medium">{appointmentDetails.prescription.prescriptionNumber}</span></p>
                                            <p className="text-sm text-muted-dark">Issued Date: <span className="font-medium">{parseToMD(appointmentDetails.prescription.issuedDate)}</span></p>
                                            <p className="text-sm text-muted-dark">Medications: <span className="font-medium">{appointmentDetails.prescription.medications.length}</span></p>
                                        </div>
                                    ) : (
                                        <p className="text-muted-dark">Prescription has not been uploaded yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ">

                        <div className="border-b border-border">
                            <DoctorCard doctor={appointmentDetails.doctor} onView={() => ''} isMe />
                            {user?.role === "patient" && <div className="flex flex-col w-full p-2 gap-1">
                                <div className="flex gap-1">
                                    <Button className="flex-1 py-2">Profile</Button>
                                    <Button variant="outline" className="flex-1 py-2 flex items-center justify-center gap-1"
                                    onClick={() => sendConnectionRequest(appointmentDetails.doctor.id)}><Link className="mt-1" /> Connect</Button>
                                </div>
                                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 py-2 text-xl flex  items-center justify-center gap-3">
                                    {`Notify Doctor`} <BellRing /></Button>
                            </div>}
                        </div>
                        <div className="border-b border-border">
                            <PatientCard patient={appointmentDetails.patient} className="" isMe />
                            {user?.role === "doctor" && <div className="flex flex-col w-full  p-2 gap-1">
                                <div className="flex gap-1">
                                    <Button variant="muted" className="flex-1 py-2 flex items-center justify-center gap-1"><MessageSquare className="mt-1" fill="#fff" /> Message</Button>
                                    <Button variant="outline" className="flex-1 py-2">Profile</Button>
                                </div>
                                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 py-2 text-xl flex  items-center justify-center gap-3">
                                    {`Notify Patient`} <BellRing /></Button>
                            </div>}
                        </div>

                        <p className=" mt-1 p-2 text-lg text-secondary">Transaction Details</p>
                        <div
                            className="border-b border-gray-200 p-3 flex justify-between"
                        >

                            <div>
                                <p className="text-md text-secondary">
                                    {appointmentDetails.transaction.type.charAt(0).toUpperCase() + appointmentDetails.transaction.type.slice(1)}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {parseToMD(appointmentDetails.transaction.createdAt.toString())}, {formatTimeTo12Hour(appointmentDetails.transaction.createdAt.toString())}
                                </p>
                            </div>
                            <p
                                className={`text-muted-dark`}
                            >
                                ₹{appointmentDetails.transaction.amount}
                                <p className={`text-${statusColor(appointmentDetails.transaction.status)}-500`}>{appointmentDetails.transaction.status}</p>
                            </p>

                        </div>


                    </div>
                </div>}
            </div>
        </div>

    );
};

export default AppointmentDetails;

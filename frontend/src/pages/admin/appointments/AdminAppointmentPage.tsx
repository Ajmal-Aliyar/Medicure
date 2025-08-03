import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import useAppointment from "@/hooks/useAppointment";
import { setLoading } from "@/slices/globalSlice";
import AppointmentCard from "@/components/domain/Cards/AppointmentCard";
import type { IAppointmentCard } from "@/types/appointment";
import SevenDaysFilter from "@/components/domain/filters/SevenDaysFilter";
import AppointmentFilter from "@/components/domain/filters/AppointmentFilter";
import { Pagination } from "@/components/ui/Pagination";
import { FeedbackModal } from "@/components/domain/Modals/FeedbackModal";


const AdminAppointmentPage = () => {
    const [page, setPage] = useState<number>(1);
    const [appointmentType, setAppointmentType] = useState<string>("")
    const [appointmentDate, setAppointmentDate] = useState<string>("")
    const [status, setStatus] = useState<string>("")
    const dispatch = useDispatch()

    const filters = useMemo(() => ({
        appointmentType,
        appointmentDate,
        status,
        page,
    }), [
        appointmentType,
        appointmentDate,
        status,
        page,
    ]);


    const { data, loading } = useAppointment(filters);
    dispatch(setLoading(loading))

    return (
        <div className="w-full px-4 py-6 bg-surface shadow-md rounded-md overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-secondary">Appointments</h2>
            <div className="w-full flex justify-between items-center ">
                <div className=" flex gap-2">
                    <AppointmentFilter
                        appointmentDate={appointmentDate}
                        setAppointmentDate={setAppointmentDate}
                        appointmentType={appointmentType}
                        setAppointmentType={setAppointmentType}
                        status={status} setStatus={setStatus} />
                </div>
                {data && (
                    <Pagination
                        currentPage={data?.meta?.page}
                        totalPages={data?.meta?.totalPages}
                        onPageChange={(newPage) => {
                            setPage(newPage)
                        }}
                        className="py-2"
                    />
                )}
            </div>

            <SevenDaysFilter day={appointmentDate} setDay={setAppointmentDate} className={"min-w-[100px] px-1 py-2"} />

            <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-2 p-4">


                {data && data.appointments.length > 0 ? data.appointments.map((appointment: IAppointmentCard, idx: number) => (
                    <AppointmentCard
                        key={appointment.id || idx}
                        appointment={appointment}
                        role="admin"
                    />
                )) : <p className="text-sm text-gray-400">No appointments!</p>}
            </div>
            <FeedbackModal />
        </div>
    );
};

export default AdminAppointmentPage;
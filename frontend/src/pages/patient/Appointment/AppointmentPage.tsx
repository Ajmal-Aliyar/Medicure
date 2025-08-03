import { useDispatch } from "react-redux";
import { useMemo, useState } from "react";
import useAppointment from "@/hooks/useAppointment";
import { setLoading } from "@/slices/globalSlice";
import type { IAppointmentCard } from "@/types/appointment";
import AppointmentCard from "@/components/domain/Cards/AppointmentCard";
import { FeedbackModal } from "@/components/domain/Modals/FeedbackModal";
import { Pagination } from "@/components/ui/Pagination";
import AppointmentFilter from "@/components/domain/filters/AppointmentFilter";


const AppointmentPage = () => {
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
        <div className="w-full flex flex-col gap-4 h-full relative">
            <div className="w-full sticky top-0 bg-surface border-b border-border flex justify-between">
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
            <div className="overflow-y-auto ">
                {data && data.appointments.length > 0 ? data.appointments.map((appointment: IAppointmentCard, idx: number) => (
                    <AppointmentCard
                        key={appointment.id || idx}
                        appointment={appointment}
                        role="patient"
                    />
                )) : <p className="text-sm text-gray-400">No appointments!</p>}
            </div>
            <FeedbackModal />


        </div>

    )
}

export default AppointmentPage

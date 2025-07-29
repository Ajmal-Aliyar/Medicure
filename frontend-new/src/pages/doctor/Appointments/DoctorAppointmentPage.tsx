import { useMemo, useState } from "react";
import { getNext7Days } from "@/utils/daysUtil";
import useAppointment from "@/hooks/useAppointment";
import AppointmentCard from "@/components/domain/Cards/AppointmentCard";
import type { IAppointmentCard } from "@/types/appointment";
import SevenDaysFilter from "@/components/domain/filters/SevenDaysFilter";
import AppointmentFilter from "@/components/domain/filters/AppointmentFilter";
import { Pagination } from "@/components/ui/Pagination";
import Loader from "@/components/ui/Loader";
import { FeedbackModal } from "@/components/domain/Modals/FeedbackModal";


const DoctorAppointmentPage = () => {
    const [page, setPage] = useState<number>(1);
    const [appointmentType, setAppointmentType] = useState<string>("")
    const [appointmentDate, setAppointmentDate] = useState<string>(getNext7Days()[0].value)
    const [status, setStatus] = useState<string>("")

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

    return (
        <div className="min-w-3xl mx-auto  px-4 py-6 bg-surface rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-secondary">Appointments</h2>
            <div className="w-full sticky top-0 flex justify-between items-center">
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

            {loading ? <Loader className="mx-auto my-auto" /> :
                data && data.appointments.length > 0 ? data.appointments.map((appointment: IAppointmentCard, idx: number) => (
                    <AppointmentCard
                        key={appointment.id || idx}
                        appointment={appointment}
                        role="doctor"
                        className="mx-auto rounded-md shadow-sm bg-surface mb-4"
                    />
                )) : <p className="text-sm text-gray-400">No appointments!</p>}
                <FeedbackModal />
        </div>
    );
};

export default DoctorAppointmentPage
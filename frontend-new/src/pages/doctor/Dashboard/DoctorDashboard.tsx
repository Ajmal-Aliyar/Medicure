import { DoctorCard } from "@/components/domain/Cards";
import AppointmentSlotChart from "./components/AppointmentSlotChart";
import CalendarWithNavigation from "./components/CalendarWithNavigation";
import  { lazy, Suspense, useMemo, useState } from "react";
import { formatDateToLong, formatDateToYMD, isToday } from "@/utils/formatDate";
import useAppointment from "@/hooks/useAppointment";
import AppointmentCard from "@/components/domain/Cards/AppointmentCard";
import type { IAppointmentCard } from "@/types/appointment";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import WalletCard from "@/components/domain/Cards/WalletCard";
import type { IWallet } from "@/types/wallet";
const LazyTransactionDetails = lazy(() => import("../Finance/components/TransactionDetails"));

const DoctorDashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const { doctor } = useSelector((state: RootState) => state.doctor)
    const [ wallet, setWallet] = useState<IWallet | null>(null)
    const navigate = useNavigate()

    const filters = useMemo(() => ({
        appointmentType: '',
        appointmentDate: formatDateToYMD(selectedDate),
        status: "scheduled",
        page: 1,
    }), [
        selectedDate,
    ]);



    const { data: appointments } = useAppointment(filters);
    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-3 grid-rows-4 gap-4 h-full">

                <div className="col-span-2 row-span-2 bg-surface rounded-md shadow-md flex flex-col">
                    
                    <AppointmentSlotChart />
                </div>

                <div className="row-span-1 flex flex-col bg-surface rounded-md shadow-md">
                    <DoctorCard doctor={doctor} className="mt-auto" onView={() => navigate(`/doctor/profile/${doctor.id}`)} />
                </div>

                <div className="row-span-3 bg-surface rounded-md shadow-md overflow-auto flex flex-col">
                    <p className="text-secondary-dark font-medium text-md p-3 border-b border-border">
                        Finance
                    </p>
                    <WalletCard wallet={wallet} setWallet={setWallet} role={"doctor"} className="border-b border-border" />
                    <Suspense fallback={<div className="p-4">Loading transactions...</div>}>
                        <LazyTransactionDetails className="max-h-[400px]" />
                    </Suspense>
                </div>

                <div className="bg-surface row-span-2 rounded-md shadow-md">
                    <p className="text-secondary-dark font-medium text-md p-3 border-b border-border">
                        Calender
                    </p>
                    <CalendarWithNavigation selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>


                <div className="bg-surface row-span-2 rounded-md shadow-md">
                    <div className="text-secondary-dark font-medium text-md p-3 border-b border-border flex justify-between">
                        <p>Upcoming Appointments</p>
                        <p className="text-primary">{isToday(selectedDate.toString()) ? 'Today' : formatDateToLong(selectedDate.toString())}</p>
                    </div>

                    {appointments && appointments.appointments.length > 0 ? appointments.appointments.map((appointment: IAppointmentCard, idx: number) => (
                            <AppointmentCard
                            isDashboard
                            key={appointment.id || idx}
                            appointment={appointment}
                            role="doctor"
                            className="mx-auto"
                        />
                        
                    )) : <p className="text-sm text-gray-400 p-4">No appointments!</p>}

                </div>
            </div>

        </div>

    );
};

export default DoctorDashboard;

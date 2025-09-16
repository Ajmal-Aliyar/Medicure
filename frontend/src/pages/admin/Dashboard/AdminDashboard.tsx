import { lazy, Suspense, useMemo, useState } from "react";
import DoctorPatientRatioChart from "./components/DoctorPatientRationChart";
import TransactionChart from "./components/TransactionChart"
import CalendarWithNavigation from "@/pages/doctor/Dashboard/components/CalendarWithNavigation";
import { DoctorCard } from "@/components/domain/Cards";
import { useDoctors } from "@/hooks";
import type { FilterDoctorSummary } from "@/types/doctor";
import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";
import { formatDateToLong } from "@/utils/formatDate";
import WalletCard from "@/components/domain/Cards/WalletCard";
const LazyTransactionDetails = lazy(() => import("@/pages/admin/Finance/components/TransactionDetails"));


const AdminDashboard = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const navigate = useNavigate()

    const filters = useMemo(() => ({
        profileStatus: "applied",
        page: 1,
        createdAt: selectedDate
    }), [selectedDate]);


    const { data } = useDoctors(filters);
    return (
        <div className="w-full h-full overflow-auto">
            <div className="grid grid-cols-3 auto-rows-auto gap-4">
                <div className="col-span-2  bg-surface rounded-md shadow-md flex flex-col h-fit">
                    <TransactionChart  />
                </div>
                <div className=" flex flex-col col-span-1  bg-surface rounded-md shadow-md ">
                    <h2 className="text-secondary font-medium text-md p-3 border-b border-border">Users Ratio</h2>
                    <DoctorPatientRatioChart />
                </div>
                <div className="bg-surface  rounded-md shadow-md h-fit">
                    <p className="text-secondary font-medium text-md p-3 border-b border-border">
                        Calender
                    </p>
                    <CalendarWithNavigation selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>

                <div className="bg-surface rounded-md shadow-md overflow-hidden ">
                    <div className="text-secondary font-medium text-md p-3 border-b border-border flex justify-between">
                        <p>Approval Requests</p>
                        <p className="text-primary">{isToday(selectedDate.toString()) ? 'Today' : formatDateToLong(selectedDate.toString())}</p>
                    </div>

                    {data && data.doctors.length > 0 ? data.doctors.map((doctor: FilterDoctorSummary, idx: number) => (
                        <DoctorCard key={doctor.id || idx} doctor={doctor} showMeta onView={() => navigate(`doctor/${doctor.id}`)} className="border-b border-border rounded-none" />
                    )) : <p className="text-sm text-gray-400 p-4">No appointments!</p>}

                </div>

                <div className=" bg-surface rounded-md shadow-md overflow-auto flex flex-col ">
                    <p className="text-secondary font-medium text-md p-3 border-b border-border">
                        Finance
                    </p>
                    <WalletCard role={"admin"} className="border-b border-border"/>
                    <Suspense fallback={<div className="p-4">Loading transactions...</div>}>
                        <LazyTransactionDetails className="max-h-[400px]" />
                    </Suspense>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard
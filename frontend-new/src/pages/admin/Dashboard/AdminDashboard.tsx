import { useMemo, useState } from "react";
import DoctorPatientRatioChart from "./components/DoctorPatientRationChart";
import TransactionChart from "./components/TransactionChart"
import CalendarWithNavigation from "@/pages/doctor/Dashboard/components/CalendarWithNavigation";
import { DoctorCard } from "@/components/domain/Cards";
import { useDoctors } from "@/hooks";
import type { FilterDoctorSummary } from "@/types/doctor";
import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";
import { formatDateToLong } from "@/utils/formatDate";
import AdminWallet from "../Finance/components/AdminWallet";
interface ITransaction {
    id: string;
    amount: number;
    createdAt: string;
    type: string;
    direction: "credit" | "debit";
    doctorId: string;
}
export const mockTransactions: ITransaction[] = [
    {
        id: "txn1",
        amount: 200,
        createdAt: "2025-07-01T10:15:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn2",
        amount: 350,
        createdAt: "2025-07-02T12:20:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn3",
        amount: 150,
        createdAt: "2025-07-02T14:50:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn4",
        amount: 500,
        createdAt: "2025-07-03T09:00:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn5",
        amount: 400,
        createdAt: "2025-07-05T16:45:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn6",
        amount: 100,
        createdAt: "2025-07-07T08:10:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn7",
        amount: 300,
        createdAt: "2025-07-08T13:35:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn8",
        amount: 250,
        createdAt: "2025-07-09T11:25:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn9",
        amount: 350,
        createdAt: "2025-07-10T15:00:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
    {
        id: "txn10",
        amount: 180,
        createdAt: "2025-07-11T17:40:00.000Z",
        type: "appointment",
        direction: "credit",
        doctorId: "doc1"
    },
];


const AdminDashboard = () => {
    const [viewType, setViewType] = useState<"day" | "week" | "month">("day");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const navigate = useNavigate()

    const filters = useMemo(() => ({
        profileStatus: "applied",
        page: 1,
        createdAt: selectedDate
    }), [selectedDate]);


    const { data, loading } = useDoctors(filters);
    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full">
                <div className="col-span-2 bg-surface rounded-md shadow-md flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-4 border-b border-border p-3">
                        <h2 className="font-medium text-md text-secondary-dark">Revenue Overview</h2>
                        <select
                            className="border rounded px-2 py-1 text-sm"
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value as any)}
                        >
                            <option value="day">Daily</option>
                            <option value="week">Weekly</option>
                            <option value="month">Monthly</option>
                        </select>
                    </div>
                    <TransactionChart transactions={mockTransactions} viewType={viewType} />
                </div>
                <div className=" flex flex-col col-span-1 bg-surface rounded-md shadow-md">
                    <h2 className="text-secondary-dark font-medium text-md p-3 border-b border-border">Users Ratio</h2>
                    <DoctorPatientRatioChart />
                </div>
                <div className="bg-surface row-span-2 rounded-md shadow-md">
                    <p className="text-secondary-dark font-medium text-md p-3 border-b border-border">
                        Calender
                    </p>
                    <CalendarWithNavigation selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>

                <div className="bg-surface row-span-2 rounded-md shadow-md overflow-hidden">
                    <div className="text-secondary-dark font-medium text-md p-3 border-b border-border flex justify-between">
                        <p>Approval Requests</p>
                        <p className="text-primary">{isToday(selectedDate.toString()) ? 'Today' : formatDateToLong(selectedDate.toString())}</p>
                    </div>

                    {data && data.doctors.length > 0 ? data.doctors.map((doctor: FilterDoctorSummary, idx: number) => (
                        <DoctorCard key={doctor.id || idx} doctor={doctor} showMeta onView={() => navigate(`doctor/${doctor.id}`)} className="border-b border-border rounded-none" />
                    )) : <p className="text-sm text-gray-400 p-4">No appointments!</p>}

                </div>

                <div className="row-span-3 bg-surface rounded-md shadow-md overflow-auto flex flex-col">
                    <p className="text-secondary-dark font-medium text-md p-3 border-b border-border">
                        Finance
                    </p>
                    <AdminWallet className="border-b border-border" />
                    <div className="flex justify-between items-center w-full mt-3 p-4">
                        <div>
                            <p className="text-secondary font-bold text-xl"> Account Balance</p>
                            <p className="text-xs">last updated at</p>
                        </div>

                        <p className="text-primary font-semibold text-2xl">₹1600</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AdminDashboard
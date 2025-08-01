import { useMemo, useState } from "react";
import SevenDaysFilter from "@/components/domain/filters/SevenDaysFilter";
import { SlotList } from "@/pages/patient/BookingSlotDetails/components/SlotList";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import useSlot from "@/hooks/useSlot";
import SlotFilter from "@/components/domain/filters/SlotFilter";
import { Pagination } from "@/components/ui/Pagination";
import Loader from "@/components/ui/Loader";
import { formatDateToYMD } from "@/utils/formatDate";

const DoctorSlotPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>(formatDateToYMD(new Date()));
    const user = useSelector((state: RootState) => state.auth.user)
    const doctorId = user ? user.id : ''
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [isBooked, setIsBooked] = useState<boolean | null>(null)
    const [isActive, setIsActive] = useState<boolean | null>(null)

    const filters = useMemo(() => ({
        doctorId,
        date: selectedDate,
        status,
        type,
        isActive,
        isBooked,
        page,
    }), [
        doctorId,
        selectedDate,
        status,
        type,
        isActive,
        isBooked,
        page,
    ]);


    const { data, loading, updateSlotStatus } = useSlot(filters);


    return (
        <div className="min-w-5xl mx-auto px-4 py-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-secondary">Available Slots</h2>
            <div className="w-full sticky top-0 flex justify-between items-center">
                <div className=" flex gap-2">
                    <SlotFilter 
                    date={selectedDate} 
                    setDate={setSelectedDate} 
                    type={type} 
                    setType={setType} 
                    status={status} setStatus={setStatus}
                    isActive={isActive} setIsActive={setIsActive} 
                    isBooked={isBooked} setIsBooked={setIsBooked}/>
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
            <SevenDaysFilter day={selectedDate} setDay={setSelectedDate} className="min-w-[100px] px-1 py-2" />
            { loading ? <Loader className="mx-auto my-auto"/> : 
            <SlotList slots={data?.slots || []} onClick={updateSlotStatus}/>}
        </div>
    )
}

export default DoctorSlotPage
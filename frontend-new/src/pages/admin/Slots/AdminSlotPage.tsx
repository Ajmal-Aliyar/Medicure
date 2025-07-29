import { useMemo, useState } from "react";
import { getNext7Days } from "@/utils/daysUtil";
import SevenDaysFilter from "@/components/domain/filters/SevenDaysFilter";
import { SlotList } from "@/pages/patient/BookingSlotDetails/components/SlotList";
import { useDispatch } from "react-redux";
import useSlot from "@/hooks/useSlot";
import { setLoading } from "@/slices/globalSlice";
import SlotFilter from "@/components/domain/filters/SlotFilter";
import { Pagination } from "@/components/ui/Pagination";

const AdminSlotPage = () => {
    const [selectedDate, setSelectedDate] = useState<string>(getNext7Days()[0].value);
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [isBooked, setIsBooked] = useState<boolean | null>(null)
    // const [isActive, setIsActive] = useState<boolean | null>(null)
    const dispatch = useDispatch()

    const filters = useMemo(() => ({
        date: selectedDate,
        status,
        type,
        // isActive,
        isBooked,
        page,
    }), [
        selectedDate,
        status,
        type,
        // isActive,
        isBooked,
        page,
    ]);


    const { data, loading } = useSlot(filters);
    dispatch(setLoading(loading))


    return (
        <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-secondary">Available Slots</h2>
            <div className="w-full sticky top-0 flex justify-between items-center">
                <div className=" flex gap-2">
                    <SlotFilter 
                    date={selectedDate} 
                    setDate={setSelectedDate} 
                    type={type} 
                    setType={setType} 
                    status={status} setStatus={setStatus} 
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
            <SlotList slots={data?.slots || []} />
        </div>
    )
}

export default AdminSlotPage
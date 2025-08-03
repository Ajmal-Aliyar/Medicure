import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import StatusSelect from "@/components/ui/SelectBox";
import { RefreshCw } from "lucide-react";
import BooleanFilter from "../../ui/BooleanFilter";

interface SlotFilterFilterProps {
    date: string;
    setDate: (value: string) => void;
    type: string;
    setType: (value: string) => void;
    status: string;
    setStatus: (value: string) => void
    isActive?: boolean | null;
    setIsActive?: (value: boolean | null) => void
    isBooked: boolean | null;
    setIsBooked: (value: boolean | null) => void
}

const typesOptions = ["consult", "emergency"]
const statusType = [
    "available",
    "booked",
    "cancelled",
    "completed"]

const SlotFilter = ({ date, setDate, type, setType, setStatus, status, isActive, setIsActive, isBooked, setIsBooked }: SlotFilterFilterProps) => {
    const refresh = () => {
        setDate("")
        setType("")
        setStatus("")
        setIsBooked(null)
        if (setIsActive) setIsActive(null);

    }
    return (
        <>
            <BooleanFilter label="IsBooked" setIsActive={setIsBooked} isActive={isBooked} />
            {setIsActive && (
                <BooleanFilter label="IsActive" setIsActive={setIsActive} isActive={isActive ?? null} />
            )}

            <StatusSelect
                className="h-fit mb-2"
                value={type}
                onChange={setType}
                statusOptions={typesOptions}
                label="Type"
                placeholder="All"
            />
            <StatusSelect
                className="h-fit mb-2"
                value={status}
                onChange={setStatus}
                statusOptions={statusType}
                label="Status"
                placeholder="All"
            />
            <DatePicker label="Date" date={date} setDate={setDate} />
            <Button className=" mt-auto mb-2 p-2" onClick={refresh}><RefreshCw size={20} className="" /></Button>
        </>
    )
}

export default SlotFilter
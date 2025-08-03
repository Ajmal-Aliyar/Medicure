import { Button } from "@/components/ui/Button";
import DatePicker from "@/components/ui/DatePicker";
import StatusSelect from "@/components/ui/SelectBox";
import { RefreshCw } from "lucide-react";

interface AppointmentFilterProps {
    appointmentType: string;
    setAppointmentType: (value: string) => void;
    appointmentDate: string;
    setAppointmentDate: (value: string) => void;
    status: string;
    setStatus: (value: string) => void
}

const appointmentTypesOptions = ["consult", "emergency"]
const statusType = [
    "scheduled",
    "in Progress",
    "completed",
    "cancelled",
    "no show"]

const AppointmentFilter = ({ appointmentType, setAppointmentType, appointmentDate, setAppointmentDate, setStatus, status }: AppointmentFilterProps) => {
    const refresh = () => {
        setAppointmentDate("")
        setAppointmentType("")
        setStatus("")
    }
    return (
        <>
            <StatusSelect
                className="h-fit mb-2"
                value={appointmentType}
                onChange={setAppointmentType}
                statusOptions={appointmentTypesOptions}
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
            <DatePicker label="Date" date={appointmentDate} setDate={setAppointmentDate} />
            <Button className=" mt-auto mb-2 p-2" onClick={refresh}><RefreshCw size={20} className="" /></Button>
        </>  
    )             
}

export default AppointmentFilter
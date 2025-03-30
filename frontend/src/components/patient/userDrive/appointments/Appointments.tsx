import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setSuccess } from "../../../../store/slices/commonSlices/notificationSlice";
import { useState } from "react";
import AppointmentsList from "./AppointmentsList";
import { ChevronRight } from "lucide-react";


const Appointments = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search)
    const session = queryParams.get('session_id')
    const [page, setPage] = useState<'pending' | 'history'>('pending')
   
    const dispatch = useDispatch()

    if (session) {
        setTimeout(() => {
            dispatch(setSuccess('Booked appointment successfully.'))
        }, 500)
    }


    return (
        <div className="w-full flex flex-col gap-4 h-[560px] overflow-auto">
            <div className="flex gap-2 font-medium text-md cursor-pointer">
                <p onClick={() => setPage('pending')} className={`flex justify-center items-center ${page !== 'history' ? 'text-[#2f3c62f8]' : 'text-[#2f3c6294]'}`}>Live <ChevronRight size={20} strokeWidth={2} /></p>
                <p onClick={() => setPage('history')} className={`flex justify-center items-center ${page !== 'pending' ? 'text-[#2f3c62f8]' : 'text-[#2f3c6294]'}`}>History <ChevronRight size={20} strokeWidth={2} /></p>
            </div>
            <div className="pr-2">
                {page === 'pending' ? <AppointmentsList page={page} />
                    : <AppointmentsList page={page} />}
                
            </div>
        </div>

    )
}

export default Appointments

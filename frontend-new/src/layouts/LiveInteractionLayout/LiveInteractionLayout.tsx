import type { RootState } from "@/app/store"
import AppointmentDetails from "@/components/domain/Appointment/AppointmentDetails"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

export const LiveInteractionLayout = () => {
    const { appointmentId } = useSelector((state: RootState) => state.global)
    return (
        <div className="w-screen h-screen grid grid-cols-5 ">
            <Outlet />
            {appointmentId && <AppointmentDetails appointmentId={appointmentId} />}
        </div>
    )
}
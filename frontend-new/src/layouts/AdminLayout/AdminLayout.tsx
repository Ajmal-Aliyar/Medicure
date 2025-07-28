import { Outlet } from "react-router-dom"
import { MenuBar } from "./MenuBar"
import TopBar from "../components/TopBar"
import { DEFAULT_IMAGE } from "@/app/constants"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import AppointmentDetails from "@/components/domain/Appointment/AppointmentDetails"

export const AdminLayout = () => {
    const {appointmentId} = useSelector((state: RootState) => state.global)

    return (
        <div className='w-[100vw] h-[100vh] bg-background relative  flex flex-col lg:flex-row overflow-hidden'>
            <MenuBar />
            <div className='w-full flex flex-col relative lg:h-[100vh] md:p-2 gap-2 '>
                <TopBar name="Medicure" image={DEFAULT_IMAGE}/>
                <div className='w-full flex flex-1 h-full min-h[90vh] max-h-[90vh] p-1 lg:p-0'>
                    <Outlet />
                </div>
            </div>
            {appointmentId && <AppointmentDetails appointmentId={appointmentId}  />}

        </div>
    )
}


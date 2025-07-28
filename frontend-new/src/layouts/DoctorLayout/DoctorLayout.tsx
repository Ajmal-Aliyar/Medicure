import { Outlet } from "react-router-dom"
import { MenuBar } from "./MenuBar"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import TopBar from "../components/TopBar"
import { useEffect } from "react"
import { setLoading } from "@/slices/globalSlice"
import { doctorService } from "@/services/api/doctor/doctor"
import { updateDoctorProfile, updateDoctorSchedule } from "@/slices/doctorSlice"
import AppointmentDetails from "@/components/domain/Appointment/AppointmentDetails"
import { PrescriptionModal } from "@/components/domain/Modals/PrescriptionModal"

export const DoctorLayout = () => {
    const { user } = useSelector((state: RootState) => state.auth)
    const {appointmentId, prescription} = useSelector((state: RootState) => state.global)

    const dispatch = useDispatch()

        useEffect(() => {
            const fetchDoctorProfile = async () => {
                dispatch(setLoading(true))
                const { doctor, schedule } = await doctorService.getProfileDetails()
                dispatch(updateDoctorProfile(doctor))
                schedule && dispatch(updateDoctorSchedule(schedule))
                dispatch(setLoading(false))
            }
    
            fetchDoctorProfile()
        }, [])
    return (
        <div className='w-[100%] min-h-screen bg-background relative  flex flex-col lg:flex-row overflow-y-auto'>
            <MenuBar />
            <div className='w-full flex flex-col relative h-screen p-2'>
                <TopBar name={user?.fullName || ''} image={user?.profileImage || ''}/>
                <div className='w-full flex pt-4 flex-1  '>
                    <Outlet />
                </div>

            </div>
            {appointmentId && <AppointmentDetails appointmentId={appointmentId}  />}
            { prescription.isOpen && <div className="w-screen h-screen bg-black/80 fixed top-0 left-0 z-40">
                <PrescriptionModal prescriptionId={prescription.prescriptionId} />
            </div> }
        </div>
    )
}


import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { getDoctorAppointmentDetailsApi } from '../../../sevices/admin/doctorRepository'
import { ISlotDetails } from '../../../types/doctor/verifyDetailsType'
import { timeFormat12hr } from '../../doctor/appointments/AppointmentSetUp'

function AppointmentDetails() {
    const doctorId = useSelector((state: RootState) => state.manageDoctor)
    const [slots, setSlots] = useState<ISlotDetails[]>([])

    useEffect(() => {
        const getSlotsDetails = async () => {
            const response = await getDoctorAppointmentDetailsApi(doctorId.selectId)
            const details: ISlotDetails[] = response.data
            setSlots(details)
        }
        getSlotsDetails()
    }, [doctorId])
    return (
        <div className="flex flex-col w-full p-6">
            <div className=" bg-[#C4DAD2] px-4 rounded-md py-2">
                <table className="min-w-full text-sm text-gray-700">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Time</th>
                            <th className="py-2 px-4 text-left">Limit</th>
                            <th className="py-2 px-4 text-left">Avg Per</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {slots.length > 0 ? (
                            slots.map((slot, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{timeFormat12hr(slot.startTime)} - {timeFormat12hr(slot.endTime)}</td>
                                    <td className="py-2 px-4">{slot.slotLimit} Patients</td>
                                    <td className="py-2 px-4">{slot.avgConsultTime} minutes</td>
                                    <td className="py-2 px-4 ">
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-2 px-4 text-center text-gray-500">No slots available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AppointmentDetails 

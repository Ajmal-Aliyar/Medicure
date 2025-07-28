import type { RootState } from '@/app/store'
import { DoctorCard } from '@/components/domain/Cards'
import { PatientCard } from '@/components/domain/Cards/PatientCard'
import RoomAppointmentInfoCard from '@/components/domain/Cards/RoomAppointmentInfoCard'
import { doctorAppointmentService } from '@/services/api/doctor/appointment'
import { patientAppointmentService } from '@/services/api/patient/appointment'
import { setConsultationData } from '@/slices/consultationSlice'
import type { AppointmentDetailsPopulated } from '@/types/appointment'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const RoomAppointmentDetails = () => {
  const {user} = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()
  const { roomId } = useParams()
  const dispatch = useDispatch()
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetailsPopulated | null>(null)
      useEffect(() => {
          const fetch = async () => {
            const appointmentService = user?.role === "patient" ? patientAppointmentService : doctorAppointmentService 
              const appointment = await appointmentService.getAppointmentByRoomId(roomId as string)
              setAppointmentDetails(appointment)
              const patientId = appointment.patient.id;
              const doctorId = appointment.doctor.id;
              const appointmentId = appointment.id;
              dispatch(setConsultationData({patientId, doctorId, roomId: roomId as string, appointmentId }))
          }
          fetch()
      }, [])
  return (
    <div className="flex flex-col gap-1">
      {appointmentDetails && <DoctorCard doctor={appointmentDetails.doctor} onView={(doctorId) => navigate(`/doctor/${doctorId}`)} isMe={user?.role === "doctor"} className='shadow-md rounded-md'/>}
      {appointmentDetails && <PatientCard patient={appointmentDetails.patient} isMe={user?.role === "patient"} className='shadow-md rounded-md'/>}
      {appointmentDetails && <RoomAppointmentInfoCard appointment={appointmentDetails} />}
    </div>
  )
}

export default RoomAppointmentDetails
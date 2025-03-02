import React, { useEffect, useState } from 'react'
import { fetchAllAppointmentsApi, fetchBookedPatientsResponse } from '../../../sevices/appointments/fetchBookedPatients';
import { useDispatch } from 'react-redux';
import { setRoomId } from '../../../store/slices/commonSlices/videoConsultSlice';
import { useNavigate } from 'react-router-dom';


const BookedAppointments: React.FC = () => {
  const [patientDetails, setPatientDetails] = useState<fetchBookedPatientsResponse[] | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
        const {bookedPatientsData} = await fetchAllAppointmentsApi()
        console.log(bookedPatientsData)
        setPatientDetails(bookedPatientsData)
    }
    fetchPatients()
  }, [])

  const createRoomHandler = (roomId: string, appointmentId: string) => {
    dispatch(setRoomId(roomId))
    navigate(`/consult/meeting/${roomId}?appointment=${appointmentId}&slot=${'selectedSlot'}`)
  }

  return (
    <div className='bg-white rounded-md shadow-md pb-4'>
      <div className='p-2  border-b'>
        <p>Appointments</p>
      </div>
      <div className='overflow-auto'>
        {patientDetails && patientDetails.map((patient) => (
          <div key={patient.patientDetails._id} className="flex justify-between p-2 items-center border-b relative mb-2  duration-300" >
            <div className='flex'>
              <div className="w-14 h-14 bg-blue-200 rounded-full">
                <img src={patient.patientDetails.profileImage} alt={patient.patientDetails.fullName} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-lg">{patient.patientDetails.fullName}</p>
                <p className="text-xs text-neutral-500 ">{ } ({patient.patientDetails.gender})</p>
              </div>
            </div>

            <div className='flex gap-2'>
              <button className='px-2 text-white bg-gray-300 rounded-md active:scale-90 duration-300'>profile</button>
              <button className='px-2 text-white bg-gray-300 rounded-md active:scale-90 duration-300' >cancel</button>
              <button className={`px-3 text-white bg-blue-400 rounded-md active:scale-90 duration-300 ${patient.status === 'Scheduled' ? '' : 'hidden'}`} onClick={() =>createRoomHandler(patient.roomId, patient.appointmentId)}>join</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default BookedAppointments

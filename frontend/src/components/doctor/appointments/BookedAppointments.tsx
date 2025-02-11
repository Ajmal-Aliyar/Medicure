import React, { useEffect, useState } from 'react'
import { fetchBookedPatients, fetchBookedPatientsResponse } from '../../../sevices/appointments/fetchBookedPatients';
import { ChevronLeft } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setRoomId } from '../../../store/slices/commonSlices/videoConsultSlice';
import { useNavigate } from 'react-router-dom';

interface BookedAppointmentsProps {
  selectedSlot: null | string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>
}
const BookedAppointments: React.FC<BookedAppointmentsProps> = ({ selectedSlot, setSelectedSlot }) => {
  const [patientDetails, setPatientDetails] = useState<fetchBookedPatientsResponse[] | null>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      if (selectedSlot) {
        const {bookedPatientsData} = await fetchBookedPatients(selectedSlot)
        setPatientDetails(bookedPatientsData)
      }
    }
    fetchPatients()
  }, [selectedSlot])

  const createRoomHandler = (roomId: string) => {
    dispatch(setRoomId(roomId))
    
    navigate(`/consult/meeting/${roomId}`)
  }

  return (
    <div>
      <div className='p-2  border-b'>
        <p className='font-medium text-sm text-gray-700 flex items-center cursor-pointer' onClick={() => setSelectedSlot(null)}><ChevronLeft size={16} />Patients</p>
      </div>
      <div className='h-[610px] overflow-auto'>
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
              <button className='px-2 text-white bg-gray-300 rounded-md active:scale-90 duration-300'>action</button>
              <button className='px-3 text-white bg-blue-400 rounded-md active:scale-90 duration-300' onClick={() =>createRoomHandler(patient.roomId)}>join</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default BookedAppointments

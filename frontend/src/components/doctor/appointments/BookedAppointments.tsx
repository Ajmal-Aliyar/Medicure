import React, { useEffect, useState } from 'react'
import { fetchBookedPatients, UserDetailsPartial } from '../../../sevices/appointments/fetchBookedPatients';
import { ChevronLeft } from 'lucide-react';

interface BookedAppointmentsProps {
  selectedSlot: null | string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>
}
const BookedAppointments: React.FC<BookedAppointmentsProps> = ({ selectedSlot, setSelectedSlot }) => {
  const [patientDetails, setPatientDetails] = useState<UserDetailsPartial[] | null>(null)

  useEffect(() => {
    const fetchPatients = async () => {
      if (selectedSlot) {
        const { userDetails } = await fetchBookedPatients(selectedSlot)
        console.log(userDetails)
        setPatientDetails(userDetails)
      }
    }
    fetchPatients()
  }, [selectedSlot])

  return (
    <div>
      <div className='p-2  border-b'>
        <p className='font-medium text-sm text-gray-700 flex items-center cursor-pointer' onClick={() => setSelectedSlot(null)}><ChevronLeft size={16} />Patients</p>
      </div>
      <div className='h-[610px] overflow-auto'>
        {patientDetails && patientDetails.map((patient) => (
          <div key={patient._id} className="flex justify-between p-2 items-center border-b relative mb-2  duration-300" >
            <div className='flex'>
               <div className="w-14 h-14 bg-blue-200 rounded-full">
              <img src={patient.profileImage} alt={patient.fullName} className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="ml-2">
              <p className="font-semibold text-lg">{patient.fullName}</p>
              <p className="text-xs text-neutral-500 ">{ } ({patient.gender})</p>
            </div>
            </div>
           
            <div className='flex gap-2'>
              <button className='px-2 text-white bg-gray-300 rounded-md active:scale-90 duration-300'>profile</button>
              <button className='px-2 text-white bg-gray-300 rounded-md active:scale-90 duration-300'>action</button>
              <button className='px-3 text-white bg-blue-400 rounded-md active:scale-90 duration-300'>join</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default BookedAppointments

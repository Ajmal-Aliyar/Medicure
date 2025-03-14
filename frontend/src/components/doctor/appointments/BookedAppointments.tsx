import React, { useEffect, useState } from 'react'
import { fetchBookedPatients, fetchBookedPatientsResponse } from '../../../sevices/appointments/fetchBookedPatients';
import { ChevronLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setPatientId, setRecordId, setRoomId } from '../../../store/slices/commonSlices/videoConsultSlice';
import { useNavigate } from 'react-router-dom';
import { MedicalRecordProvider } from '../../../context/MedicalReportProvider';
import { MedicalRecordForm } from '../../../pages/doctor/MedicalReport';

interface BookedAppointmentsProps {
  selectedSlot: null | string;
  setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>
}
const BookedAppointments: React.FC<BookedAppointmentsProps> = ({ selectedSlot, setSelectedSlot }) => {
  const [patientDetails, setPatientDetails] = useState<fetchBookedPatientsResponse[] | null>(null)
  const [medicalReport, setMedicalReport] = useState<boolean>(false)
  const [reportId, setReportId] = useState<string>('')

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      if (selectedSlot) {
        const { bookedPatientsData } = await fetchBookedPatients(selectedSlot)
        console.log(bookedPatientsData)
        setPatientDetails(bookedPatientsData)
      }
    }
    fetchPatients()
  }, [selectedSlot])

  const handleReport = (id: string) => {
    setReportId(id)
  }

  const createRoomHandler = (roomId: string, appointmentId: string, patientId: string, recordId: string) => {
    dispatch(setPatientId(patientId))
    dispatch(setRoomId(roomId))
    dispatch(setRecordId(recordId))
    navigate(`/consult/meeting/${roomId}?appointment=${appointmentId}&slot=${selectedSlot}`)
  }

  const handleMedicalReportUpload = () => {
    console.log('hello world')
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
              <button className={`px-2 text-white  ${patient.recordId?.isCompleted ? 'bg-green-300' : 'bg-orange-300'} rounded-md active:scale-90 duration-300 ${patient.status === 'Completed' ? '' : 'hidden'}`} 
              onClick={() => handleReport(patient.recordId?._id)}>report</button>
              <button className={`px-3 text-white bg-blue-400 rounded-md active:scale-90 duration-300 ${patient.status === 'Scheduled' ? '' : 'hidden'}`} onClick={() => createRoomHandler(patient.roomId, patient.appointmentId, patient.patientDetails._id, patient.recordId._id)}>join</button>
            </div>
          </div>
        ))}
      </div>

      <MedicalRecordProvider recordId={reportId}>{medicalReport && <MedicalRecordForm handleMedicalReportUpload={handleMedicalReportUpload} endCall={true} />}</MedicalRecordProvider>

    </div>

  )
}

export default BookedAppointments

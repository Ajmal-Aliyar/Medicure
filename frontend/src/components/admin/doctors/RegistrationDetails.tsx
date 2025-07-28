import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDoctorType } from '../../../types/doctor/doctorType'
import { RootState } from '../../../store/store'
import { getDoctorDetailsApi } from '../../../sevices/admin/doctorRepository'

function RegistrationDetails () {
    const doctorId = useSelector((state: RootState) => state.manageDoctor)
    const [doctor, setDoctor] = useState<IDoctorType | null>(null)

    useEffect(() => {
        const getDoctorData = async () => {
            const response = await getDoctorDetailsApi(doctorId.selectId)
            const details: IDoctorType = response.data
            setDoctor(details)
        }
        getDoctorData()
    }, [doctorId])

    if (!doctor) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Doctor not found.
      </div>
    );
  }


    const { professional } = doctor
    return (
        <div className="flex flex-col w-full p-6">
            <div className='w-fit flex outline rounded-md'>
                <img src={professional.documents.medicalRegistration} alt="" className='max-h-[200px]' />
            </div>
            
            <div className='grid grid-cols-4 mt-6 font-medium'>
                 <p className='col-span-4 text-lg font-bold text-neutral-600 mb-2'>Registration</p>
                 <p>Registration number</p>
                 <p className='col-span-3'>: {professional.registrationNumber}</p>
                 <p>Registration council</p>
                 <p className='col-span-3'>: {professional.registrationCouncil}</p>
                 <p>Registration year</p>
                 <p className='col-span-3'>: {professional.registrationYear}</p>
            </div>
        </div>
    )
}

export default RegistrationDetails 

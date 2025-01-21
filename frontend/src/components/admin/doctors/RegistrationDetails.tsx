import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDoctorType } from '../../../types/doctor/doctorType'
import { RootState } from '../../../store/store'
import { getDoctorDetailsApi } from '../../../sevices/admin/doctorRepository'

function RegistrationDetails () {
    const doctorId = useSelector((state: RootState) => state.manageDoctor)
    const [doctor, setDoctor] = useState<Partial<IDoctorType>>({})

    useEffect(() => {
        const getDoctorData = async () => {
            const response = await getDoctorDetailsApi(doctorId.selectId)
            const details: IDoctorType = response.data
            setDoctor(details)
        }
        getDoctorData()
    }, [doctorId])
    return (
        <div className="flex flex-col w-full p-6">
            <div className='w-fit flex outline rounded-md'>
                <img src={doctor.medicalRegistration} alt="" className='max-h-[200px]' />
            </div>
            
            <div className='grid grid-cols-4 mt-6 font-medium'>
                 <p className='col-span-4 text-lg font-bold text-neutral-600 mb-2'>Registration</p>
                 <p>Registration number</p>
                 <p className='col-span-3'>: {doctor.registrationNumber}</p>
                 <p>Registration council</p>
                 <p className='col-span-3'>: {doctor.registrationCouncil}</p>
                 <p>Registration year</p>
                 <p className='col-span-3'>: {doctor.registrationYear}</p>
            </div>
        </div>
    )
}

export default RegistrationDetails 

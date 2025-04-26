import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IDoctorType } from '../../../types/doctor/doctorType'
import { RootState } from '../../../store/store'
import { getDoctorDetailsApi } from '../../../sevices/admin/doctorRepository'

function IdentityDetails() {
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
        <div className="flex flex-col w-full  h-[540px]  text-[#16423cc1] p-6">
            <div className='outline w-fit rounded-md'>
                <img src={doctor.identityProof} alt="" className='max-h-[200px]' />
            </div>
            <div className='mt-5'>
                 <p className='col-span-4 text-lg font-bold text-[#16423cc1]'>Specialization</p>
                 <p>{doctor.specialization}</p>
            </div>
            <div className='grid grid-cols-4 mt-4'>
                 <p className='col-span-4 text-lg font-bold text-[#16423cc1]'>Education</p>
                 <p>Degree</p>
                 <p className='col-span-3'>: {doctor.educationDetails?.degree}</p>
                 <p>University</p>
                 <p className='col-span-3'>: {doctor.educationDetails?.university}</p>
                 <p>Year of completion</p>
                 <p className='col-span-3'>: {doctor.educationDetails?.yearOfCompletion}</p>
            </div>
        </div>
    )
}

export default IdentityDetails

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { getDoctorDetailsApi } from '../../../sevices/admin/doctorRepository';
import { IDoctorType } from '../../../types/doctor/doctorType';



const SelectedDoctorDetails: React.FC = () => {
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
        
                <div className="grid grid-cols-12 w-full">
                    <div className='w-full aspect-square col-span-3'>
                        <img src={doctor.profileImage} alt="" className=''/>
                    </div>
                    <div className='w-full col-span-9 p-2 border '>
                        <p className='font-semibold'>Professional Details</p>
                        <div className='grid grid-cols-4'>
                        <p>Full name</p>
                        <p className='col-span-3'>: {doctor.fullName}</p>
                            <p>Email</p>
                            <p className='col-span-3'>: {doctor.email}</p>
                            <p>Phone</p>
                            <p className='col-span-3'>: {doctor.phone}</p>
                            <p>Language</p>
                            <p className='col-span-3'>: {doctor.languageSpoken}</p>
                        </div>
                    </div>
                    <div className='w-full col-span-6 border p-2 h-full'>
                        <p className='font-semibold'>About</p>
                        <p className='text-xs'>{doctor.about}</p>
                    </div>
                    <div className='border w-full aspect-square col-span-6 p-2 h-full'>
                        <p className='font-semibold'>Profile Details</p>
                        <div className='grid grid-cols-4 text-sm'>
                            <p>Headline</p>
                            <p className='col-span-3'>: {doctor.headline}</p>
                            <p>Category</p>
                            <p className='col-span-3'>: {doctor.specialization}</p>
                            <p>Fees</p>
                            <p className='col-span-3'>: {doctor.fees} rs</p>
                            <p className='col-span-4 text-md font-medium mt-2'>Address</p>
                            <p>Line</p>
                            <p className='col-span-3'>: {doctor.address?.addressLine}</p>
                            <p>Street</p>
                            <p className='col-span-3'>: {doctor.address?.streetAddress}</p>
                            <p>City</p>
                            <p className='col-span-3'>: {doctor.address?.city}</p>
                            <p>State</p>
                            <p className='col-span-3'>: {doctor.address?.state}</p>
                            <p>Country</p>
                            <p className='col-span-3'>: {doctor.address?.country}</p>
                            <p>Pincode</p>
                            <p className='col-span-3'>: {doctor.address?.pincode}</p>
                        </div>
                    </div>

                </div>
           
    )
}

export default SelectedDoctorDetails

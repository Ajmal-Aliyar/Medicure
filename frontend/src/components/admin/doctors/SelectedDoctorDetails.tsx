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

        <div className="grid grid-cols-12 gap-2 w-full p-6 bg-[#fafafa] text-[#16423cc1]">

            <div className="col-span-12 flex justify-center gap-2">
                <div className="w-full max-w-[200px] aspect-square rounded-lg overflow-hidden shadow-lg">
                    <img src={doctor.profileImage} alt="Doctor Profile" className="w-full h-full object-cover" />
                </div>


                <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border w-full">

                    <h2 className="text-lg font-sans mb-4 border-b pb-2">Professional Details</h2>
                    <div className="grid grid-cols-4 gap-y-2 text-gray-600  text-sm">
                        <p className="font-medium">Full Name</p>
                        <p className="col-span-3 font-sans">: {doctor.fullName}</p>
                        <p className="font-medium">Email</p>
                        <p className="col-span-3 font-sans ">: {doctor.email}</p>
                        <p className="font-medium">Phone</p>
                        <p className="col-span-3 font-sans">: {doctor.phone}</p>
                        <p className="font-medium">Language</p>
                        <p className="col-span-3 font-sans">: {doctor.languageSpoken}</p>
                    </div>
                </div>

            </div>
            <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border">
                <h2 className="text-lg font-sans mb-4 border-b pb-2">Profile Details</h2>
                <div className="grid grid-cols-4 gap-y-2 text-gray-600 text-sm">
                    <p className="font-medium">Headline</p>
                    <p className="col-span-3 font-sans">: {doctor.headline}</p>
                    <p className="font-medium">Category</p>
                    <p className="col-span-3 font-sans">: {doctor.specialization}</p>
                    <p className="font-medium">Fees</p>
                    <p className="col-span-3 font-sans">: {doctor.fees} rs</p>
                </div>
            </div>



            <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border">
                <h3 className="text-lg font-sans mb-4 border-b pb-2   ">Address</h3>
                <div className="grid grid-cols-4 gap-y-3 mt-2 text-gray-600 text-sm">
                    <p className="font-medium">Line</p>
                    <p className="col-span-3">: {doctor.address?.addressLine}</p>
                    <p className="font-medium">Street</p>
                    <p className="col-span-3">: {doctor.address?.streetAddress}</p>
                    <p className="font-medium">City</p>
                    <p className="col-span-3">: {doctor.address?.city}</p>
                    <p className="font-medium">State</p>
                    <p className="col-span-3">: {doctor.address?.state}</p>
                    <p className="font-medium">Country</p>
                    <p className="col-span-3">: {doctor.address?.country}</p>
                    <p className="font-medium">Pincode</p>
                    <p className="col-span-3">: {doctor.address?.pincode}</p>
                </div>
            </div>

            <div className="col-span-12 bg-white rounded-lg shadow-lg p-6 border">
                <h2 className="text-lg font-sans mb-4 border-b pb-2">About</h2>
                <p className="text-gray-600 text-sm leading-relaxed">{doctor.about}</p>
            </div>
        </div>


    )
}

export default SelectedDoctorDetails

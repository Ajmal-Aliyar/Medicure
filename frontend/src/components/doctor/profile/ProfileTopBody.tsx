import { useSelector } from "react-redux"
import { IDoctorTopProfile } from "../../../types/doctor/profileType"
import { RootState } from "../../../store/store"



const ProfileTopBody:React.FC<IDoctorTopProfile> = ({setEditProfile}) => {
    const doctor = useSelector((state:RootState) => state.doctor)

    return (
        <>
            <div className="col-span-8 md:col-span-3 flex items-center justify-center " onClick={() => setEditProfile('editImage')}>
                <img src={doctor?.profileImage} alt={doctor?.fullName} className=" w-full object-cover rounded-md  shadow-lg border-4 border-white" />
            </div>

            <div className="col-span-4 md:col-span-6 bg-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-3xl text-[#0c0b3eb5]">{doctor?.fullName}</p>
                <p className="text-xl text-gray-700 mt-2">{doctor?.headline}</p>
                <p className="text-md text-gray-500 ">{`${doctor?.address?.city}, ${doctor?.address?.state}, ${doctor?.address?.country}`}</p>
                <p className="font-semibold text-sm text-gray-700 mt-2">500+ Consults</p>
                <button className="mt-3 px-5 py-1 text-blue-300 border-2 border-blue-300 rounded-full font-semibold transition-all active:scale-95" onClick={() => setEditProfile('editProfile')}>Edit Profile Section</button>
            </div>
            <div className="bg-white col-span-3 rounded-md shadow-md">
                <p>Personal Details</p>
                <p>{doctor?.email}</p>
                <p>{doctor?.dob}</p>
                <p>{doctor?.phone}</p>
                <p>{doctor?.registrationNumber}</p>
                <p>{doctor?.email}</p>
            </div>

            <div className="col-span-12 bg-white p-6 rounded-lg shadow-lg">
                <p className="font-bold text-2xl mb-4 text-[#0c0b3eb5]">About Me</p>
                <p className="text-gray-700 leading-relaxed">{doctor?.about}</p>
            </div>
        </>
    )
}

export default ProfileTopBody

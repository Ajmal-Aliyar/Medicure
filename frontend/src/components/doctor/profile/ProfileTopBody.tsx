import { useSelector } from "react-redux"
import { IDoctorTopProfile } from "../../../types/doctor/profileType"
import { RootState } from "../../../store/store"




const ProfileTopBody: React.FC<IDoctorTopProfile> = ({ setEditProfile }) => {
    const doctor = useSelector((state: RootState) => state.doctor)

    return (
        <>
            <div className="firstCard col-span-8 md:col-span-3 flex items-center justify-center " onClick={() => setEditProfile('editImage')}>
                <img src={doctor?.profileImage || 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1737173758/sk7hria3ngkaujeywrjy.png'} alt={doctor?.fullName} className=" w-full object-cover rounded-md  shadow-lg border-4 border-white" />
            </div>
            <div className="secondCard col-span-4 md:col-span-6 bg-white p-6 rounded-lg shadow-lg relative">
                <div className="absolute right-0 top-0 m-2 bg-blue-200 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-medium">
                    ⭐ {doctor?.rating}%
                </div>

                <p className="font-bold text-3xl text-[#0c0b3eb5]">{doctor?.fullName}</p>
                <p className="text-xl text-gray-700 mt-2">{doctor?.headline}</p>
                <p className="text-md text-gray-500 ">{`${doctor?.address?.city}, ${doctor?.address?.state}, ${doctor?.address?.country}`}</p>
                <p className="font-semibold text-sm text-gray-700 mt-2">500+ Consults</p>
                <button className="mt-3 px-5 py-1 text-blue-300 border-2 border-blue-300 rounded-full font-semibold transition-all active:scale-95" onClick={() => setEditProfile('editProfile')}>Edit Profile Section</button>
            </div>
            <div className="thirdCard bg-white col-span-3 rounded-md shadow-md ">
                <p className="text-lg font-semibold text-[#0c0b3eb5] px-2 py-1 border-b-2 flex justify-between cursor-pointer">Personal Details</p>
                <div className="p-2 overflow-x-auto whitespace-nowrap flex flex-col h-full gap-1">
                    <p><span className="font-medium">Email:</span> {doctor?.email}</p>
                    <p><span className="font-medium">DOB:</span> {doctor?.dob}</p>
                    <p><span className="font-medium">Phone:</span> {doctor?.phone}</p>
                    <p><span className="font-medium">RNo:</span> {doctor?.registrationNumber}</p>
                    <p><span className="font-medium">Gender:</span> {doctor?.gender}</p>
                    <p><span className="font-medium">Experience:</span> {doctor?.yearsOfExperience}</p>

                </div>

            </div>

            <div className="secondCard col-span-12 bg-white p-6 rounded-lg shadow-lg ">
                <p className="font-bold text-2xl mb-4 text-[#0c0b3eb5]">About Me</p>
                <p className="text-gray-700 leading-relaxed">{doctor?.about}</p>
            </div>


        </>
    )
}

export default ProfileTopBody

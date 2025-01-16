import EditProfileSection from "../../components/doctor/profile/EditProfileSection"
import EditProfilePortal from "../../components/doctor/profile/EditProfilePortal"
import ProfileTopBody from "../../components/doctor/profile/ProfileTopBody"
import Achievements from "../../components/doctor/profile/achievements"
import Experience from "../../components/doctor/profile/Experience"
import { getProfileDetails } from "../../sevices/doctor/profile"
import Reviews from "../../components/doctor/profile/Reviews"
import Slots from "../../components/doctor/profile/Slots"
import { useEffect, useState } from "react"



function Profile() {
    let [doctor, setDoctor] = useState<any>({})
    const [editProfile, setEditProfile] = useState<boolean>(false)

    useEffect(() => {
        const getDoctorData = async () => {
            const response = await getProfileDetails()
            const { doctorData } = response.data
            console.log(doctorData, doctor.fullName)
            setDoctor(doctorData)
        }
        getDoctorData()
    }, [])

    return (
        <div className='h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md'>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full max-w-5xl pt-20 ">

                <ProfileTopBody setEditProfile={setEditProfile} doctor={doctor} />
                <Slots />
                <Experience />
                <Achievements />
                <Reviews />

                <div className="h-10"></div>
            </div>
            {editProfile && (
                <EditProfilePortal>
                    <EditProfileSection setEditProfile={setEditProfile} doctor={doctor} />
                </EditProfilePortal>
            )}

        </div>
    )
}

export default Profile

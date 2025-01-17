import EditProfileSection from "../../components/doctor/profile/EditProfileSection"
import EditProfilePortal from "../../components/doctor/profile/EditProfilePortal"
import ProfileTopBody from "../../components/doctor/profile/ProfileTopBody"
import Education from "../../components/doctor/profile/Education"
import Experience from "../../components/doctor/profile/Experience"
import { getProfileDetails } from "../../sevices/doctor/profile"
import Reviews from "../../components/doctor/profile/Reviews"
import Slots from "../../components/doctor/profile/Slots"
import { useEffect, useState } from "react"
import { fetchSlotDetails } from "../../sevices/appointment/slot"
import ImageUploader from "../../components/doctor/profile/EditProfileImage"
import { useDispatch, useSelector } from "react-redux"
import { setProfileData } from "../../store/slices/doctorSlices/profileSlice"
import { RootState } from "../../store/store"
import AppointmentSetUp from "../../components/doctor/appointments/AppointmentSetUp"
import ModalAnimation from "../../components/doctor/verify-details/ModalAnimation"
import { setFees, setSlotData } from "../../store/slices/doctorSlices/slotSlice"
import { ISlotSlice } from "../../types/slot/fetchSlot"



function Profile() {
    let doctor = useSelector((state:RootState) => state.doctor)
    const [editProfile, setEditProfile] = useState<string>('')
    const [loading, setLoading] =useState(false)
    const dispatch = useDispatch()


    useEffect(() => {
        const getDoctorAndSlotData = async () => {
            try {
                const [doctorResponse, slotResponse] = await Promise.all([
                    getProfileDetails(),
                    fetchSlotDetails()
                ]);
                const { doctorData } = doctorResponse.data;
                const  slotData: ISlotSlice  = slotResponse
                dispatch(setProfileData(doctorData))
                dispatch(setSlotData(slotData.slots))
                dispatch(setFees(slotData.fees))
                console.log(doctorData, slotData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getDoctorAndSlotData();
    }, []);


    return (
        <div className='h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md'>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full max-w-5xl pt-20 ">

                <ProfileTopBody setEditProfile={setEditProfile}/>
                <Slots setEditProfile={setEditProfile}/>
                <Education />
                <Experience />
                <Reviews />

                <div className="h-10"></div>
            </div>
            {editProfile && editProfile !== 'editSlot' && (
                <EditProfilePortal onClose={setEditProfile}>
                    {editProfile === 'editProfile' && <EditProfileSection setEditProfile={setEditProfile}/>}
                    {editProfile === 'editImage' && <ImageUploader setEditProfile={setEditProfile} profileImage={doctor?.profileImage} />}
                </EditProfilePortal>
            )}
            {editProfile === 'editSlot' &&
                <ModalAnimation onClose={setEditProfile}>
                    <AppointmentSetUp handleModal={setEditProfile} setLoading={setLoading}/>
                </ModalAnimation>
            }
            

        </div>
    )
}

export default Profile

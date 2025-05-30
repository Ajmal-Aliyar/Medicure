import AppointmentSetUp from "../../components/doctor/appointments/AppointmentSetUp"
import EditProfileSection from "../../components/doctor/profile/EditProfileSection"
import EditProfilePortal from "../../components/doctor/profile/EditProfilePortal"
import ModalAnimation from "../../components/doctor/verify-details/ModalAnimation"
import { setFees, setSlotData } from "../../store/slices/doctorSlices/slotSlice"
import { setProfileData } from "../../store/slices/doctorSlices/profileSlice"
import ImageUploader from "../../components/doctor/profile/EditProfileImage"
import ProfileTopBody from "../../components/doctor/profile/ProfileTopBody"
import Experience from "../../components/doctor/profile/Experience"
import { fetchSlotDetails } from "../../sevices/slot/slot"
import Education from "../../components/doctor/profile/Education"
import { getProfileDetails, updateDoctorProfileImageReff } from "../../sevices/doctor/profile"
import Reviews from "../../components/doctor/profile/Reviews"
import Slots from "../../components/doctor/profile/Slots"
import { ISlotSlice } from "../../types/slot/fetchSlot"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"
import ProfileAnimation from "../../components/doctor/profile/ProfileAnimation"
import { setLoading } from "../../store/slices/commonSlices/notificationSlice"



function Profile() {
    let doctor = useSelector((state: RootState) => state.doctor)
    const [editProfile, setEditProfile] = useState<string>('')
    const dispatch = useDispatch()

    


    useEffect(() => {
        const getDoctorAndSlotData = async () => {
            try {
                dispatch(setLoading(true))
                const [ doctorData, slotResponse] = await Promise.all([
                    getProfileDetails(),
                    fetchSlotDetails()
                ]);
                const slotData: ISlotSlice = slotResponse
                dispatch(setProfileData(doctorData))
                dispatch(setSlotData(slotData.slots))
                dispatch(setFees(slotData.fees))
                console.log(doctorData, slotData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                dispatch(setLoading(false))
            }
        };
        getDoctorAndSlotData();
    }, []);

    const requestUpdateProfileImage  = async (imageId: string) => {
        await updateDoctorProfileImageReff(imageId)
    }


    return (
        <div className='h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md content '>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full max-w-5xl">

                <ProfileTopBody setEditProfile={setEditProfile} />
                <Slots setEditProfile={setEditProfile} />
                <Education />
                <Experience />
                <Reviews />

                <div className="h-20"></div>
            </div>
            { editProfile && editProfile !== 'editSlot' ? (
                <EditProfilePortal onClose={setEditProfile}>
                    {(editProfile === 'editProfile' || !doctor?.headline || !doctor?.fullName || !doctor?.dob || !doctor?.gender) &&
                        <EditProfileSection setEditProfile={setEditProfile} />}
                    {editProfile === 'editImage' && <ImageUploader setEditProfile={setEditProfile} profileImage={doctor?.profileImage} requestUpdateProfileImage={requestUpdateProfileImage} />}
                </EditProfilePortal>
            ) : null}

            {editProfile === 'editSlot' && (
                <ModalAnimation onClose={setEditProfile}>
                    <AppointmentSetUp handleModal={setEditProfile}  />
                </ModalAnimation>
            )}
            <ProfileAnimation />

        </div>
    )
}

export default Profile

import AppointmentSetUp from "../../components/doctor/appointments/AppointmentSetUp"
import EditProfileSection from "../../components/doctor/profile/EditProfileSection"
import EditProfilePortal from "../../components/doctor/profile/EditProfilePortal"
import ModalAnimation from "../../components/doctor/verify-details/ModalAnimation"
import { setFees, setSlotData } from "../../store/slices/doctorSlices/slotSlice"
import { setProfileData } from "../../store/slices/doctorSlices/profileSlice"
import ImageUploader from "../../components/doctor/profile/EditProfileImage"
import ProfileTopBody from "../../components/doctor/profile/ProfileTopBody"
import Experience from "../../components/doctor/profile/Experience"
import { fetchSlotDetails } from "../../sevices/appointment/slot"
import Education from "../../components/doctor/profile/Education"
import { getProfileDetails } from "../../sevices/doctor/profile"
import Reviews from "../../components/doctor/profile/Reviews"
import Slots from "../../components/doctor/profile/Slots"
import { ISlotSlice } from "../../types/slot/fetchSlot"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"



function Profile() {
    let doctor = useSelector((state: RootState) => state.doctor)
    const [editProfile, setEditProfile] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.from('.firstCard', {
            x:100,
            opacity:0,
            duration:1
        })
        tl.from('.secondCard', {
            x:100,
            opacity:0,
            duration:1
        },'-=0.8')
        tl.from('.thirdCard', {
            x:100,
            opacity:0,
            duration:1
        },'-=0.9')
    })


    useEffect(() => {
        const getDoctorAndSlotData = async () => {
            try {
                const [doctorResponse, slotResponse] = await Promise.all([
                    getProfileDetails(),
                    fetchSlotDetails()
                ]);
                const { doctorData }:any = doctorResponse.data;
                const slotData: ISlotSlice = slotResponse
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
        <div className='h-screen w-full p-4 flex justify-center overflow-y-auto rounded-md content'>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 w-full max-w-5xl pt-20 ">

                <ProfileTopBody setEditProfile={setEditProfile} />
                <Slots setEditProfile={setEditProfile} />
                <Education />
                <Experience />
                <Reviews />

                <div className="h-10"></div>
            </div>
            {(!doctor?.headline || !doctor?.fullName || !doctor?.dob || !doctor?.gender) || (editProfile && editProfile !== 'editSlot') ? (
                <EditProfilePortal onClose={setEditProfile}>
                    {(editProfile === 'editProfile' || !doctor?.headline || !doctor?.fullName || !doctor?.dob || !doctor?.gender) &&
                        <EditProfileSection setEditProfile={setEditProfile} />}
                    {editProfile === 'editImage' && <ImageUploader setEditProfile={setEditProfile} profileImage={doctor?.profileImage} />}
                </EditProfilePortal>
            ) : null}

            {editProfile === 'editSlot' && (
                <ModalAnimation onClose={setEditProfile}>
                    <AppointmentSetUp handleModal={setEditProfile} setLoading={setLoading} />
                </ModalAnimation>
            )}


        </div>
    )
}

export default Profile

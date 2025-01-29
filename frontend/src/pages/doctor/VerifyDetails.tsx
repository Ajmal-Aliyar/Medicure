import ProfileVerificationForm from '../../components/doctor/verify-details/ProfileVerificationForm';
import ProfileDetailsForm from '../../components/doctor/verify-details/ProfileDetailsForm';
import AppointmentSetUp from '../../components/doctor/appointments/AppointmentSetUp';
import ModalAnimation from '../../components/doctor/verify-details/ModalAnimation';
import Animation from '../../components/doctor/verify-details/Animation';
import Content from '../../components/doctor/verify-details/Content';
import Banner from '../../components/doctor/verify-details/Banner';
import HoneyComb from '../../components/common/HoneyComb';
import { useEffect, useState } from 'react';
import EditProfilePortal from '../../components/doctor/profile/EditProfilePortal';
import ImageUploader from '../../components/doctor/profile/EditProfileImage';
import EditProfileSection from '../../components/doctor/profile/EditProfileSection';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileDetails, updateProfileImageApi } from '../../sevices/doctor/profile';
import { fetchSlotDetails } from '../../sevices/appointment/slot';
import { ISlotSlice } from '../../types/slot/fetchSlot';
import { setProfileData } from '../../store/slices/doctorSlices/profileSlice';
import { setFees, setSlotData } from '../../store/slices/doctorSlices/slotSlice';
import { RootState } from '../../store/store';

function VerifyDetails() {
    const [isModalOpen, setIsModalOpen] = useState<string>('');

    let doctor = useSelector((state: RootState) => state.doctor)
    const dispatch = useDispatch()

    const [loading, setLoading] = useState<boolean>(false)

    const handleModal = (val: string) => {
        setIsModalOpen(val);
    };

    useEffect(() => {
        const getDoctorAndSlotData = async () => {
            try {
                const [doctorResponse, slotResponse] = await Promise.all([
                    getProfileDetails(),
                    fetchSlotDetails()
                ]);
                const { doctorData }: any = doctorResponse.data;
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

    const requestUpdateProfileImage = async (imageId: string) => {
        await updateProfileImageApi(imageId)
    }

    return (
        <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-gray-200 to-white overflow-hidden font-sans ">
            <Banner />
            <Content handleModal={handleModal} />

            {isModalOpen === 'Profile Image' && 
            <EditProfilePortal onClose={setIsModalOpen}>
                <ImageUploader setEditProfile={setIsModalOpen} profileImage={doctor?.profileImage} requestUpdateProfileImage={requestUpdateProfileImage} />
            </EditProfilePortal>}
            {isModalOpen === 'Profile Details' &&
                <EditProfilePortal onClose={setIsModalOpen}>
                    <EditProfileSection setEditProfile={setIsModalOpen} />
                </EditProfilePortal>
            }
            {isModalOpen === 'Professional Details' && (
                <ModalAnimation onClose={handleModal}>
                    <ProfileDetailsForm handleModal={handleModal} setLoading={setLoading} />
                </ModalAnimation>
            )}
            {isModalOpen === 'Profile Verification' && (
                <ModalAnimation onClose={handleModal}>
                    <ProfileVerificationForm handleModal={handleModal} setLoading={setLoading} />
                </ModalAnimation>
            )}
            {isModalOpen === 'Appointments Setup' && (
                <ModalAnimation onClose={handleModal}>
                    <AppointmentSetUp handleModal={handleModal} setLoading={setLoading} />
                </ModalAnimation>
            )}






            <div className={`${loading ? 'z-50' : 'opacity-0 -z-50 '}  transition-all duration-300 bg-[#b7b7b75b] fixed top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
                <HoneyComb />
            </div>
            <Animation />
        </div>
    );
}

export default VerifyDetails;

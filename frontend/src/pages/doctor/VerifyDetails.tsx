import { useState } from 'react';
import Banner from '../../components/doctor/verify-details/Banner';
import Content from '../../components/doctor/verify-details/Content';
import ProfileDetailsForm from '../../components/doctor/verify-details/ProfileDetailsForm';
import ModalAnimation from '../../components/doctor/verify-details/ModalAnimation';
import ProfileVerificationForm from '../../components/doctor/verify-details/ProfileVerificationForm';
import Animation from '../../components/doctor/verify-details/Animation';
import AppointmentSetUp from '../../components/doctor/verify-details/AppointmentSetUp';
import HoneyComb from '../../components/common/HoneyComb';

function VerifyDetails() {
    const [loading, setLoading] = useState<boolean>(false)
    const [isModalOpen, setIsModalOpen] = useState<string>('');

    const handleModal = (val: string) => {
        setIsModalOpen(val);
    };

    return (
        <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-gray-200 to-white overflow-hidden font-sans ">
            <Banner />
            <Content handleModal={handleModal} />

            {isModalOpen === 'Profile Details' && (
                <ModalAnimation onClose={handleModal}>
                    <ProfileDetailsForm handleModal={handleModal} setLoading={setLoading}/>
                </ModalAnimation>
            )}
            {isModalOpen === 'Profile Verification' && (
                <ModalAnimation onClose={handleModal}>
                    <ProfileVerificationForm handleModal={handleModal} setLoading={setLoading}/>
                </ModalAnimation>
            )}
            {isModalOpen === 'Appointments Setup' && (
                <ModalAnimation onClose={handleModal}>
                    <AppointmentSetUp handleModal={handleModal} setLoading={setLoading}/>
                </ModalAnimation>
            )}
            <div className={`${loading ? '' : 'opacity-0 -z-50 '}  transition-all duration-300 bg-[#b7b7b75b] absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
                <HoneyComb />
            </div>
            <Animation />
        </div>
    );
}

export default VerifyDetails;

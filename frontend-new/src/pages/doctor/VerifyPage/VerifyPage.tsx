import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { AddProfile, Banner, Content, EditProfilePortal, ImageUploader, ProfessionalDetails, SwipeModal } from "./components";
import { ProofsDetails } from "./components/ProofDetails";
import { doctorService } from "@/services/api/doctor/doctor";
import { updateDoctorProfile } from "@/slices/doctorSlice";


export const VerifyPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<string>('');

    let doctor = useSelector((state: RootState) => state.doctor)
    const dispatch = useDispatch()


    const handleModal = (val: string) => {
        setIsModalOpen(val);
    };

    useEffect(() => {
        const getDoctorAndSlotData = async () => {
            try {
                const {doctor} = await doctorService.getProfileDetails()      
                dispatch(updateDoctorProfile(doctor))
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getDoctorAndSlotData();
    }, []);

    const requestUpdateProfileImage = async (imageId: string) => {
        await doctorService.updateProfileImage(imageId)
    }

    return (
        <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-gray-200 to-white overflow-hidden font-sans ">
            <Banner />
            <Content handleModal={handleModal} />

            {isModalOpen === 'Profile Image' &&
                <EditProfilePortal onClose={setIsModalOpen}>
                    <ImageUploader setEditProfile={setIsModalOpen} profileImage={doctor?.profileImage} requestUpdateProfileImage={requestUpdateProfileImage}/>
                </EditProfilePortal>}
            {isModalOpen === 'Profile Details' &&
                <EditProfilePortal onClose={setIsModalOpen}>
                    <AddProfile setEditProfile={setIsModalOpen} />
                </EditProfilePortal>
            }
            {isModalOpen === 'Professional Details' && (
                <SwipeModal onClose={handleModal}>
                    <ProfessionalDetails handleModal={handleModal} />
                 </SwipeModal>
            )}
            {isModalOpen === 'Profile Verification' && (
                <SwipeModal onClose={handleModal}>
                    <ProofsDetails handleModal={handleModal}  />
                </SwipeModal>
            )}
        </div>
    );
}


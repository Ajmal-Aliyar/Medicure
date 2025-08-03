import type { ProfileState } from '@/slices/doctorSlice'
import { AddProfile, EditProfilePortal, ImageUploader } from '../../VerifyPage/components'
import { useState } from 'react';
import { SquareArrowOutUpRight } from 'lucide-react';
import { doctorService } from '@/services/api/doctor/doctor';
import { DEFAULT_IMAGE } from '@/app/constants';

const MainProfile = ({ doctor }: { doctor: ProfileState | null }) => {
    const [isModalOpen, setIsModalOpen] = useState<string>('');

    const requestUpdateProfileImage = async (imageId: string) => {
        await doctorService.updateProfileImage(imageId)
    }
    return (
        <>
            <div className="bg-white rounded-md shadow-md p-2 aspect-square flex items-center justify-center relative">
                <SquareArrowOutUpRight className='absolute top-1 right-1 rounded-md p-[2px] text-primary bg-white cursor-pointer hover:text-primary-dark' size={16} onClick={() => setIsModalOpen("Profile Image")} />
                <img
                    src={doctor?.profileImage || DEFAULT_IMAGE}
                    alt="Doctor"
                    className="object-cover rounded-md w-full h-full"
                />
            </div>

            <div className="bg-white rounded-md rounde-mdd-tr-md shadow p-4 col-span-1 md:col-span-1 lg:col-span-3 relative">
                <div className="absolute right-0 top-0 m-2 bg-blue-200 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm font-medium">
                    ⭐ {doctor?.rating.average}%
                </div>

                <p className="font-bold text-3xl text-secondary">
                    {doctor?.fullName}
                </p>
                <p className="text-xl text-gray-700 mt-2">
                    {doctor?.headline}
                </p>
                <p className="text-md text-gray-500 ">
                    {`${doctor?.address?.city}, ${doctor?.address?.state}, ${doctor?.address?.country}`}
                </p>
                <p className="text-xs text-gray-500 ">
                    {doctor?.languageSpoken.join(', ')}
                </p>
                <button className="mt-3 px-5 py-1 text-primary-light border-2 border-primary-light rounded-full font-semibold transition-all active:scale-95" onClick={() => setIsModalOpen('Profile Details')}>Edit Profile Section</button>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 col-span-1 md:col-span-2">
                <p className="text-lg font-semibold mb-2 text-secondary">Personal Details</p>
                <div className="p-2 overflow-x-auto whitespace-nowrap flex flex-col h-full gap-1">
                    <p>Email: <span className="text-sm text-gray-600">{doctor?.email}</span> </p>
                    <p>DOB: <span className="text-sm text-gray-600">{doctor?.dob}</span> </p>
                    <p>RNo: <span className="text-sm text-gray-600">{doctor?.registrationNumber}</span> </p>
                    <p>Gender: <span className="text-sm text-gray-600">{doctor?.gender}</span> </p>
                    <p>Experience: <span className="text-sm text-gray-600"> {doctor?.experience}</span></p>

                </div>
            </div>

            <div className="bg-white rounded-md shadow-md p-4 col-span-1 md:col-span-2">
                <p className="text-lg font-semibold mb-2 text-secondary">About Me</p>
                <p className="text-sm text-gray-600 leading-relaxed">{doctor?.about}</p>
            </div>

            {isModalOpen != '' &&
                <EditProfilePortal onClose={setIsModalOpen}>
                    {isModalOpen === 'Profile Details' &&
                        <AddProfile setEditProfile={setIsModalOpen} />}
                    {isModalOpen === 'Profile Image' && <ImageUploader setEditProfile={setIsModalOpen} profileImage={doctor?.profileImage || ""} requestUpdateProfileImage={requestUpdateProfileImage} />}
                </EditProfilePortal>
            }


        </>
    )
}

export default MainProfile
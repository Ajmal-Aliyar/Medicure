import { useState } from 'react'
import { validateEmail } from '../../../utils/validate/authValidate';
import { IPatientProfilePayload } from '../../../types/patient/profileType';
import EditProfilePortal from '../../doctor/profile/EditProfilePortal';
import ImageUploader from '../../doctor/profile/EditProfileImage';
import { updateProfileImageApi } from '../../../sevices/patient/profile';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSuccess } from '../../../store/slices/commonSlices/notificationSlice';
import { setPatientProfileData } from '../../../store/slices/patientSlices/profileSlice';
import { RootState } from '../../../store/store';



const ProfileTopBody: React.FC = () => {
    const patientData = useSelector((state: RootState) => state.patient)
    const [editProfile, setEditProfile] = useState<string>('')
    const [email, setEmail] = useState(patientData.email);
    const [mobile, setmobile] = useState(patientData.phone);
    const [emailFocused, setEmailFocused] = useState(true);
    const [mobileFocused, setMobileFocused] = useState(true);
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        mobile: '',
    })
    const dispatch = useDispatch()

    const handleErrorMessage = (id: string, value: string) => {
        if (id === 'email') {
            setEmail(value)
            const nameM = validateEmail(value)
            setErrorMessage((prev) => ({
                ...prev,
                name: nameM || '',
            }));
        } else if (id === 'mobile') {
            setmobile(value);
        }
    };

    const requestUpdateProfileImage = async (imageId: string) => {
        try {
            const response = await updateProfileImageApi(imageId);
            if (response?.data) {
                dispatch(setSuccess(response.data.message));
                dispatch(setPatientProfileData({ profileImage: imageId }))
            }
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.';
            dispatch(setError(errorMessage));
        }
    };



    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6  flex flex-col items-center">
                <div className="max-w-[150px] w-full rounded-full border-2 border-[#0c0b3eb5] aspect-square m-4" onClick={() => setEditProfile('editProfile')}>
                    <img
                        src={ patientData?.profileImage || 'https://res.cloudinary.com/dwyxogyrk/image/upload/v1737173758/sk7hria3ngkaujeywrjy.png'}
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover"
                    />
                </div>
                <p className="text-lg font-medium">{patientData.fullName}</p>
            </div>
            <div className="flex col-span-12 lg:col-span-6 flex-col justify-center gap-y-4 h-full pb-5 items-center lg:items-start">

                <div className='relative max-w-[300px]'>
                    <input
                        type="text"
                        disabled
                        id="email"
                        value={patientData.email}
                        className={`w-full p-3 ${emailFocused || email ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-[#f9f9f9] outline-none text-[#0c0b3eb5] text-base rounded-bl-lg transition duration-300`}
                        onFocus={() => setEmailFocused(true)}
                        onChange={(e) => handleErrorMessage('email', e.target.value)}
                        onBlur={(e) => e.target.value === '' ? setEmailFocused(false) : ''}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute transform -translate-y-4 text-[10px] uppercase tracking-[0.1em] left-4 pointer-events-none text-[#0c0b3eb5] bg-[#f9f9f9] rounded-lg px-2 py-1 top-1`}
                    >
                        <p className={`${emailFocused || email !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>
                            Email
                        </p>
                    </label>
                    <p className={`${errorMessage.email !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.email}</p>
                </div>


                <div className='relative max-w-[300px]'>
                    <input
                        type="text"
                        id='phone'
                        disabled
                        value={patientData.phone}
                        className={`w-full p-3 ${mobileFocused || mobile ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-[#f9f9f9] outline-none text-[#0c0b3eb5] text-base rounded-bl-lg transition duration-300`}
                        onFocus={() => setMobileFocused(true)}
                        onChange={(e) => handleErrorMessage('mobile', e.target.value)}
                        onBlur={(e) => e.target.value === '' ? setMobileFocused(false) : ''}
                    />
                    <label
                        htmlFor="phone"
                        className={`absolute transform -translate-y-4 text-[10px] uppercase tracking-[0.1em] left-4 pointer-events-none text-[#0c0b3eb5] bg-[#f9f9f9] rounded-lg px-2 py-1 top-1`}
                    >
                        <p className={`${mobileFocused || mobile !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>
                            mobile
                        </p>
                    </label>
                </div>

            </div>
            {editProfile === 'editProfile' &&
                <EditProfilePortal onClose={setEditProfile}>
                    <ImageUploader setEditProfile={setEditProfile} profileImage={patientData?.profileImage} requestUpdateProfileImage={requestUpdateProfileImage} />
                </EditProfilePortal>
            }
        </div>
    )
}

export default ProfileTopBody

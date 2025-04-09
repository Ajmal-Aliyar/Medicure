import { useEffect, useState } from 'react'
import { getProfileDetails, IProfile } from '../../../sevices/doctor/profile'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setProfileData } from '../../../store/slices/doctorSlices/profileSlice'
import { setError, setLoading } from '../../../store/slices/commonSlices/notificationSlice'

function ProfileCard() {
    const [profileDetails, setProfileDetails] = useState<IProfile>({ fullName: '', profileImage: '', })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchProfileDetails = async () => {
            try {
                const profile = await getProfileDetails()
                setProfileDetails(profile)
                dispatch(setProfileData(profile))
            } catch (error: unknown) {
                let message = 'Something went wrong'
                if (error instanceof Error) {
                    message = error.message
                }
                dispatch(setError(message))
            }finally {
                setLoading(false)
            }
        }

        fetchProfileDetails()
    }, [])

    return (
        <div className="w-full  bg-white rounded-lg shadow-lg flex flex-col items-center gap-2 p-4">
            <img src={profileDetails.profileImage} className=' h-[100px] rounded-md mt-2' alt="" />
            <p className='font-semibold text-lg text-[#0c0b3eb5]'>{profileDetails?.fullName}</p>
            <p className='underline font-medium text-[13px] text-center -mt-3 text-blue-400 cursor-pointer'
                onClick={() => navigate('/doctor/profile')}>view profile</p>
            <div className="w-full border-t-2 border-[#dddbdb59]  "></div>
            <div className='w-full'>
                <p className='text-[#0c0b3e92] my-2'>150 Appointments</p>

                <p className='text-[#0c0b3e7a] text-xs -mb-1'>Total Appointments</p>
                <div className='flex justify-center items-center mb-2'>
                    <div className="w-full bg-[#dddbdbb0] rounded-full">
                        <div className='w-[40%] h-1 bg-[#1d1556bf] rounded-full'></div>
                    </div>
                    <p className='ml-2 text-xs text-[#1d155696]'>50/120</p>
                </div>

                <p className='text-[#0c0b3e7a] text-xs -mb-1'>Finished Appointments</p>
                <div className='flex justify-center items-center mb-2'>
                    <div className="w-full bg-[#dddbdbb0] rounded-full">
                        <div className='w-[90%] h-1 bg-[#1d1556bf] rounded-full'></div>
                    </div>
                    <p className='ml-2 text-xs text-[#1d155696]'>45/50</p>
                </div>

                <p className='text-[#0c0b3e7a] text-xs -mb-1'>Pending Appointments</p>
                <div className='flex justify-center items-center'>
                    <div className="w-full bg-[#dddbdbb0] rounded-full">
                        <div className='w-[10%] h-1 bg-[#1d1556bf] rounded-full'></div>
                    </div>
                    <p className='ml-2 text-xs text-[#1d155696]'>5/50</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard

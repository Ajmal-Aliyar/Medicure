import SlideMenu from '../../components/doctor/dashboard/SlideMenu';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../store/store';
import ModalAnimation from '../../components/doctor/verify-details/ModalAnimation';
import AppointmentSetUp from '../../components/doctor/appointments/AppointmentSetUp';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function DoctorLayout() {
    const {profileImage, fullName} = useSelector((state: RootState) => state.doctor)
    const [editProfile, setEditProfile] = useState<string>('')

    useGSAP(() => {
        const tl = gsap.timeline()
        tl.to('.trans', {
            x: -23,
            opacity:1,
            duration:1,
            width: '24px'
        })
    })
    return (
        <div className='w-[100%] h-[100vh] bg-[#F5F5F5] relative  flex flex-col lg:flex-row overflow-'>

            <SlideMenu />
            <div className='w-full flex-col relative h-screen overflow-y-auto'>
                <div className=' h-[8vh] flex justify-between items-center bg-white shadow-sm rounded-md m-2 mx-4 sticky top-0 left-0 right-0 p-2 px-4 z-10 overflow-hidden'>
                <div className='w-4 h-[10vh] bg-blue-300 absolute rotate-12 trans opacity-0 translate-x-10'></div>
                    {/* <div className='bg-gray-300 h-full w-80 rounded-full'></div> */}
                    <p className='text-[#0c0b3eb5] font-bold text-lg z-10'>.{fullName}</p>
                    <div className='flex justify-center items-center gap-3'>
                        <div className='px-3 py-1    text-[#88bee7] border-2 border-blue-300 rounded-full font-semibold transition-all active:scale-95 cursor-pointer'
                        onClick={() => setEditProfile('editSlot')}>add slot</div>
                        <div className='bg-gray-300 h-[6vh] aspect-square rounded-full overflow-hidden'>
                            <img src={profileImage} alt="" />
                        </div>
                    </div>
                </div>
                <div className='w-full flex p-2 h-full'>
                    <Outlet />
                </div>

            </div>
            {editProfile === 'editSlot' && (
                <ModalAnimation onClose={setEditProfile}>
                    <AppointmentSetUp handleModal={setEditProfile}/>
                </ModalAnimation>
            )}

        </div>
    )
}

export default DoctorLayout

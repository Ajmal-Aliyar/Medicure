import SlideMenu from '../../components/doctor/dashboard/SlideMenu';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../store/store';
import ModalAnimation from '../../components/doctor/verify-details/ModalAnimation';
import AppointmentSetUp from '../../components/doctor/appointments/AppointmentSetUp';
import { useState } from 'react';


function DoctorLayout() {
    const img = useSelector((state: RootState) => state.doctor.profileImage)
    const [editProfile, setEditProfile] = useState<string>('')
    const [loading, setLoading] = useState(false)
    return (
        <div className='w-[100%] h-[100vh] bg-[#F5F5F5] relative  flex flex-col lg:flex-row overflow-'>

            <SlideMenu />
            <div className='w-full flex-col relative'>
                <div className=' h-[8vh] flex justify-between  bg-white shadow-sm rounded-md m-2 mx-4 sticky top-0 left-0 right-0 p-2 px-4 z-10 '>
                    <div className='bg-gray-300 h-full w-80 rounded-full'></div>
                    <div className='flex justify-center items-center gap-3'>
                        <div className='px-3 py-1    text-blue-300 border-2 border-blue-300 rounded-full font-semibold transition-all active:scale-95 cursor-pointer'
                        onClick={() => setEditProfile('editSlot')}>+ Add Slot</div>
                        <div className='bg-gray-300 h-full aspect-square rounded-full overflow-hidden'>
                            <img src={img} alt="" />
                        </div>
                    </div>
                </div>
                <div className='w-full flex p-2 h-[90vh]'>
                    <Outlet />
                </div>

            </div>
            {editProfile === 'editSlot' && (
                <ModalAnimation onClose={setEditProfile}>
                    <AppointmentSetUp handleModal={setEditProfile} setLoading={setLoading} />
                </ModalAnimation>
            )}

        </div>
    )
}

export default DoctorLayout

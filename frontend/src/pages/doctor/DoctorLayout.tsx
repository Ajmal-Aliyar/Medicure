import SlideMenu from '../../components/doctor/SlideMenu';
import 'font-awesome/css/font-awesome.min.css';
import { Outlet } from 'react-router-dom';


function DoctorLayout() {
    return (
        <div className='w-[100%] h-[100vh] bg-[#F5F5F5] relative  flex flex-col lg:flex-row overflow-hidden'>

            <SlideMenu />
            <div className='w-full flex-col relative'>
                <div className=' h-[8vh] flex justify-between  bg-white shadow-lg rounded-md m-2 mx-4 absolute top-0 left-0 right-0 p-2 px-4'>
                    <div className='bg-gray-300 h-full w-80 rounded-full'></div>
                    <div className='flex justify-center items-center gap-3'>
                        <div className='px-3 py-1    text-blue-300 border-2 border-blue-300 rounded-full font-semibold transition-all active:scale-95'>+ Add Slot</div>
                        <div className='bg-gray-300 h-full aspect-square rounded-full'></div>
                    </div>
                </div>
                <div className='w-full flex p-2'>
                    <Outlet />
                </div>

            </div>

        </div>
    )
}

export default DoctorLayout

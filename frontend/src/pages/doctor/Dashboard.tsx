

import 'font-awesome/css/font-awesome.min.css';
import SlideMenu from '../../components/doctor/SlideMenu';
import RightBar from '../../components/doctor/RightBar';
import DoctorBanner from '../../assets/external/doctorBanner.png'

function Dashboard() {
    return (
        <div className='w-[100%] h-[100vh] bg-[#F5F5F5] relative flex justify-center lg:justify-end items-center '>
            <SlideMenu />
            <div className='h-full w-full md:w-[767px] p-2 space-y-2 overflow-y-auto '>
                <div className='w-full h-[100px] bg-gradient-to-r from-[#72b4e7] to-[#aed4ef] rounded-xl relative overflow-hidden flex flex-col justify-center pl-6'>
                    <p className='font-semibold text-lg text-[#0c0b3eb5] tracking-widest'>Dr. Jackson Thomas</p>
                    <p className='text-white w-[300px] text-xs'>Here are your important tasks and reports. Please check the next appointment.</p>
                    <img src={DoctorBanner} className="h-[100px] absolute -right-7 transform scale-x-[-1]" alt="" />
                </div>
                <div className="w-full border-t-2 border-gray-300 my-2"></div>
                <div className='w-full h-[400px] bg-white rounded-lg'>

                </div>
                <div className='flex gap-2'>
                    <div className='w-full md:w-[50%] h-[600px] bg-white rounded-lg'></div>
                    <div className='w-full md:w-[50%] h-[600px] bg-white rounded-lg'></div>
                </div>
            </div>
                <RightBar />        
        </div>
    )
}

export default Dashboard

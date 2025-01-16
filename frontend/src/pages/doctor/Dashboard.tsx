import DoctorBanner from '../../assets/external/doctorBanner.png'
import RightBar from '../../components/doctor/RightBar'

function Dashboard() {
    return (
        <>
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
        </>
    )
}

export default Dashboard

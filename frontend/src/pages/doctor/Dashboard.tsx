import { useState } from 'react';
import ListedSlots from '../../components/doctor/appointments/ListedSlots';
import RightBar from '../../components/doctor/dashboard/RightBar'
import AllAppointments from '../../components/doctor/dashboard/AllAppointments';
import TransactionHistory from '../../components/common/TransactionHistory';
import Wallet from '../../components/common/Wallet';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';


function Dashboard() {
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    useGSAP(() => {
        const tl = gsap.timeline();
      
        tl.from(".box", {
            opacity:0,
            y:50,
            stagger:0.1,
            delay: '0.7'
        }, '-=0.8');
      });
      

    return (
        <div className='grid grid-cols-5 grid-rows-4 gap-2 w-full'>
            <div className='box col-span-2 bg-white shadow-md rounded-md p-4   overflow-hidden ' >
                <Wallet />
            </div>
            <div className='box col-span-2 row-span-2 bg-white shadow-md overflow-hidden   rounded-md'>
                <TransactionHistory />
            </div>
            <div className='box row-span-4'>
                <RightBar />
            </div>
            <div className='box col-span-2 row-span-3 bg-white shadow-md     rounded-md overflow-y-auto relative'>
            <p className='sticky top-0 left-0 right-0 z-10 bg-white p-3 flex items-center border-b border-gray-300 text-[#343462] font-semibold cursor-pointer'>Slots</p>
                <ListedSlots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
            </div>

            <div className='box col-span-2 row-span-2 bg-white shadow-md   rounded-md overflow-y-auto relative'>
                <p className='sticky top-0 left-0 right-0 z-10 bg-white p-3 flex items-center border-b border-gray-300 text-[#343462] font-semibold cursor-pointer'>Patients</p>
                <AllAppointments />
            </div>



        </div>
    )
}

export default Dashboard

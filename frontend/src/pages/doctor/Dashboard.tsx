import { useState } from 'react';
import ListedSlots from '../../components/doctor/appointments/ListedSlots';
import RightBar from '../../components/doctor/dashboard/RightBar'
import AllAppointments from '../../components/doctor/dashboard/AllAppointments';
import TransactionHistory from '../../components/common/TransactionHistory';
import Wallet from '../../components/common/Wallet';


function Dashboard() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    return (
        <>
            <div className='content h-screen w-full  flex flex-col justify-center overflow-y-auto rounded-md '
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    
                <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full p-4 h-screen pb-20">
                    <div className='cols-span2 bg-white rounded-md shadow-md p-2'>
                        <Wallet />
                        <TransactionHistory />
                    </div>
                    <div className="w-full h-full ">
                        <AllAppointments />
                    </div>
                    <div className="w-full h-full">
                        <ListedSlots selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
                    </div>
                </div>
            </div>
            <RightBar />
        </>
    )
}

export default Dashboard

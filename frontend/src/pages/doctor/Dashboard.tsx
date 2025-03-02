import { useState } from 'react';
import ListedSlots from '../../components/doctor/appointments/ListedSlots';
import RightBar from '../../components/doctor/dashboard/RightBar'
import AllAppointments from '../../components/doctor/dashboard/AllAppointments';
import TransactionHistory from '../../components/patient/userDrive/finance/TransactionHistory';
import Wallet from '../../components/patient/userDrive/finance/Wallet';


function Dashboard() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    return (
        <>
            <div className='content h-screen w-full p-4 flex flex-col justify-center overflow-y-auto rounded-md mt-20'
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

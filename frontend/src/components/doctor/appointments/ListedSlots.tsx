import React, { useEffect, useState } from 'react'
import { fetchSlotDetailsApi } from '../../../sevices/patient/findDoctors'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { IDoctorSotDetails } from '../../../types/patient/findDoctors'
import {  convertTo12HourFormat } from '../../../utils/timeStructure'


interface ListedSlotsProps {
    selectedSlot: null | string;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>
}
const ListedSlots:React.FC<ListedSlotsProps> = ({selectedSlot, setSelectedSlot}) => {
    const [listedSlots, setListedSlots] = useState<IDoctorSotDetails[]>([])
    const doctorId = useSelector((state: RootState) => state.auth._id)

    useEffect(() => {
        const getListedSlots = async () => {
          const response = await fetchSlotDetailsApi(doctorId);
          setListedSlots(response.slots);
        };
      
        getListedSlots();
      }, [doctorId]);


    return (
        <div className='w-full h-fit pb-6 rounded-md shadow-md bg-[#fff]'>
            <div className='p-2  border-b'>
                <p className='font-medium text-sm text-gray-700'>Listed SLots</p></div>
                <div className='h-[610px] overflow-auto'>
                    {listedSlots.map((slot, index) => (

                <div
                    key={index}
                    className={`p-2 relative border-b  duration-300 ${selectedSlot === slot._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedSlot(slot._id)}
                >
                  
                    <div className='mb-2 flex gap-2'>
                        <p className='font-semibold text-[#0c0b3eb5]'>Start Time:</p>
                        <p>{convertTo12HourFormat(slot.startTime)}</p>
                    </div>
                    <div className='mb-2 flex gap-2'>
                        <p className='font-semibold text-[#0c0b3eb5]'>End Time:</p>
                        <p>{convertTo12HourFormat(slot.endTime)}</p>
                    </div>
                    <div className='mb-2 flex gap-2'>
                        <p className='font-semibold text-[#0c0b3eb5]'>Duration:</p>
                        <p>{slot.avgConsultTime} min</p>
                    </div>
                    <div className='mb-2 flex gap-2'>
                        <p className='font-semibold text-[#0c0b3eb5]'>Slot Limit:</p>
                        <p>{slot.slotLimit}</p>
                    </div>
                    <div className='mb-2 flex gap-2'>
                        <p className='font-semibold text-[#0c0b3eb5]'>Booked Slots:</p>
                        <p>{slot.bookedSlot}</p>
                    </div>
                    <div className='mb-2 flex gap-2'>
                        <p className='font-semibold text-[#0c0b3eb5]'>Consulted:</p>
                        <p>{slot.consulted}</p>
                    </div>
                </div>

            ))}
                </div>
            
        </div>
    )
}

export default ListedSlots

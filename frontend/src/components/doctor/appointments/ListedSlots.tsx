import React, { useEffect, useState } from 'react';
import { fetchSlotDetailsApi } from '../../../sevices/patient/findDoctors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IDoctorSotDetails } from '../../../types/patient/findDoctors';
import { convertTimeStringToDate, convertTo12HourFormat } from '../../../utils/timeStructure';

interface ListedSlotsProps {
    selectedSlot: null | string;
    setSelectedSlot: React.Dispatch<React.SetStateAction<string | null>>;
}

const ListedSlots: React.FC<ListedSlotsProps> = ({ selectedSlot, setSelectedSlot }) => {
    const [listedSlots, setListedSlots] = useState<IDoctorSotDetails[]>([]);
    const doctorId = useSelector((state: RootState) => state.auth._id);

    useEffect(() => {
        const getListedSlots = async () => {
            const response = await fetchSlotDetailsApi(doctorId);
            setListedSlots(response.slots);
        };
        getListedSlots();
    }, [doctorId]);

    return (
        
            <div className='flex flex-wrap gap-4 mt-3 p-3  w-fit'>
                {listedSlots.map((slot, index) => (
                    <div
                        key={index}
                        className={`p-4 border border-gray-300 rounded-lg min-w-[240px]  relative
                    ${selectedSlot && selectedSlot === slot._id ? 'outline outline-[#51aff6ce]' : ''}`}
                        onClick={() =>  setSelectedSlot( p => p === slot._id ? null : slot._id)}
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
                            <p className='font-semibold text-[#0c0b3eb5]'>Finished:</p>
                            <p>{slot.consulted}</p>
                        </div>
                    </div>

                ))}
            </div>

    );
};

export default ListedSlots;
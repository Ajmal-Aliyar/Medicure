import React, { useEffect, useState } from 'react';
import { fetchSlotDetailsApi } from '../../../sevices/patient/findDoctors';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IDoctorSotDetails } from '../../../types/patient/findDoctors';
import { convertTo12HourFormat } from '../../../utils/timeStructure';

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
        <div className="w-full h-fit py-6 rounded-md shadow-md bg-white relative">
           <p className='absolute top-2 left-2 text-gray-70'>Available Slots</p>
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-xs ">
                            <th className="px-4 py-2 text-left">Start Time</th>
                            <th className="px-4 py-2 text-left">End Time</th>
                            <th className="px-4 py-2 text-left">Duration</th>
                            <th className="px-4 py-2 text-left">Slot Limit</th>
                            <th className="px-4 py-2 text-left">Booked Slots</th>
                            <th className="px-4 py-2 text-left">Consulted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listedSlots.map((slot) => (
                            <tr
                                key={slot._id}
                                className={`border-b cursor-pointer transition-colors duration-300 ${selectedSlot === slot._id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                onClick={() => setSelectedSlot(slot._id)}
                            >
                                <td className="px-4 py-2">{convertTo12HourFormat(slot.startTime)}</td>
                                <td className="px-4 py-2">{convertTo12HourFormat(slot.endTime)}</td>
                                <td className="px-4 py-2">{slot.avgConsultTime} min</td>
                                <td className="px-4 py-2">{slot.slotLimit}</td>
                                <td className="px-4 py-2">{slot.bookedSlot}</td>
                                <td className="px-4 py-2">{slot.consulted}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListedSlots;
import { IAppointmentSetUpProps, ISlotDetails } from "../../../types/doctor/verifyDetailsType";
import { getSlotsApi, updateSlotsApi } from "../../../sevices/doctor/verifyDetailsRepository";
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from "react";



const AppointmentSetUp: React.FC<IAppointmentSetUpProps> = ({ handleModal, setLoading }) => {
    const [fees, setFees] = useState<number | undefined>(undefined);
    const [slots, setSlots] = useState<ISlotDetails[]>([]);
    const [startTime, setStartTime] = useState('');
    const [slotLimit, setSlotLimit] = useState('');
    const [slotError, setSlotError] = useState('');
    const [endTime, setEndTime] = useState('');

    const timeFormat12hr = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
    };

    useEffect(() => {
            console.log('Component mounted');
            
            const fetchVerificationDetails = async () => {
                try {
                    const response = await getSlotsApi()
                    const { slots, fees } = response.data ?? {};
                    setFees(fees)
                    setSlots(slots)
                } catch (error) {
                    console.error('Error fetching verification details:', error);
                }
            };
            setLoading(true)
            fetchVerificationDetails();
            setLoading(false)
        }, []);

    const handleAdd = () => {
        const start = parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
        const end = parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

        if (start < end) {
            const totalDuration = end - start;
            const per = totalDuration / parseInt(slotLimit);
            if (per < 10) {
                setSlotError('Patient consultation per slot will be less than the average of 10 minutes');
            } else {
                const isOverlap = slots.some((slot) => {
                    const existingStart = parseInt(slot.startTime.split(":")[0]) * 60 + parseInt(slot.startTime.split(":")[1]);
                    const existingEnd = parseInt(slot.endTime.split(":")[0]) * 60 + parseInt(slot.endTime.split(":")[1]);
                    return (start < existingEnd && end > existingStart);
                });

                if (isOverlap) {
                    setSlotError('The slot time overlaps with an existing slot');
                } else {
                    setSlots(prevSlots => [
                        ...prevSlots,
                        {  startTime, endTime, slotLimit:Number(slotLimit), avgConsultTime : per.toFixed(2) }
                    ]);
                    setStartTime('');
                    setEndTime('');
                    setSlotLimit('');
                    setSlotError('');
                }
            }
        } else {
            setSlotError('End time must be after start time');
        }
    };

    const handleDelete = (index: number) => {
        setSlots(prevSlots => prevSlots.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        console.log(slots, 'slots')
        setLoading(false)
        await updateSlotsApi(slots, fees)
        setLoading(false)
        handleModal('')
    }

    return (
        <div className="lg:min-w-[500px] min-h-[500px] lg:h-[600px] flex flex-col justify-between">
            <div className="duration-300 transition-all">
                <h2 className="text-3xl font-semibold text-[#0c0b3eb5] ">Appointment Slot Setup</h2>
                <p className="text-xs text-[#0c0b3eb5] mb-6">Patients can book appointments based on the available slots.</p>

                <div className="max-w-2xl mx-auto h-[400px] overflow-y-auto ">
                    <div className="flex gap-3 items-end flex-wrap ">
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                                Start Time
                            </label>
                            <input
                                id="startTime"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                onKeyDown={(e) => e.preventDefault()}
                                inputMode="none"
                                min="00:00"
                                max="23:59"
                                className="block px-4 py-2 border border-gray-300 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                            <input
                                id="endTime"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                min="00:00"
                                max="23:59"
                                className="block px-4 py-2 border border-gray-300 outline-none"
                            />
                        </div>

                        <div className=" ">
                            <label htmlFor="slotLimit" className="block text-sm font-medium text-gray-700 ">Slot Limit</label>
                            <input
                                id="slotLimit"
                                type="number"
                                min="1"
                                value={slotLimit}
                                onChange={(e) => setSlotLimit(e.target.value)}
                                className="block px-4 py-2 border border-gray-300 outline-none max-w-[100px]"
                            />
                        </div>

                        <button
                            className="text-green-500"
                            onClick={handleAdd}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} size="2x" />
                        </button>
                    </div>
                    <p className="text-red-500 py-2 text-sm">{slotError}</p>

                    <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-800">Preview Available Slots</h3>
                        <div className=" bg-gray-100 px-4 rounded-md">
                            <table className="min-w-full text-sm text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-4 text-left">Time</th>
                                        <th className="py-2 px-4 text-left">Limit</th>
                                        <th className="py-2 px-4 text-left">Avg Per</th>
                                        <th className="py-2 px-4 text-left"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {slots.length > 0 ? (
                                        slots.map((slot, index) => (
                                            <tr key={index}>
                                                <td className="py-2 px-4">{timeFormat12hr(slot.startTime)} - {timeFormat12hr(slot.endTime)}</td>
                                                <td className="py-2 px-4">{slot.slotLimit} Patients</td>
                                                <td className="py-2 px-4">{slot.avgConsultTime} minutes</td>
                                                <td className="py-2 px-4 ">
                                                    <button
                                                        onClick={() => handleDelete(index)}
                                                        className="text-red-500"
                                                    >
                                                        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="py-2 px-4 text-center text-gray-500">No slots available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between border-t-2 pt-4 px-3 items-end">
                <input
                    id="fee"
                    placeholder="Fees per consult"
                    type="number"
                    value={fees !== undefined ? fees : ""}
                    onChange={(e) => {
                        const value = e.target.value;
                        setFees(value ? parseFloat(value) : undefined);
                    }}
                    required
                    className="block px-4 py-1 border border-gray-300 font-normal outline-none max-w-[200px]"
                />
                <button className="cursor-pointer transition duration-300 hover:scale-105 active:scale-95 text-[#0c0b3eb0] font-bold px-4  h-fit" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AppointmentSetUp;

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { IFetchSlotResponse } from "../../../types/slot/fetchSlot";
import { ISLots } from "../../../types/doctor/profileType";

const Slots: React.FC<ISLots> = ({ setEditProfile }) => {
    const slotData: IFetchSlotResponse[] = useSelector((state: RootState) => state.slot.slots);
    const fees: number | null = useSelector((state: RootState) => state.slot.fees);

    return (
        <div className="col-span-6 row-span-2 bg-white p-4 rounded-lg shadow-lg">
            <p className="font-bold text-2xl mb-2 text-[#0c0b3eb5] flex justify-between border-b-[2px] border-gray-100 cursor-pointer">
                <span>Slots</span>
                <span onClick={() => setEditProfile('editSlot')}>+</span>
            </p>
            <div className="overflow-y-auto max-h-[400px]">
                {slotData.map((slot, index) => (
                <div key={index} className="my-1">
                    <div className="bg-blue-50 p-2 rounded-md hover:bg-blue-100">
                        <p className="text-lg font-medium">{slot.startTime} - {slot.endTime}</p>
                        <p className="text-sm">Slot Limit: {slot.slotLimit}</p>
                        <p className="text-sm">Booked Slot: {slot.bookedSlot}</p>
                        <p className="text-sm">Average Consult Time: {slot.avgConsultTime}</p>
                    </div>
                    
                </div>
            ))}
            </div>
            <p className="font-bold text-lg mt-2 text-[#0c0b3eb5] flex justify-end border-t-[2px] border-gray-100 cursor-pointer">
                <span>Fees: {fees}</span>
            </p>
            
        </div>
    );
};

export default Slots;

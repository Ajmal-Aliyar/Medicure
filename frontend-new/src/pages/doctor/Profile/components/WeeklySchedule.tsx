import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/Button";
import { calculateSlotCount } from "@/utils/calculateSlotCount";
import { doctorScheduleService } from "@/services/api/doctor/schedule";
import { ShiftModal } from "./ShiftModal";
import type { Day, IDoctorSchedule, IShift } from "@/types/schedule";
import type { RootState } from "@/app/store";
import { updateDoctorSchedule } from "@/slices/doctorSlice";

const days: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export const WeeklySchedule = () => {
    const { schedule } = useSelector((state: RootState) => state.doctor);
    const [editMode, setEditMode] = useState(false);
    const [modalDay, setModalDay] = useState<Day | null>(null);
    const [editSchedule, setEditSchedule] = useState<IDoctorSchedule | null>(null);
    const dispatch = useDispatch()

    const handleAddShift = (day: Day, newShift: IShift) => {
        if (!editSchedule) return;

        const existing = editSchedule.weeklySchedule[day]?.shifts || [];
        const hasConflict = existing.some(
            (s) => !(newShift.endTime <= s.startTime || newShift.startTime >= s.endTime)
        );

        if (hasConflict) {
            alert("Shift overlaps with existing one");
            return;
        }

        const updated: IDoctorSchedule = {
            ...editSchedule,
            weeklySchedule: {
                ...editSchedule.weeklySchedule,
                [day]: {
                    shifts: [...existing, newShift],
                },
            },
        };
        setEditSchedule(updated);
    };

    const handleRemoveShift = (day: Day, index: number) => {
        if (!editSchedule) return;

        const updatedShifts = [...(editSchedule.weeklySchedule[day]?.shifts || [])];
        updatedShifts.splice(index, 1);

        setEditSchedule({
            ...editSchedule,
            weeklySchedule: {
                ...editSchedule.weeklySchedule,
                [day]: { shifts: updatedShifts },
            },
        });
    };

    const handleUpdateSchedule = async () => {
        if (!editSchedule) return;

        try {
            const updatedSchedule = await doctorScheduleService.updateSchedule(editSchedule.weeklySchedule);
            dispatch(updateDoctorSchedule(updatedSchedule))
            setEditMode(false);
            setEditSchedule(null);
        } catch (err) {
            console.error("Failed to update schedule", err);
        }
    };

    const handleEditClick = () => {
        setEditSchedule(JSON.parse(JSON.stringify(schedule)));
        setEditMode(true);
    };

    return (
        <div>
            <div className="flex justify-between">
                <h3 className="text-lg font-semibold text-secondary mb-2">Weekly Schedule</h3>
                {editMode ? (
                    <Button variant="green" className="flex h-fit items-center gap-2 px-3" onClick={handleUpdateSchedule}>
                        <span>Save</span>
                    </Button>
                ) : (
                    <Button variant="muted" className="flex h-fit items-center gap-2 px-3" onClick={handleEditClick}>
                        <Pencil size={13} />
                        <span>Edit</span>
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {days.map((day) => {
                    const shifts =
                        editMode && editSchedule
                            ? editSchedule.weeklySchedule[day]?.shifts || []
                            : schedule.weeklySchedule[day]?.shifts || [];

                    return (
                        <div key={day} className="border border-blue-100 rounded-lg p-3 bg-blue-50">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold capitalize text-secondary">{day}</h4>
                                {editMode && (
                                    <Button variant="muted" onClick={() => setModalDay(day)}>
                                        <Plus size={23} className="py-1 w-fit" />
                                    </Button>
                                )}
                            </div>

                            {shifts.length === 0 ? (
                                <p className="text-sm text-gray-500 italic">No shifts</p>
                            ) : (
                                <ul className="space-y-2">
                                    {shifts.map((shift, index) => (
                                        <li
                                            key={index}
                                            className="bg-white rounded p-2 shadow text-sm flex flex-col gap-1 relative"
                                        >
                                            <div className="flex justify-between text-gray-700">
                                                <span>🕒 {shift.startTime} - {shift.endTime}</span>
                                                <span className="capitalize text-xs text-gray-500 -translate-x-2">
                                                    ({shift.type})
                                                </span>
                                            </div>
                                            <div className="flex justify-between text-gray-600 text-xs">
                                                <span>⏱ {shift.duration} mins</span>
                                                <span>₹ {shift.fees}</span>
                                                <span>
                                                    {calculateSlotCount(
                                                        shift.startTime,
                                                        shift.endTime,
                                                        shift.duration,
                                                        shift.buffer
                                                    )}{" "}
                                                    slots
                                                </span>
                                            </div>
                                            {shift.buffer > 0 && (
                                                <div className="text-[11px] text-gray-500">Buffer: {shift.buffer} mins</div>
                                            )}
                                            {editMode && (
                                                <button
                                                    className="absolute -top-1 -right-2 text-red-500 hover:text-red-700 bg-white rounded-2xl p-1"
                                                    onClick={() => handleRemoveShift(day, index)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>

            {modalDay && (
                <ShiftModal
                    open={true}
                    existingShifts={
                        (editMode && editSchedule?.weeklySchedule[modalDay]?.shifts) || []
                    }
                    onClose={() => setModalDay(null)}
                    onConfirm={(shift) => {
                        handleAddShift(modalDay, shift);
                        setModalDay(null);
                    }}
                />
            )}
        </div>
    );
};

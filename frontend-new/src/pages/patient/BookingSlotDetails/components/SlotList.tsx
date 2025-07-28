import type { RootState } from "@/app/store";
import { Button } from "@/components/ui/Button";
import type { ISlotDetails } from "@/types/slot";
import { formatDateToYMD, formatTimeTo12Hour } from "@/utils/formatDate";
import { useSelector } from "react-redux";

interface CommonSlotListProps {
  slots: ISlotDetails[];
}

interface PatientSlotListProps extends CommonSlotListProps {
  onClick: (slotId: string) => void;
}

interface DoctorSlotListProps extends CommonSlotListProps {
  onClick: (slotId: string, isActive: boolean) => Promise<void>;
}

type SlotListProps = PatientSlotListProps | DoctorSlotListProps;

export const SlotList = ({ slots, onClick }: SlotListProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!slots.length) {
    return (
      <div className="text-sm text-gray-500 italic p-4 border rounded-md">
        No slots available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {slots.map((slot, index) => (
        <div
          key={index}
          className="bg-white p-4 shadow-sm border border-border hover:border-secondary-light rounded-md hover:shadow-md transition-all"
        >
          <div className="text-sm text-gray-600 mb-1">
            <strong>Date:</strong> {formatDateToYMD(slot.date)}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <strong>Time:</strong> {formatTimeTo12Hour(slot.startTime)} - {formatTimeTo12Hour(slot.endTime)}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <strong>Type:</strong> {slot.type}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            <strong>Duration:</strong> {slot.duration} mins
          </div>
          <div className="text-sm">
            <strong>Status:</strong>{" "}
            <span
              className={`inline-block px-2 py-0.5 rounded text-white text-xs ${
                slot.status === "available"
                  ? "bg-green-500/80"
                  : slot.status === "booked"
                  ? "bg-muted"
                  : slot.status === "reserved"
                  ? "bg-yellow-500/80"
                  : "bg-primary"
              }`}
            >
              {slot.status === "completed" ? "booked" : slot.status}
            </span>
          </div>

          <div className="w-full flex items-center mt-4">
            <div className="text-sm text-gray-600">
              <strong>Fees:</strong> ₹{slot.fees}
            </div>

            {slot.status === "available" && user?.role === "patient" && (
              <Button
                variant="outline"
                className="ml-auto h-fit px-3"
                onClick={() => (onClick as (slotId: string) => void)(slot.id)}
              >
                Book Now
              </Button>
            )}

            {user?.role === "doctor" && slot.status === "available" && (
              <Button
                variant={slot.isActive ? "outline" : "red"}
                className="ml-auto h-fit px-3"
                onClick={() =>
                  (onClick as (slotId: string, isActive: boolean) => Promise<void>)(
                    slot.id,
                    !slot.isActive
                  )
                }
              >
                {slot.isActive ? "Disable Slot" : "Enable Slot"}
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

import { useState, useEffect } from "react";
import type { IShift } from "@/types/schedule";

interface ShiftModalProps {
  open: boolean;
  existingShifts: IShift[];
  onClose: () => void;
  onConfirm: (shift: IShift) => void;
}

export const ShiftModal = ({ open, existingShifts, onClose, onConfirm }: ShiftModalProps) => {
  const [shift, setShift] = useState<IShift>({
    startTime: "",
    endTime: "",
    duration: 0,
    buffer: 0,
    fees: 0,
    isActive: true,
    type: "consult"
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setShift({
        startTime: "",
        endTime: "",
        duration: 0,
        buffer: 0,
        fees: 0,
        isActive: true,
        type: "consult"
      });
      setError(null);
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShift((prev) => ({
      ...prev,
      [name]: name === "duration" || name === "buffer" || name === "fees" ? Number(value) : name === "isActive" ? value === "true" : value
    }));
  };

  const isOverlapping = (existing: IShift[], newShift: IShift) => {
    const toMinutes = (time: string) => {
      const [h, m] = time.split(":" ).map(Number);
      return h * 60 + m;
    };
    const newStart = toMinutes(newShift.startTime);
    const newEnd = toMinutes(newShift.endTime);

    return existing.some(shift => {
      const start = toMinutes(shift.startTime);
      const end = toMinutes(shift.endTime);
      return newStart < end && newEnd > start;
    });
  };

  const handleSubmit = () => {
    if (!shift.startTime || !shift.endTime) {
      setError("Start time and end time are required.");
      return;
    }
    if (shift.startTime >= shift.endTime) {
      setError("Start time must be before end time.");
      return;
    }
    if (isOverlapping(existingShifts, shift)) {
      setError("Shift overlaps with an existing one.");
      return;
    }

    setError(null);
    onConfirm(shift);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xs bg-black/40"
    >
      <div className="bg-white rounded-2xl border border-gray-300 shadow-lg max-w-md w-full p-6 relative">
        <button
          aria-label="Close modal"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
          type="button"
        >
          &times;
        </button>

        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">Add New Shift</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-600 mb-1">
                Start Time
              </label>
              <input
                id="startTime"
                name="startTime"
                type="time"
                value={shift.startTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-600 mb-1">
                End Time
              </label>
              <input
                id="endTime"
                name="endTime"
                type="time"
                value={shift.endTime}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-600 mb-1">
                Duration (min)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                min={1}
                value={shift.duration}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="buffer" className="block text-sm font-medium text-gray-600 mb-1">
                Buffer (min)
              </label>
              <input
                id="buffer"
                name="buffer"
                type="number"
                min={0}
                value={shift.buffer}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="fees" className="block text-sm font-medium text-gray-600 mb-1">
                Fees (₹)
              </label>
              <input
                id="fees"
                name="fees"
                type="number"
                min={0}
                value={shift.fees}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="isActive" className="block text-sm font-medium text-gray-600 mb-1">
              Active Status
            </label>
            <select
              id="isActive"
              name="isActive"
              value={String(shift.isActive)}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={shift.type}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="consult">Consult</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>

          {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Add Shift
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
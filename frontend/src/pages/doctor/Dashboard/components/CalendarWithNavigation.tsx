import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Props {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const Calendar = ({ selectedDate, setSelectedDate }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const today = new Date();

  const renderDays = () =>
    daysOfWeek.map(day => (
      <div key={day} className="text-sm text-center font-semibold text-gray-600">
        {day}
      </div>
    ));

  const renderCells = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDayOfMonth(year, month);

    const totalCells = startDay + daysInMonth;
    const weeks = [];
    let cells = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startDay + 1;
      const currentDate = new Date(year, month, dayNum);

      if (i < startDay) {
        cells.push(<div key={`empty-${i}`} className="p-2" />);
      } else {
        const isToday = isSameDay(currentDate, today);
        const isSelected = isSameDay(currentDate, selectedDate);

        cells.push(
          <div
            key={currentDate.toISOString()}
            onClick={() => setSelectedDate(currentDate)}
            className={`text-sm text-center cursor-pointer p-2 rounded-lg transition select-none
              ${isSelected ? "bg-primary text-white font-semibold" : ""}
              ${!isSelected && isToday ? "border border-primary" : ""}
              ${!isSelected && !isToday ? "hover:bg-gray-100" : ""}
            `}
          >
            {dayNum}
          </div>
        );
      }

      if ((i + 1) % 7 === 0 || i === totalCells - 1) {
        weeks.push(
          <div key={`week-${i}`} className="grid grid-cols-7 gap-1 mb-1">
            {cells}
          </div>
        );
        cells = [];
      }
    }

    return weeks;
  };

  return (
    <div className="h-full p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          <ChevronLeft className="text-secondary" />
        </button>
        <h2 className="text-lg font-semibold text-primary">
          {currentMonth.toLocaleString("default", { month: "long" })} {currentMonth.getFullYear()}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          <ChevronRight />
        </button>
      </div>


      <div className="grid grid-cols-7 text-center mb-2">{renderDays()}</div>

      <div className="flex-1 overflow-y-auto">{renderCells()}</div>
    </div>
  );
};

export default Calendar;

import { useState } from "react";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const goToNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const goToPreviousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const getMonthName = (date: Date) => {
        return date.toLocaleString("default", { month: "long" });
    };

    const getYear = (date: Date) => {
        return date.getFullYear();
    };

    const generateCalendarDays = (date: Date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();

        const calendarDays = [];
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            calendarDays.push(i);
        }

        return calendarDays;
    };

    const daysInMonth = generateCalendarDays(currentDate);

    return (
        <div className="bg-[#16423C] w-full lg:min-w-[300px] max-w-[500px] mt-4 lg:mt-0 lg:flex-1 rounded-md shadow-md">
            <div className="w-full h-full">
                <div className="font-semibold border-b-2 border-neutral-700 p-2 text-[#E9EFEC]">
                    Appointments
                </div>
                <div className="p-2"></div>
                <div className="w-full max-w-md mx-auto p-4 text-neutral-100">
                    <div className="flex justify-between items-center mb-4">
                        <button
                            onClick={goToPreviousMonth}
                            className="text-lg bg-[#C4DAD2] p-3 rounded-md text-[#16423C] duration-300 active:scale-90"
                        >
                            &#8249;
                        </button>
                        <div className="text-xl font-semibold">
                            {getMonthName(currentDate)} {getYear(currentDate)}
                        </div>
                        <button
                            onClick={goToNextMonth}
                            className="text-lg bg-[#C4DAD2] p-3 rounded-md text-[#16423C] duration-300 active:scale-90"
                        >
                            &#8250;
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day} className="text-center text-sm font-medium text-[#C4DAD2]">
                                {day}
                            </div>
                        ))}

                        {daysInMonth.map((day, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-md text-center ${day ? "text-[#E9EFEC]" : "text-transparent"
                                    } ${day ? "hover:bg-[#C4DAD2] hover:text-[#16423C] cursor-pointer" : ""}`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Calendar;

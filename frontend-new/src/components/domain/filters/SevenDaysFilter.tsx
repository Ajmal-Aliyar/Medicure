import { getNext7Days } from "@/utils/daysUtil";

interface SevenDaysFilterProps {
    day: string;
    setDay: (value: string) => void;
    className?: string
}

const SevenDaysFilter = ({ day, setDay, className = "" }: SevenDaysFilterProps) => {
     const days = getNext7Days();
    return (
        <div className={`flex overflow-x-auto gap-2 pb-2 mb-4`}>
            {days.map((date) => (
                <button
                    key={date.value}
                    onClick={() => setDay(date.value)}
                    className={`${className} whitespace-nowrap  rounded-lg border text-xs font-medium transition-all cursor-pointer active:scale-95 ${day === date.value
                        ? "bg-primary text-white border-primary-dark"
                        : "bg-white text-text border-border"
                        }`}
                >
                    {date.label}
                </button>
            ))}
        </div>

    )
}

export default SevenDaysFilter
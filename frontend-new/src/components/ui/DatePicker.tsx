interface DatePickerProps {
  date: string; 
  setDate: (date: string) => void;
  label?: string
  className?: string[]
}

const DatePicker = ({ date, setDate, label, className }:DatePickerProps) => {
  console.log(date, setDate);
  
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-sm mb-1 text-gray-600">{label}</label>}
      <input
        id="date-picker"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded-md bg-white outline-none border-primary-light text-muted-dark cursor-pointer"
      />
    </div>
  );
};

export default DatePicker;


interface Props {
  value: string;
  onChange: (value: string) => void;
  statusOptions: string[];
  label?: string;
  className?: string;
  placeholder?: string;
}

const StatusSelect = ({
  value,
  onChange,
  statusOptions,
  label = "Status",
  className = "",
  placeholder,
}: Props) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="text-sm mb-1 text-gray-600">{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border p-2 rounded-md bg-white outline-none border-primary-light text-muted-dark cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusSelect;

import type { ReactNode } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: ReactNode;
  className?: string;
  inputClassName?: string;
}

const InputWithIcon = ({
  value,
  onChange,
  placeholder = "Type...",
  icon,
  className = "",
  inputClassName = "",
}: Props) => {
  return (
    <div className={`flex items-center border rounded-md px-2 ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full outline-none py-1 ${inputClassName}`}
      />
      {icon && <div className="ml-1 text-gray-500">{icon}</div>}
    </div>
  );
};

export default InputWithIcon;

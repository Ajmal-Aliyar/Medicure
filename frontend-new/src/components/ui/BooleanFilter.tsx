import { useState } from "react";


type BooleanFilterProps = {
  label: string;
  isActive: boolean | null;
  setIsActive: (value: boolean | null) => void;
};

const BooleanFilter = ({ isActive, setIsActive, label }: BooleanFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "All", value: null },
    { label: "True", value: true },
    { label: "False", value: false },
  ];

  const selectedLabel =
    options.find((opt) => opt.value === isActive)?.label || "All";

  const handleSelect = (value: boolean | null) => {
    setIsActive(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-20">
      <label className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="border p-2 rounded-md bg-white outline-none border-primary-light text-muted-dark cursor-pointer flex items-center justify-between h-10"
      >
        <span>{selectedLabel}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.label}
              onClick={() => handleSelect(option.value)}
              className={`px-3 py-1.5 text-sm cursor-pointer hover:bg-gray-100 ${
                isActive === option.value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooleanFilter;

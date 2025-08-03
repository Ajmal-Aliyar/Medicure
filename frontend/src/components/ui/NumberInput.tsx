import React from "react";

interface NumberInputProps {
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  label?: string;
}

const NumberInput = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
}: NumberInputProps) => {
  const numericValue = typeof value === "string" ? Number(value) : value;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = Number(val);
    if (val === "") {
      onChange(min);
    } else if (!isNaN(num)) {
      if (num >= min && num <= max) {
        onChange(num);
      }
    }
  };

  return (
      <input
        type="number"
        className="w-16 border outline-none px-1 rounded-md text-center bg-white border-primary-light"
        value={numericValue}
        onChange={handleInputChange}
        min={min}
        max={max === Infinity ? undefined : max}
        step={step}
      /> 
  );
};

export default NumberInput;

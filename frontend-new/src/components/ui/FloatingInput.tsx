import { type FocusEvent, type ChangeEvent, useState } from 'react';

export interface FloatingInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (field: string, value: string) => void;
  type?: string;
  error?: string;
}

export const FloatingInput = ({
    id,
    label,
    value,
    onChange,
    type = 'text',
    error = '',
}: FloatingInputProps) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) setFocused(false);
    };

    const handleChange = ( e: ChangeEvent<HTMLInputElement>) => {
        onChange( id, e.target.value);
    };

    return (
        <div className="relative w-full mb-6">
            <input
                type={type}
                id={id}
                value={value}
                required
                className={`w-full p-3 border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base transition duration-300 ${focused || value
                        ? 'border-t-2 border-r-2 rounded-lg ring-0'
                        : 'rounded-bl-lg'
                    }`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
            <label
                htmlFor={id}
                className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
            >
                <p className={`${focused || value  ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>{label}</p>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
};


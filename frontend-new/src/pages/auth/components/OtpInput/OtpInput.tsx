import { useRef, useState } from 'react';

export const OtpInput = ({ onChange }: { onChange: (otp: string) => void }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const updateOtp = (newOtp: string[]) => {
        setOtp(newOtp);
        onChange(newOtp.join(''));
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
        const value = event.target.value;
        if (/^[0-9]$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            updateOtp(newOtp);
            if (index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        } else if (value === "") {
            const newOtp = [...otp];
            newOtp[index] = "";
            updateOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
        const pastedData = event.clipboardData.getData("Text").slice(0, 6);
        const otpValues = pastedData.split('');
        const newOtp = [...otp];

        otpValues.forEach((val, idx) => {
            if (/^[0-9]$/.test(val)) {
                newOtp[idx] = val;
            }
        });

        updateOtp(newOtp);

        const nextIndex = otpValues.length < 6 ? otpValues.length : 5;
        inputRefs.current[nextIndex]?.focus();
    };

    const handleClick = (index: number): void => {
        const input = inputRefs.current[index];
        if (input) {
            input.setSelectionRange(input.value.length, input.value.length);
        }
    };

    return (
        <div className="flex gap-2 justify-center mb-10">
            {otp.map((_, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputRefs.current[index] = el;
                    }}
                    className="w-8 h-8 text-center rounded-md border-none outline-none bg-gray-200 shadow-inner"
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onInput={(e) => handleInput(e as React.ChangeEvent<HTMLInputElement>, index)}
                    onPaste={handlePaste}
                    onClick={() => handleClick(index)}
                    style={{
                        boxShadow: otp[index]
                            ? 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff'
                            : 'inset -3px -3px 6px #adadad47',
                    }}
                />
            ))}
        </div>
    );
};
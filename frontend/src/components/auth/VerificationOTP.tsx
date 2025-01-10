import { useRef, useState } from "react";
import { api } from "../../utils/axiosInstance";

type Prop = {
  handleAuth: (value: boolean) => void;
  email: string;
}
const VerificationOTP: React.FC<Prop> = ({ handleAuth, email }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false)

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const value = event.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputRefs.current.length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>): void => {
    const pastedData = event.clipboardData.getData("Text");
    const otpValues = pastedData.split("").slice(0, 6);
    const newOtp = [...otp];

    otpValues.forEach((value, idx) => {
      if (/^[0-9]$/.test(value)) {
        newOtp[idx] = value;
      }
    });

    setOtp(newOtp);

    if (otpValues.length < 6 && inputRefs.current[otpValues.length]) {
      inputRefs.current[otpValues.length]?.focus();
    } else if (otpValues.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const handleClick = (index: number): void => {
    const input = inputRefs.current[index];
    if (input) {
      input.setSelectionRange(input.value.length, input.value.length);
    }
  };

  const handleSubmit = () => {
    const OTP2Send = Number(otp.join(''))
    console.log(OTP2Send, email)
    setOtp(Array(6).fill(""))
    api.post('/api/auth/verify-otp', {
      email,OTP2Send
    })
      .then(response => {
        setLoading(false);
        console.log('Login successful:', response.data);
      })
      .catch(error => {
        setLoading(false);
        // setServerError('error vannu tto');
        console.error('Login error:', error.response?.data || error.message);
      });
  }

  return (
    <form className="relative min-w-[290px] p-8 h-[380px] flex flex-col  min-h-[350px] w-[350px] lg:w-[400px] bg-[#e7eaec] shadow-lg rounded-lg transition-all duration-400 ease-in-out items-center"
      style={{ boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe' }}>
      <p className="relative text-center text-[#3aabec] font-bold mt-12 text-xl">Verify</p>

      <img src="https://cdn-icons-png.flaticon.com/512/8467/8467869.png" className="w-[80px] h-[80px]" alt="" />
      <div className="flex justify-center space-x-4 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-8 h-8 text-center rounded-md border-none outline-none bg-gray-200 shadow-inner`}
            type="text"
            maxLength={1}
            value={otp[index]}
            onInput={(event) => handleInput(event as React.ChangeEvent<HTMLInputElement>, index)}
            onPaste={(event) => handlePaste(event)}
            style={{
              boxShadow: `${otp[index] ? 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff' : 'inset -3px -3px 6px #adadad'}`
            }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      <div className=" bg-gray-100 bg-opacity-70 shadow-lg  text-center w-40 rounded-md absolute bottom-0 left-0 m-3 p-2 active:scale-95 font-medium text-[#0c0b3eb5]" onClick={() => handleAuth(true)}>back</div>
      <div className=" bg-gray-100 bg-opacity-70 shadow-lg  text-center w-40 rounded-md absolute bottom-0 right-0 m-3 p-2 active:scale-95 font-medium text-[#0c0b3eb5]" onClick={handleSubmit}>submit</div>
    </form>
  );
};


export default VerificationOTP;
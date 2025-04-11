import HoneyComb from "../common/HoneyComb";
import { RootState } from '../../store/store';
import ErrorMessage from "../common/ErrorMessage";
import { useEffect, useRef, useState } from "react";
import { login } from "../../store/slices/commonSlices/AuthSlice";
import { useSelector, useDispatch } from 'react-redux';
import { IVerificationOTPProp } from "../../types/authType";
import { sendOTPApi, verifyOtpAndRegisterApi, verifyOtpApi } from "../../sevices/authRepository";
import RegisteredModal from "./RegisteredModal";

const VerificationOTP: React.FC<IVerificationOTPProp> = ({ handleAuth, forgotPassword, handleChangePassword }) => {
  const [timer, setTimer] = useState(30);
  const [message,setMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [serverError, setServerError] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const { email } = useSelector((state: RootState) => state?.auth);
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, isResendDisabled]);

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

  const handleResendOTP = async () => {
    setTimer(30);
    setIsResendDisabled(true);
    try {
      await sendOTPApi(email)
    } catch(error: unknown) {
      setIsResendDisabled(false)
      setServerError('Something went wrong! Please try again later.');
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

  const handleSubmit = async () => {
    setLoading(true)
    const OTP2Send = otp.join('')
    setOtp(Array(6).fill(""))
    if (forgotPassword) {
      console.log('forgot passowrd')
      try {
        const response = await verifyOtpApi(OTP2Send, email)
        setLoading(false);
        console.log('OTP verified successfully:', response.data);
        setMessage('OTP verified successfully. Please set your new password.')
        handleChangePassword(true)
      } catch(error: unknown ) {
        setLoading(false);
        setServerError('Something went wrong! Please try again later.');
      }
    } else {
      try {
        const response = await verifyOtpAndRegisterApi(OTP2Send, email)
        setLoading(false);
          console.log('Login successful:', response.data);
          setMessage('Thank you for registering! Your account has been created successfully.')
      } catch(error: unknown) {
        setLoading(false);
          setServerError('Something went wrong! Please try again later.');
      }
    }
  }

  const handleErrorServerMessage = () => {
    setServerError('')
  }

  const handleModal = () => {
    setMessage('')
    if (forgotPassword) {
      handleAuth(true)
      handleChangePassword(true)
    } else {
      dispatch(login())
      handleAuth(true)
    }
  }

  return (
    <form className="form relative min-w-[290px] p-8 h-[380px] flex flex-col  min-h-[350px] w-[350px] lg:w-[400px] bg-[#e7eaec] shadow-lg rounded-lg items-center"
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
              boxShadow: `${otp[index] ? 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff' : 'inset -3px -3px 6px #adadad47'}`
            }}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className="flex justify-around w-full mt-10 ">

        <button className="relative  border bg-[#dcdfe0] disabled:bg-transparent shadow-inner border-gray-200 disabled:border-gray-300 bg-opacity-70 text-center w-20 rounded-md  m-4 p-2 active:scale-95 font-medium text-[#0c0b3eb5] disabled:text-gray-300"
          disabled={isResendDisabled}
          onClick={handleResendOTP}
        >
          <p className={`${isResendDisabled ? `text-xs font-medium ` : ''}`}>
            {isResendDisabled ? `Wait ${timer}s` : 'resend'}
          </p>
        </button>
        <div className=" bg-[#dcdfe0] border border-gray-200  bg-opacity-70 shadow-inner text-center w-20 rounded-md  m-4 p-2 active:scale-95 font-medium text-[#0c0b3eb5]" onClick={handleSubmit}
        >submit</div>
      </div>

      <div className={`${serverError !== '' || loading ? '' : 'opacity-0 -z-50 '}   bg-[#333333] absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
        {!loading ? <ErrorMessage message={serverError} handleModal={handleErrorServerMessage} /> : ''}
        {serverError === '' || loading ? <HoneyComb /> : ''}
      </div>

      <div className={`${message !== ''? "" :"hidden"} fixed top-0 left-0  flex justify-center items-center w-screen h-screen`}>
        <RegisteredModal handleModal={handleModal} message={message}/>
      </div>
    </form>

  );
};


export default VerificationOTP;
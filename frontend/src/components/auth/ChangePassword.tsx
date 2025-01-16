import { useState } from "react"
import { useSelector } from "react-redux";
import HoneyComb from "../common/HoneyComb";
import { RootState } from "../../store/store";
import ErrorMessage from "../common/ErrorMessage";
import { validatePassword } from "../../utils/validate";
import { changePasswordApi } from "../../sevices/authRepository";
import {  IErrorTypeChangepassword, IForgotPasswordProps } from "../../types/authType";

const ForgotPassword: React.FC<IForgotPasswordProps> = ({ handleChangePassword , role}) => {
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [serverError, setServerError] = useState<string>("")
  const [newPasswordfocused, setNewPasswordFocused] = useState(false)
  const email = useSelector((state: RootState) => state?.user?.email);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState<IErrorTypeChangepassword>({
    newPassword: '', confirmPassword: ''
  })

  const handleErrorServerMessage = () => {
    setServerError('')
  }

  const handleErrorMessage = (field: string, value: string) => {
    if (field === 'new-password') {
      setNewPassword(value)
      const newP = validatePassword(value)
      setErrorMessage((prev) => ({
        ...prev,
        newPassword: newP || '',
      }));
    }
    if (field === 'confirm-password') {
      setConfirmPassword(value)
      const confirmP = validatePassword(value)
      setErrorMessage((prev) => ({
        ...prev,
        confirmPassword: confirmP || '',
      }));
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      setServerError('The passwords do not match. Please make sure both the password and confirm password fields are the same')
      setLoading(false)
      return
    }
    if (!errorMessage.newPassword && !errorMessage.confirmPassword && confirmPassword && newPassword) {
      try {
        await changePasswordApi(email, confirmPassword, role)
         setLoading(false);
          handleChangePassword(false)
      } catch (error: any) {
        setLoading(false);
        setServerError(error?.response?.data?.error || 'Something went wrong! Please try again later.');
        console.error('Password change error:', error.response?.data || error.message);
      }
    } else {
      handleErrorMessage('new-password', newPassword);
      handleErrorMessage('confirm-password', confirmPassword);
      setLoading(false);
    }
  };

  return (
    <div className={`form flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#eeeeee] shadow-lg rounded-lg py-10 relative`}
      style={{ boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe' }}>

      <a className="text-[#0c0b3e] uppercase font-bold text-xl tracking-wider mb-4">
        Change Password
      </a>


      <div className={`relative w-[250px] mt-6 `}>
        <input
          type="password"
          required
          id="newPassword"
          value={newPassword}
          className={`w-full p-3  ${newPasswordfocused || newPassword !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0 ' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
          onFocus={() => setNewPasswordFocused(true)}
          onChange={(e) => handleErrorMessage('new-password', e.target.value)}
          onBlur={(e) => e.target.value === '' ? setNewPasswordFocused(false) : ''}
        />
        <label
          htmlFor="newPassword"
          className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}>
          <p className={`${newPasswordfocused || newPassword !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>change password</p>
        </label>
        <p className={`${errorMessage.newPassword !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.newPassword}</p>
      </div>


      <div className="relative w-[250px] mt-6">
        <input
          type="password"
          required
          id="confirmPassword"
          value={confirmPassword}
          className={`w-full p-3  ${confirmPasswordFocused || confirmPassword !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0 ' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
          onFocus={() => setConfirmPasswordFocused(true)}
          onChange={(e) => handleErrorMessage('confirm-password', e.target.value)}
          onBlur={(e) => e.target.value === '' ? setConfirmPasswordFocused(false) : ''}
        />
        <label
          htmlFor="confirmPassword"
          className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-wide  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}>
          <p className={`${confirmPasswordFocused || confirmPassword !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>confirm password</p>
        </label>
        <p className={`${errorMessage.confirmPassword !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.confirmPassword}</p>
      </div>


      <button className=" w-[250px] h-[45px] mt-10  border-2 border-[#0c0b3eb5] text-xs uppercase tracking-wider cursor-pointer transition duration-300 bg-[#0c0b3eb5] hover:bg-[#0c0b3e] text-white rounded-md active:scale-90 "
      onClick={handleSubmit}>
        confirm
      </button>


      <div className={`${serverError !== '' || loading ? '' : 'opacity-0 -z-50 '}  transition-all duration-300 bg-[#b7b7b75b] absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
        {!loading ? <ErrorMessage message={serverError} handleModal={handleErrorServerMessage} /> : ''}
        {loading ? <HoneyComb /> : ''}
      </div>

    </div>
  )
}

export default ForgotPassword

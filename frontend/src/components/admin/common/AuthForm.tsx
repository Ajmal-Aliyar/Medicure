import { useState } from 'react'
import HoneyComb from '../../common/HoneyComb'
import { validateEmail, validatePassword } from '../../../utils/validate/authValidate';
import { IErrorType, ISignInResponse } from '../../../types/authType';
import { login } from '../../../store/slices/commonSlices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../../store/slices/commonSlices/notificationSlice';
import { signInApi } from '../../../sevices/admin/authRepository';

interface IAuthForm {
    role: string
}
const AuthForm:React.FC<IAuthForm> = ({ role }: { role: string }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailFocused, setemailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [isForgotPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState<IErrorType>({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleErrorMessage = (field: string, value: string) => {
        if (field === 'email') {
            setEmail(value)
            const emailM = validateEmail(value)
            setErrorMessage((prev) => ({
                ...prev,
                email: emailM || '',
            }));
        }
        if (field === 'password') {
            setPassword(value)
            const passwordM = validatePassword(value)
            setErrorMessage((prev) => ({
                ...prev,
                password: passwordM || '',
            }));
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        if (!errorMessage.email && !errorMessage.password && email && password) {
            try {
                const response: ISignInResponse = await signInApi(email, password, role)
                dispatch(login(response.data))
                setLoading(false);
            } catch (error: unknown) {
                setLoading(false);
                dispatch(setError('Something went wrong! Please try again later.'))
            }
        } else {
            handleErrorMessage('email', email);
            handleErrorMessage('password', password);
            setLoading(false);
        }
    }

    return (
        <div className={`form flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#eeeeee] shadow-lg rounded-lg pb-10 relative`}
            style={{ boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe' }}>

            <div className=" w-full rounded-t-lg mb-4 flex items-center justify-around p-3 mt-10">
                <a className="text-[#0c0b3e] uppercase font-bold text-xl tracking-wider">
                    Sign in
                </a>
            </div>

            <div className={`relative w-[250px] mt-6 duration-300`}>
                <input
                    type="text"
                    required
                    id="email"
                    value={email}
                    className={`w-full p-3  ${emailFocused || email !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0 ' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
                    onFocus={() => setemailFocused(true)}
                    onChange={(e) => handleErrorMessage('email', e.target.value)}
                    onBlur={(e) => e.target.value === '' ? setemailFocused(false) : ''}
                />
                <label
                    htmlFor="username"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${emailFocused || email !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>email</p>
                </label>
                <p className={`${errorMessage.email !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.email}</p>

            </div>



            <div className={`relative w-[250px] mt-6 ${isForgotPassword ? 'hidden' : ''} duration-200`}>
                <input
                    type="password"
                    value={password}
                    required
                    className={`w-full p-3   ${passwordFocused || password !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
                    onFocus={() => setPasswordFocused(true)}
                    onChange={(e) => handleErrorMessage('password', e.target.value)}
                    onBlur={(e) => e.target.value === '' ? setPasswordFocused(false) : ''}
                />
                <label
                    htmlFor="password"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none  bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${passwordFocused || password !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`} >Password</p>
                </label>
                <p className={`${errorMessage.password !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.password}</p>
            </div>

            <button className=" w-[250px] h-[45px] mt-6 border-2 border-[#0c0b3eb5] text-xs uppercase tracking-wider cursor-pointer transition duration-300 bg-[#0c0b3eb5] hover:bg-[#0c0b3e] text-white rounded-md active:scale-90 " onClick={handleSubmit}>
                Sign in as admin
            </button>



            <div className={`${loading ? '' : 'opacity-0 -z-50 '}  transition-all duration-300 bg-[#b7b7b75b] absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
                {loading ? <HoneyComb /> : ''}
            </div>

        </div>
    )
}

export default AuthForm

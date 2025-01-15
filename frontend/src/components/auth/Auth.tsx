import { useState } from "react";
import { api } from '../../utils/axiosInstance'
import { validateName, validateEmail, validateMobile, validatePassword } from "../../utils/validate";
import ErrorMessage from "../common/ErrorMessage";
import { useDispatch } from "react-redux";
import { setData } from "../../store/slices/userSlice";
import HoneyComb from "../common/HoneyComb";
import { useNavigate } from "react-router-dom";
type ErrorType = {
    name: string,
    email: string,
    mobile: string,
    password: string,
}
type AuthPageProps = {
    handleAuth: (value: boolean) => void;
    handleForgotPassword: (value: boolean) => void;
    role: string
};
interface SignInResponse {
    _id: string;
    role: string;
    accessToken: string;
}
const Auth: React.FC<AuthPageProps> = ({ handleAuth, handleForgotPassword, role }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [nameFocused, setnameFocused] = useState(false);
    const [emailFocused, setemailFocused] = useState(false);
    const [mobileFocused, setmobileFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<ErrorType>({
        name: '',
        email: '',
        mobile: '',
        password: ''
    })
    const dipatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = () => {
        setLoading(true);
        if (isLogin) {
            if (!errorMessage.email && !errorMessage.password && email && password) {
                api.post<SignInResponse>('/api/auth/signin', {
                    email,
                    password,
                    role
                })
                    .then(response => {
                        setLoading(false);
                        console.log('Signup successful:', response.data);
                        dipatch(setData({ _id:response.data._id, email, role }))
                        if (role === 'doctor') {
                            navigate('/doctor/dashboard')
                        } else {
                            navigate('/user')
                        }
                    })
                    .catch(error => {
                        setLoading(false);
                        setServerError(error?.response?.data?.error || 'Something went wrong! Please try again later.');
                        console.error('Signup error:', error.response?.data || error.message);
                    });
            } else {
                handleErrorMessage('email', email);
                handleErrorMessage('password', password);
                setLoading(false);
            }

        } else {
            if (!errorMessage.name && !errorMessage.email && !errorMessage.mobile && !errorMessage.password && name && email && mobile && password) {
                console.log(role)
                api.post('/api/auth/signup', {
                    name,
                    email,
                    mobile,
                    password,
                    role
                })
                    .then(response => {
                        setLoading(false);
                        console.log('Signup successful:', response.data);
                        dipatch(setData({ email, role }))
                        handleAuth(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setServerError(error?.response?.data?.error || 'Something went wrong! Please try again later.');
                        console.error('Signup error:', error.response?.data || error.message);
                    });
            } else {
                handleErrorMessage('name', name);
                handleErrorMessage('email', email);
                handleErrorMessage('mobile', mobile);
                handleErrorMessage('password', password);
                setLoading(false);
            }
        }
    };


    const handleErrorServerMessage = () => {
        setServerError('')
    }
    const handleErrorMessage = (field: string, value: string) => {
        if (field === 'name') {
            setName(value)
            const nameM = validateName(value)
            setErrorMessage((prev) => ({
                ...prev,
                name: nameM || '',
            }));
        }
        if (field === 'email') {
            setEmail(value)
            const emailM = validateEmail(value)
            setErrorMessage((prev) => ({
                ...prev,
                email: emailM || '',
            }));
        }
        if (field === 'mobile') {
            setMobile(value)
            const mobileM = validateMobile(value)
            setErrorMessage((prev) => ({
                ...prev,
                mobile: mobileM || '',
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
    const sendOTP = () => {
        setLoading(true)
        if (!errorMessage.email && email) {
            api.post('/api/auth/send-otp', { email })
                .then(response => {
                    setLoading(false);
                    console.log('Signup successful:', response.data);
                    handleForgotPassword(true)
                    dipatch(setData({ email, role }))
                })
                .catch(error => {
                    setLoading(false);
                    setServerError(error?.response?.data?.error || 'Something went wrong! Please try again later.');
                    console.error('Signup error:', error.response?.data || error.message);
                });
        } else {
            handleErrorMessage('email', email);
            setLoading(false)
        }
    }
    const setLoginTrue = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setIsLogin(true)
    }
    const setLoginFalse = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        setIsLogin(false)
    }
    const getButtonText = (isForgotPassword: boolean, isLogin: boolean, role: string) => {
        if (isForgotPassword) return 'Submit';
        if (isLogin) return role === 'user' ? 'Sign in as user' : 'Sign in as doctor';
        return role === 'user' ? 'Sign up as user' : 'Sign up as doctor';
    };

    return (


        <div className={`form flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#eeeeee] shadow-lg rounded-lg pb-10 relative`}
            style={{ boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe' }}>
            <div className=" w-full rounded-t-lg mb-4 flex items-center justify-around p-3 mt-10">
                <a className="text-[#0c0b3e] uppercase font-bold text-xl tracking-wider">
                    {isForgotPassword ? 'Enter Email' : isLogin ? 'Sign in' : 'Sign up'}
                </a>
            </div>



            <div className={`relative w-[250px] mt-6 ${isLogin ? 'hidden' : ''}`}>
                <input
                    type="text"
                    required
                    id="name"
                    value={name}
                    className={`w-full p-3  ${nameFocused || name ? 'border-t-2 border-r-2 rounded-lg ring-0 ' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
                    onFocus={() => setnameFocused(true)}
                    onChange={(e) => handleErrorMessage('name', e.target.value)}
                    onBlur={(e) => e.target.value === '' ? setnameFocused(false) : ''}

                />
                <label
                    htmlFor="username"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${nameFocused || name !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>Name</p>
                </label>
                <p className={`${errorMessage.name !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.name}</p>
            </div>

            <div className={`relative w-[250px] mt-6 ${isForgotPassword ? '' : ''} duration-300`}>
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

            <div className={`relative w-[250px] mt-6 ${isLogin ? 'hidden' : ''}`}>
                <input
                    type="number"
                    required
                    id="mobile"
                    value={mobile}
                    className={`w-full p-3 ${mobileFocused || mobile !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base rounded-bl-lg transition duration-300`}
                    onFocus={() => setmobileFocused(true)}
                    onChange={(e) => handleErrorMessage('mobile', e.target.value)}
                    onBlur={(e) => !e.target.value ? setmobileFocused(false) : ''}
                />
                <label
                    htmlFor="username"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${mobileFocused || mobile !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>mobile</p>
                </label>
                <p className={`${errorMessage.mobile !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.mobile}</p>

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
            <div className="w-[250px] mt-4">
                <p className={`${!isLogin || isForgotPassword ? 'hidden' : ''} text-gray-500 text-xs pb-2 text-end hover:cursor-pointer hover:text-[#0c0b3eb5] `} onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
            </div>
            <button className=" w-[250px] h-[45px]  border-2 border-[#0c0b3eb5] text-xs uppercase tracking-wider cursor-pointer transition duration-300 bg-[#0c0b3eb5] hover:bg-[#0c0b3e] text-white rounded-md active:scale-90 "
                onClick={isForgotPassword ? sendOTP : handleSubmit}>
                {getButtonText(isForgotPassword, isLogin, role)}
            </button>
            <div className={`h-[100px] flex flex-col justify-center ${isForgotPassword ? 'hidden' : ''} duration-200 gap-1`}>
                {isLogin ?
                    <p className="text-gray-600">Don't have an account? <a onClick={(e) => setLoginFalse(e)} href="" className="text-[#0c0b3e] font-medium">Sign up</a></p> :
                    <p className="text-gray-600">Already have an account? <a onClick={(e) => setLoginTrue(e)} href="" className="text-[#0c0b3e] font-medium">Sign in</a></p>}

                    <p className="hover:scale-105 duration-300 underline underline-offset-4 text-center text-sm cursor-pointer text-[#0c0b3e] " onClick={()=>navigate(role === 'user' ? '/doctor/auth' : '/user/auth')}>I'm a {role === 'user' ? 'doctor' : 'patient'}</p> 
            </div>
            

            <div className={`${serverError !== '' || loading ? '' : 'opacity-0 -z-50 '}  transition-all duration-300 bg-[#b7b7b75b] absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
                {!loading ? <ErrorMessage message={serverError} handleModal={handleErrorServerMessage} /> : ''}
                {loading ? <HoneyComb /> : ''}
            </div>

        </div>

    )
}

export default Auth

import { useState } from "react";
import { api } from '../../utils/axiosInstance'
import { validateName, validateEmail, validateMobile, validatePassword } from "../../utils/validate";
import ErrorMessage from "../common/ErrorMessage";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/authSlice";
import HoneyComb from "../common/HoneyComb";
type ErrorType = {
    name: string,
    email: string,
    mobile: string,
    password: string,
}
type Prop = {
    handleAuth: (value: boolean) => void
}

const Auth: React.FC<Prop> = ({ handleAuth }) => {
    const [isLogin, setIsLogin] = useState(true)
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
    const handleErrorMessage = (field: string, value: string) => {
        if (field === 'name') {
            const nameM = validateName(value)
            setErrorMessage((prev) => ({
                ...prev,
                name: nameM || '',
            }));
        }
        if (field === 'email') {
            const emailM = validateEmail(value)
            setErrorMessage((prev) => ({
                ...prev,
                email: emailM || '',
            }));
        }
        if (field === 'mobile') {
            const mobileM = validateMobile(value)
            setErrorMessage((prev) => ({
                ...prev,
                mobile: mobileM || '',
            }));
        }
        if (field === 'password') {
            const passwordM = validatePassword(value)
            setErrorMessage((prev) => ({
                ...prev,
                password: passwordM || '',
            }));
        }
    }
    const handleSubmit = () => {
        setLoading(true);  
        if (isLogin) {
            if (!errorMessage.email && !errorMessage.password && email && password) {
                api.post('/api/auth/signin', {
                    email,
                    password
                })
                .then(response => {
                    setLoading(false);
                    console.log('Signup successful:', response.data);
                    handleAuth(false);
                    const user = {
                        email,
                        role:'user'
                    }
                    dipatch(setUserData({user, token: "token"}))
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
                api.post('/api/auth/signup', {
                    name,
                    email,
                    mobile,
                    password
                })
                    .then(response => {
                        setLoading(false);

                        console.log('Signup successful:', response.data);
                        handleAuth(false);
                        const user = {
                            email,
                            role:'user'
                        }
                        dipatch(setUserData({user, token: "token"}))
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

    return (


        <div className={`form flex flex-col items-center justify-center min-h-[350px] w-[350px] lg:w-[400px] bg-[#eeeeee] shadow-lg rounded-lg py-10 relative`}
            style={{ boxShadow: '16px 16px 32px #c8c8c8, -16px -16px 32px #fefefe' }}>

            <a className="text-[#0c0b3e] uppercase font-bold text-xl tracking-wider mb-4">
                {isLogin ? 'Sign in' : 'Sign up'}
            </a>
            <div className={`relative w-[250px] mt-6 ${isLogin ? 'hidden' : ''}`}>
                <input
                    type="text"
                    required
                    id="name"
                    value={name}
                    className={`w-full p-3  ${nameFocused || name ? 'border-t-2 border-r-2 rounded-lg ring-0 ' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
                    onFocus={() => setnameFocused(true)}
                    onChange={(e) => {
                        setName(e.target.value)
                        handleErrorMessage('name', e.target.value)
                    }}
                    onBlur={(e) => {
                        if (e.target.value === '') {
                            setnameFocused(false)
                        }
                    }
                    }

                />
                <label
                    htmlFor="username"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${nameFocused || name !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>Name</p>
                </label>
                <p className={`${errorMessage.name !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.name}</p>
            </div>

            <div className="relative w-[250px] mt-6">
                <input
                    type="text"
                    required
                    id="email"
                    value={email}
                    className={`w-full p-3  ${emailFocused || email !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0 ' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
                    onFocus={() => setemailFocused(true)}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        handleErrorMessage('email', e.target.value)
                    }}
                    onBlur={(e) => {
                        if (e.target.value === '') {
                            setemailFocused(false)
                        }
                    }
                    }

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
                    onChange={(e) => {
                        setMobile(e.target.value);
                        handleErrorMessage('mobile', e.target.value)
                    }}
                    onBlur={(e) => {
                        if (!e.target.value) {
                            setmobileFocused(false);
                        }
                    }}
                />
                <label
                    htmlFor="username"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none text-[#0c0b3eb5] bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${mobileFocused || mobile !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>mobile</p>
                </label>
                <p className={`${errorMessage.mobile !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.mobile}</p>

            </div>

            <div className="relative w-[250px] mt-6">
                <input
                    type="password"
                    value={password}
                    required
                    className={`w-full p-3   ${passwordFocused || password !== '' ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-transparent outline-none text-[#0c0b3eb5] text-base  rounded-bl-lg  transition duration-300 `}
                    onFocus={() => setPasswordFocused(true)}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        handleErrorMessage('password', e.target.value)
                    }}
                    onBlur={(e) => {
                        if (e.target.value === '') {
                            setPasswordFocused(false)
                        }
                    }
                    }
                />
                <label
                    htmlFor="password"
                    className={`absolute  transform -translate-y-4 text-[10px] uppercase tracking-[0.1em]  left-4  pointer-events-none  bg-[#eeeeee] rounded-lg px-2 py-1  top-1`}
                >
                    <p className={`${passwordFocused || password !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>Password</p>
                </label>
                <p className={`${errorMessage.password !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.password}</p>
            </div>
            <div className="w-[250px] mt-4">
                <p className={`${isLogin ? '' : 'hidden'} text-gray-600 text-xs pb-2 text-end`}>Forgot Password?</p>
            </div>
            <button className=" w-[250px] h-[45px]  border-2 border-[#0c0b3eb5] text-xs uppercase tracking-wider cursor-pointer transition duration-300 bg-[#0c0b3eb5] hover:bg-[#0c0b3e] text-white rounded-md active:scale-90 "
                onClick={handleSubmit}>

                {isLogin ? 'Sign in' : 'Sign up'}


            </button>
            <div className="h-[100px] flex items-center">
                {isLogin ?
                    <p className="text-gray-600">Don't have an account? <a onClick={(e) => {
                        e.preventDefault()
                        setIsLogin(false)
                    }} href="" className="text-[#0c0b3e] font-medium">Sign up</a></p> :
                    <p className="text-gray-600">Already have an account? <a onClick={(e) => {
                        e.preventDefault()
                        setIsLogin(true)
                    }} href="" className="text-[#0c0b3e] font-medium">Sign in</a></p>}
            </div>

            <div className={`${serverError !== '' || loading ? '' : 'opacity-0 -z-50 '}  transition-all duration-300 bg-[#b7b7b75b] absolute top-0 left-0 right-0 bottom-0 rounded-lg bg-opacity-80 flex justify-center items-center`}>
                {!loading ?  <ErrorMessage message={serverError} handleModal={handleErrorServerMessage} /> : '' }
                {loading ? <HoneyComb /> :''}
            </div>

        </div>

    )
}

export default Auth

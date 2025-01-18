import React, { useState } from 'react'
import { validateEmail } from '../../../utils/validate';
import { IErrorType } from '../../../types/authType';

function ProfileTopBody() {
    const [email, setEmail] = useState('sdfa');
    const [mobile, setmobile] = useState('sdfasdf');
    const [emailFocused, setEmailFocused] = useState(false);
    const [mobileFocused, setMobileFocused] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
            email: '',
            mobile: '',
        })

    const handleErrorMessage = (id: string, value: string) => {
        if (id === 'email') {
            setEmail(value)
            const nameM = validateEmail(value)
            setErrorMessage((prev) => ({
                ...prev,
                name: nameM || '',
            }));
        } else if (id === 'mobile') {
            setmobile(value);
        }
    };
    return (
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-6 md:col-span-3 flex flex-col items-center">
                <div className="max-w-[120px] w-full rounded-full border-2 border-blue-400 aspect-square m-4">
                    <img src="/path/to/default-image.jpg" alt="Profile" className="rounded-full w-full h-full object-cover" />
                </div>
                <p className="text-lg font-medium">Ajmal TA</p>
            </div>
            <div className="flex col-span-6 flex-col justify-center gap-y-4 h-full pb-5">

                <div className='relative max-w-[350px]'>
                    <input
                        type="text"
                        disabled
                        id="email"
                        value={email}
                        className={`w-full p-3 ${emailFocused || email ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-[#f9f9f9] outline-none text-[#0c0b3eb5] text-base rounded-bl-lg transition duration-300`}
                        onFocus={() => setEmailFocused(true)}
                        onChange={(e) => handleErrorMessage('email', e.target.value)}
                        onBlur={(e) => e.target.value === '' ? setEmailFocused(false) : ''}
                    />
                    <label
                        htmlFor="email"
                        className={`absolute transform -translate-y-4 text-[10px] uppercase tracking-[0.1em] left-4 pointer-events-none text-[#0c0b3eb5] bg-[#f9f9f9] rounded-lg px-2 py-1 top-1`}
                    >
                        <p className={`${emailFocused || email !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>
                            Email
                        </p>
                    </label>
                    <p className={`${errorMessage.email !== '' ? '' : 'hidden'} text-[10px] text-red-500 pl-2`}>{errorMessage.email}</p>
                </div>


                <div className='relative max-w-[350px]'>
                    <input
                        type="text"
                        id='mobile'
                        disabled
                        value={mobile}
                        className={`w-full p-3 ${mobileFocused || mobile ? 'border-t-2 border-r-2 rounded-lg ring-0' : ''} border-b-2 border-l-2 border-[#0c0b3eb5] bg-[#f9f9f9] outline-none text-[#0c0b3eb5] text-base rounded-bl-lg transition duration-300`}
                        onFocus={() => setMobileFocused(true)}
                        onChange={(e) => handleErrorMessage('mobile', e.target.value)}
                        onBlur={(e) => e.target.value === '' ? setMobileFocused(false) : ''}
                    />
                    <label
                        htmlFor="mobile"
                        className={`absolute transform -translate-y-4 text-[10px] uppercase tracking-[0.1em] left-4 pointer-events-none text-[#0c0b3eb5] bg-[#f9f9f9] rounded-lg px-2 py-1 top-1`}
                    >
                        <p className={`${mobileFocused || mobile !== '' ? 'translate-y-0 text-[#0c0b3e]' : 'translate-y-6 scale-125 text-gray-500'} ease-out duration-300 transition-all`}>
                            mobile
                        </p>
                    </label>
                </div>

            </div>
        </div>
    )
}

export default ProfileTopBody

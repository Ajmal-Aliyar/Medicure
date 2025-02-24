import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface ErrorMessageProps {
    message: string,
    handleModal: () => void
}

const WarningMessage: React.FC<ErrorMessageProps> = ({ message, handleModal }) => {
    useGSAP(() => {
        gsap.from('.anim', {
            y: -30,
            scale:0.4,
            ease: 'circ.out',
            opacity: 0,
            duration: 0.15
        })
    })

    const extraFunction = useSelector((state: any) => state.notification.extra);

    const handleButtonClick = () => {
        if (extraFunction) {
            const result = extraFunction();
            if (result) {
                console.log('Function returned true');
            } else {
                console.log('Function returned false');
            }
        }
    };

    return (
        <div className={`anim mb-20 z-50 flex flex-col justify-center items-center  min-h-24 overflow-hidden bg-[#e7e7e7] shadow-lg max-w-[500px] rounded-md p-4`}>
            <svg
            className='max-w-16'
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#df3030"
                aria-hidden="true"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                ></path>
            </svg>
            <p className="min-w-[300px] text-center mt-1.5 text-xl font-bold leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
            Please confirm !
            </p>
            <p className="overflow-hidden leading-5 p-4 font-medium text-center max-w-[300px]">
                {message}
            </p>
            <div className='w-full flex justify-around mt-5'>
                <button className='py-1 bg-red-700 w-[100px] opacity-85 rounded-sm text-gray-100 active:scale-95 hover:opacity-100' onClick={handleModal}>cancel</button>
                <button className='py-1 bg-green-700 w-[100px] opacity-85 rounded-sm text-gray-100 active:scale-95 hover:opacity-100' onClick={handleButtonClick}>confirm</button>
            </div>
        </div>

    )
}

export default WarningMessage

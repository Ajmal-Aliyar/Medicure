import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useEffect } from 'react'
import { setExtra } from '../../store/slices/commonSlices/notificationSlice'
import { useDispatch, useSelector } from 'react-redux'

interface ErrorMessageProps {
    message: string,
    handleModal: () => void
}

const WarningMessage: React.FC<ErrorMessageProps> = ({ message, handleModal }) => {
    useGSAP(() => {
        gsap.from('.anim', {
            y: -100,
            ease: 'elastic',
            opacity: 0,
            duration: 1
        })
    })
    const CloseError = () => {
        handleModal()

    }
    const dispatch = useDispatch();
    const extraFunction = useSelector((state: any) => state.notification.extra);

    // Function to be passed to the modal
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
        <div
            className={`anim  z-50 flex flex-col w-3/4 min-h-24 overflow-hidden bg-[#eeeeee] shadow-lg max-w-96 rounded-xl mt-4`}
        >

            <div className="mx-2.5 overflow-hidden w-full flex justify-between ">
                <p
                    className="mt-1.5 text-xl font-bold text-yellow-400 leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                    Warning ! 
                </p>
                <button className="w-16 cursor-pointer focus:outline-none flex pt-1 px-4" onClick={(e) => {
                    e.preventDefault()
                    CloseError()
                }}>
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="#f3cf42"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            <p className="overflow-hidden leading-5 p-4">

                {message}
            </p>
            <p className='text-end absolute bottom-0 right-0 bg-yellow-400 rounded-tl-md px-2 pb-1 text-[#f5f5f5] cursor-pointer'  onClick={handleButtonClick}>yes</p>
            <div className='w-full h-2 bg-yellow-400'></div>
        </div>

    )
}

export default WarningMessage

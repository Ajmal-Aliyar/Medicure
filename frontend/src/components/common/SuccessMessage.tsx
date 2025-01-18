import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

interface ErrorMessageProps {
    message: string,
    handleModal: () => void
}

const SuccessMessage: React.FC<ErrorMessageProps> = ({ message, handleModal }) => {
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
    return (
        <div
            className={`anim  z-50 flex flex-col w-3/4 min-h-24 overflow-hidden bg-[#eeeeee] shadow-lg max-w-96 rounded-xl mt-4`}
        >

            <div className="mx-2.5 overflow-hidden w-full flex justify-between ">
                <p
                    className="mt-1.5 text-xl font-bold text-green-600 leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                    Success 
                </p>
                <button className="w-16 cursor-pointer focus:outline-none flex p-3" onClick={(e) => {
                    e.preventDefault()
                    CloseError()
                }}>
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        stroke="#16a34a"
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
            <div className='w-full h-2 bg-green-600'></div>
        </div>

    )
}

export default SuccessMessage

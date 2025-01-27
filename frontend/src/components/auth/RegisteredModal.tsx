import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'
import successSvg from '../../assets/external/success.svg'

interface RegisteredModalPropss {
    message: string,
    handleModal: () => void
}

const RegisteredModal: React.FC<RegisteredModalPropss> = ({ message, handleModal }) => {
    useGSAP(() => {
        gsap.from('.anim', {
            y: -30,
            scale: 0.4,
            ease: 'circ.out',
            opacity: 0,
            duration: 0.3
        })
    })

    const handleButtonClick = () => {
        handleModal()
    };

    return (
        <div className={`anim mb-20 z-50 flex flex-col justify-center items-center  min-h-24 overflow-hidden bg-[#e7e7e7ee] shadow-lg max-w-[500px] rounded-md p-4`}>
            <img src={successSvg} alt="" className='max-w-20' />
            <p className="min-w-[300px] text-center mt-1.5 text-xl font-bold leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap">
                Success !
            </p>
            <p className="overflow-hidden leading-5 p-4 font-medium text-center max-w-[300px]">
                {message}
            </p>
            <div className='w-full flex justify-center mt-5'>
                <button className='py-1 bg-green-700 w-[100px] opacity-85 rounded-sm text-gray-100 active:scale-95 hover:opacity-100' onClick={handleButtonClick}>confirm</button>
            </div>
        </div>

    )
}

export default RegisteredModal

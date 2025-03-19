import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gsap from 'gsap'
import React, { useEffect } from 'react'

interface ErrorMessageProps {
    message: string,
    handleModal: () => void
}

const SuccessMessage: React.FC<ErrorMessageProps> = ({ message, handleModal }) => {
    useEffect(() => {
        const showMessage = () => {
            gsap.fromTo(
                ".anim",
                { y: -100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "elastic",
                    onComplete: () => {
                        gsap.to(".anim", {
                            y: -100,
                            opacity: 0,
                            duration: 1,
                            delay: 2,
                            ease: "power2.in",
                            onComplete: () => handleModal && handleModal()
                        });
                    }
                }
            );
        };

        showMessage();
    })
    return (
        <div
            role="alert"
            className="anim mt-10 bg-white flex py-2 px-3 rounded-md justify-end items-center mn-w-[250px]"
        >
            <FontAwesomeIcon icon={faCheckCircle} className={`text-[15px]  text-green-700 mr-3 mt-1 animate-bounce`}/>
            <p className="text-sm">{message}</p>
        </div>

    )
}

export default SuccessMessage

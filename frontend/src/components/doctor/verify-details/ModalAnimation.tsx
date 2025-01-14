import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

type ModalAnimationProps = {
    children: React.ReactNode;
    onClose?: (val:string) => void;
};

const ModalAnimation: React.FC<ModalAnimationProps> = ({ children, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(
            modalRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
    }, []);

    const handleClose = () => {
        const tl = gsap.timeline()
        tl.to(modalRef.current, {
            opacity: 0,
            y: 50,
            duration: 0.4,
            ease: 'power2.in',
        });
        tl.to('.main-div',{
            opacity:0,
            onComplete: () => onClose && onClose('')
        })
    };

    return (
        <div
            className="main-div fixed inset-0 bg-gradient-to-t from-[#00000093] flex justify-center items-center p-4 "
            onClick={handleClose}
        >
            <div
                ref={modalRef}
                className="modal-content backdrop-blur-sm bg-[#f3f3f3] p-6 rounded-lg relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-2 text-[#0c0b3eb5] bg-transparent border-none text-2xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalAnimation;

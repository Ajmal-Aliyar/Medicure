
import React, { useRef } from 'react';

export const SwipeModal: React.FC<{
    children: React.ReactNode;
    onClose: (val:string) => void;
}> = ({ children, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);


    return (
        <div
            className="main-div fixed inset-0 bg-gradient-to-t from-[#00000093] flex justify-center items-center p-4 z-40"
        >
            <div
                ref={modalRef}
                className="modal-content backdrop-blur-sm bg-[#f3f3f3] p-6 rounded-lg relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => onClose && onClose('')}
                    className="absolute top-0 right-2 text-[#0c0b3eb5] bg-transparent border-none text-2xl cursor-pointer"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};


import React from 'react';

interface Props {
    message: string,
    handleModal : () => void
}

const SuccessModal: React.FC<Props> = ({message, handleModal}) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div
                        className={`bg-white min-w-[500px] p-6 rounded-lg shadow-lg transform transition-all duration-500 opacity-100 scale-100 translate-y-0
                        }`}
                    >
                        <div className="flex flex-col items-center">
                            <svg
                                className="w-16 h-16 text-green-500 animate-bounce"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2l4-4"
                                />
                            </svg>
                            <h2 className="text-2xl font-bold mt-4 text-center">Success!</h2>
                            <p className="text-gray-600 mt-2 text-center">{message}</p>
                            <button
                                onClick={handleModal}
                                className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default SuccessModal;

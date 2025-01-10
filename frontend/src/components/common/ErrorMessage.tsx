import React from 'react'

interface ErrorMessageProps {
    message: string,
    handleModal: () => void
}

const ErrorMessage:React.FC<ErrorMessageProps> = ({message,handleModal}) => {
  return (
<div
  className={`${message !== '' ? '' : 'translate-y-28 opacity-0'} transition-all duration-500 z-50 flex w-3/4 min-h-24 overflow-hidden bg-[#eeeeee] shadow-lg max-w-96 rounded-xl`}
>
  
  <div className="mx-2.5 overflow-hidden w-full">
    <p
      className="mt-1.5 text-xl font-bold text-red-700 leading-8 mr-3 overflow-hidden text-ellipsis whitespace-nowrap"
    >
      Failed !
    </p>
    <p className="overflow-hidden leading-5 break-all mt-2">

      {message}
    </p>
  </div>
  <button className="w-16 cursor-pointer focus:outline-none flex p-3" onClick={handleModal}>
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="#b91c1c"
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

  )
}

export default ErrorMessage

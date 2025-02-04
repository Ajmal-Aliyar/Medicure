import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Ban, ShieldAlert, X } from 'lucide-react'
import React from 'react'

interface ErrorMessageProps {
  message: string,
  handleModal: () => void
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, handleModal }) => {
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
      className={`anim  z-50 flex  w-full text-[#d21414a0]  overflow-hidden bg-[#f2ecec] shadow-lg max-w-96 rounded-xl mt-4`}
    >
      <div className='flex'>
        <p className="leading-5 p-2 flex mx-2">
          <span className='pr-1 pt-1'><ShieldAlert size={32} color="#d21414a0" strokeWidth={2} /></span>
          <p className='h-full content-center '>{message}</p>
          
        </p>
      </div>

      <button className=" cursor-pointer focus:outline-none  fixed top-2  right-2 " onClick={(e) => {
        e.preventDefault()
        CloseError()
      }}><X color="#d21414a0" size={25} strokeWidth={2}/></button>
    </div>

  )
}

export default ErrorMessage

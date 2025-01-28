import React, { useEffect } from 'react'
import DoctorImg from '../../../assets/doctors/slidedoctor4.png'
import { useParams } from 'react-router-dom';

const HeaderContent:React.FC = () => {
  const { specialization } = useParams();
  useEffect(() => {
    console.log(specialization)
  },[specialization])
  return (
    <div className='w-full hidden md:flex justify-around my-10 bg-gradient-to-r from-[#83c5f8ce] to-[#6fb8f4] h-[350px] rounded-2xl relative overflow-hidden'>
        <div className='w-full h-[100%] bg-[#b8d7ef91] rounded-[50%] absolute -bottom-[240px] -right-[90px] -rotate-12 translateRight'></div>
        <div className='flex h-full flex-col justify-center gap-8 pl-3'>
            <p className='text-xl md:text-5xl font-semibold text-white max-w-[600px] translateLeft cursor-default '>Looking For A Desired Doctor ?</p>
            <button className='uppercase w-fit bg-white text-sm font-semibold px-10 py-2 rounded-md translateLeft text-center'> search for</button>
        </div>
        <div className='items-end flex translate-x-16'>
            <img src={DoctorImg} alt="" className='max-h-[95%] z-10 translateUp'/>
        </div>
    </div>
  )
}

export default HeaderContent

import React from 'react'
import HeaderContent from '../../components/patient/findDoctors/HeaderContent'
import FindDoctorAnimation from '../../components/patient/findDoctors/FindDoctorAnimation'
import Specializations from '../../components/patient/findDoctors/Specializations'
import TopSpecialists from '../../components/patient/findDoctors/TopSpecialists'

const FindDoctors:React.FC = () => {
  return (
    <div className='w-full pt-[74px] px-6 lg:px-28'>
      <HeaderContent />
      <Specializations />
      <TopSpecialists />


      <FindDoctorAnimation />
    </div>
  )
}

export default FindDoctors

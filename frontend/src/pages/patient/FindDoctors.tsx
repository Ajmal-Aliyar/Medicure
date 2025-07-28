import React from 'react'
import HeaderContent from '../../components/patient/findDoctors/HeaderContent'
import FindDoctorAnimation from '../../components/patient/findDoctors/FindDoctorAnimation'
import Specializations from '../../components/patient/findDoctors/Specializations'
import TopSpecialists from '../../components/patient/findDoctors/TopSpecialists'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setError } from '../../store/slices/commonSlices/notificationSlice'
import { FilterProvider } from '../../context/FilterContext'
import FilterTopDoctor from '../../components/patient/specialization/FilterTopDoctor'


const FindDoctors:React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const isCancelled = queryParams.get('cancelled')

  const dispatch = useDispatch()

  if(isCancelled) {
    dispatch(setError('cancelled payment !'))
  }
  return (
    <div className='w-full pt-[74px] px-2 lg:px-28'>
      <HeaderContent />
      <Specializations />
      <FilterProvider><FilterTopDoctor /></FilterProvider> 
      <FilterProvider><TopSpecialists /></FilterProvider>
      <FindDoctorAnimation />
    </div>
  )
}

export default FindDoctors

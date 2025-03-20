import FindDoctorAnimation from "../../components/patient/findDoctors/FindDoctorAnimation"
import TopSpecialists from "../../components/patient/findDoctors/TopSpecialists"
import FilterTopDoctor from "../../components/patient/specialization/FilterTopDoctor"
import HeaderContent from "../../components/patient/specialization/HeaderContent"
import { FilterProvider } from "../../context/FilterContext"


const Specialization = () => {

  return (
    <div className='w-full pt-[74px] px-2 lg:px-28'>
      <HeaderContent />
      <FilterProvider><FilterTopDoctor /></FilterProvider> 
      <FilterProvider><TopSpecialists /></FilterProvider>

      <FindDoctorAnimation />
    </div>
  )
}

export default Specialization

import FindDoctorAnimation from "../../components/patient/findDoctors/FindDoctorAnimation"
import TopSpecialists from "../../components/patient/findDoctors/TopSpecialists"
import HeaderContent from "../../components/patient/specialization/HeaderContent"


const Specialization = () => {

  return (
    <div className='w-full pt-[74px] px-2 lg:px-28'>
      <HeaderContent />
      <TopSpecialists />

      <FindDoctorAnimation />
    </div>
  )
}

export default Specialization

import ProfileCard from "./ProfileCard"
import DoctorBanner from '../../../assets/external/doctorBanner.png'


function RightBar() {
  return (
    <div className="w-[320px] h-screen p-2 hidden mb-2 lg:flex flex-col items-center justify-center gap-2">
  
      <ProfileCard />
      <div className="w-full h-[100px] bg-white">

      </div>
    </div>
  )
}

export default RightBar

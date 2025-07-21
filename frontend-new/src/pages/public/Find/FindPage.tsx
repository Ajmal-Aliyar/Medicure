import HeroHeader from "../components/HeroHeader"
import FilterDoctor from "./components/FilterDoctor"
import Specializations from "./components/Specializations"


const FindPage = () => {
 
  return (
    <div className="max-w-[1300px] w-screen">
      <HeroHeader
        title="Looking For A Desired Doctor ?"
        buttonText="Search For"
        imageUrl={"https://res.cloudinary.com/dwyxogyrk/image/upload/v1751349010/slidedoctor4_upwepm.png"}
        hasButton
        variant="hero"
      />

      <Specializations />

      <FilterDoctor />

      
    </div>
  )
}

export default FindPage
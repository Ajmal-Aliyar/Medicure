import AboutSection from "./components/AboutSection"
import BooknowCard from "./components/BookingNowCard"
import DoctorSlider from "./components/DoctorSlider"
import ExperienceCard from "./components/ExperienceCard"
import HereSection from "./components/HereSection"
import WhyChooseUs from "./components/WhyChooseUs"

const HomePage = () => {
  return (
    <div className="max-w-[2000px] w-screen">
        <HereSection />
        <BooknowCard />
        <AboutSection />
        <WhyChooseUs />
        <ExperienceCard />
        <DoctorSlider />
    </div>
  )
}

export default HomePage
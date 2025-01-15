
import BooknowCard from "../../components/patient/home/BooknowCard"
import AboutSection from "../../components/patient/home/AboutSection"
import WhyChooseUs from "../../components/patient/home/WhyChooseUs"
import ExperienceCard from "../../components/patient/home/ExperienceCard"
import DoctorSlider from "../../components/patient/home/DoctorSlider"
import ReviewSection from "../../components/patient/home/ReviewSection"
import LandingBanner from "../../components/patient/home/LandingBanner"

function Home() {
    return (
        <>
            <LandingBanner />
            <BooknowCard />
            <AboutSection />
            <WhyChooseUs />
            <ExperienceCard />
            <DoctorSlider />
            <ReviewSection />
        </>
    )
}

export default Home


